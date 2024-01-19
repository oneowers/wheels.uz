package main

import (
	"context"
	"strings"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/PuerkitoBio/goquery"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-lambda-go/lambdacontext"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
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

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	lc, ok := lambdacontext.FromContext(ctx)
	if !ok {
		return &events.APIGatewayProxyResponse{
			StatusCode: 503,
			Body:       "Something went wrong :(",
		}, nil
	}

	cc := lc.ClientContext

	// Вместо текста "Hello, " + cc.Client.AppTitle используйте ваш код обработки POST-запроса

	// Пример: возврат JSON-ответа
	response := map[string]interface{}{
		"status":  "success",
		"message": "Hello, " + cc.Client.AppTitle,
	}

	// Преобразование map в JSON
	responseJSON, err := json.Marshal(response)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error encoding JSON response",
		}, nil
	}

	// Возврат JSON-ответа
	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(responseJSON),
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
	}, nil
}

func handleRequests() {
	r.HandleFunc("/", home).Methods("GET")
	r.HandleFunc("/api/parse/", parseURL).Methods("POST")

	// Enable CORS middleware
	c := cors.AllowAll()

	// Wrap the existing router with CORS middleware
	http.Handle("/", c.Handler(r))

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
	
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

    // Reset the products slice before scraping new data
    products = nil

    // Print the URL from the request body
    fmt.Println("[POST]: url: " + requestBody.URL)

    // Scrape data from the provided URL
    scrapeBrostore(w, requestBody.URL)

    // Return the parsed data as JSON
    jsonData, err := json.Marshal(products)
    if err != nil {
        http.Error(w, "Error converting to JSON", http.StatusInternalServerError)
        return
    }
    w.Write(jsonData)
}

func scrapeBrostore(w http.ResponseWriter, url string) {
	// Set a user-agent to mimic a browser request
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")

	// Perform the request
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error making request:", err)
		return
	}
	defer resp.Body.Close()

	// Check if the request was successful (status code 200)
	if resp.StatusCode != http.StatusOK {
		fmt.Printf("Failed to retrieve data. Status Code: %d\n", resp.StatusCode)
		return
	}

	// Use goquery to parse the HTML response
	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		fmt.Println("Error parsing HTML:", err)
		return
	}

	// Find all product-card elements
	doc.Find(".product-card.text-center.product-card--content-spacing-false.product-card--border-false.has-shadow--false").Each(func(i int, s *goquery.Selection) {
		// Extract information from each product-card
		title := strings.TrimSpace(s.Find(".product-card-title").Text())
		price := strings.TrimSpace(s.Find(".amount").Text())
		imageURL, _ := s.Find(".product-primary-image").Attr("data-srcset")
		imageURL = "https:" + strings.Fields(imageURL)[0]

		imageURL1, _ := s.Find(".product-secondary-image").Attr("data-srcset")
		imageURL1 = "https:" + strings.Fields(imageURL1)[0]  // Fix this line

		// Find the parent container that contains the link
		parent := s.Find(".product-card-title").Parent()

		// Find the link within the parent container
		linkSelection := parent.Find("a").First()
		link, exists := linkSelection.Attr("href")

		// Check if the link exists
		if exists {
			link = "https://brostore.uz" + link

			// Save information to the products slice
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

func main() {
	// Точка входа для локального запуска сервера
	handleRequests()
}

func lambdaMain() {
	// Точка входа для AWS Lambda
	lambda.Start(handler)
}
