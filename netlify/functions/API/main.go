package main

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"
    "strings"

    "github.com/aws/aws-lambda-go/events"
    "github.com/aws/aws-lambda-go/lambda"
    "github.com/aws/aws-lambda-go/lambdacontext"
    "github.com/gorilla/mux"
    "github.com/PuerkitoBio/goquery"  // Add this line
)


type Product struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	VariantTitle string `json:"variant-title"`
	Price        string `json:"price"`
	Image        string `json:"image"`
	Image1       string `json:"image1"`
	Link         string `json:"link"`
}

var products []Product

var r = mux.NewRouter()

func handleRequests() {
	r.HandleFunc("/", home).Methods("GET")
	r.HandleFunc("/api/parse/", parseURL).Methods("POST")
}

func home(w http.ResponseWriter, r *http.Request) {
	text := "I AM LEGand"
	fmt.Fprintf(w, "%s", text)
}

func parseURL(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var requestBody struct {
		URL string `json:"url"`
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&requestBody); err != nil {
		http.Error(w, "Error decoding request body", http.StatusBadRequest)
		return
	}

	products = nil
	fmt.Println("[POST]: url: " + requestBody.URL)

	scrapeBrostore(w, requestBody.URL)

	jsonData, err := json.Marshal(products)
	if err != nil {
		http.Error(w, "Error converting to JSON", http.StatusInternalServerError)
		return
	}
	w.Write(jsonData)
}

func scrapeBrostore(w http.ResponseWriter, url string) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error making request:", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Printf("Failed to retrieve data. Status Code: %d\n", resp.StatusCode)
		return
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		fmt.Println("Error parsing HTML:", err)
		return
	}

	doc.Find(".product-card.text-center.product-card--content-spacing-false.product-card--border-false.has-shadow--false").Each(func(i int, s *goquery.Selection) {
		title := strings.TrimSpace(s.Find(".product-card-title").Text())
		price := strings.TrimSpace(s.Find(".amount").Text())
		imageURL, _ := s.Find(".product-primary-image").Attr("data-srcset")
		imageURL = "https:" + strings.Fields(imageURL)[0]

		imageURL1, _ := s.Find(".product-secondary-image").Attr("data-srcset")
		imageURL1 = "https:" + strings.Fields(imageURL1)[0]

		parent := s.Find(".product-card-title").Parent()
		linkSelection := parent.Find("a").First()
		link, exists := linkSelection.Attr("href")

		if exists {
			link = "https://brostore.uz" + link

			product := Product{
				ID:    i + 1,
				Title: title,
				Price: price,
				Image: imageURL,
				Image1: imageURL1,
				Link:  link,
			}
			products = append(products, product)
		} else {
			fmt.Println("Link does not exist")
		}
	})
}

// AWS Lambda handler
func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	lc, ok := lambdacontext.FromContext(ctx)
	if !ok {
		return &events.APIGatewayProxyResponse{
			StatusCode: 503,
			Body:       "Something went wrong :(",
		}, nil
	}

	cc := lc.ClientContext

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       product,
	}, nil
}

func main() {
	products = make([]Product, 0)
	handleRequests()
	lambda.Start(Handler)
}
