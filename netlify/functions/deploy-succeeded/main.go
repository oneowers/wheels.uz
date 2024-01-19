package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/askcloudarchitech/mediumautopost/pkg/mediumautopost"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type RequestBody struct {
	Payload Payload `json:"payload"`
}

type Payload struct {
	Context string `json:"context"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {

	requestBody := RequestBody{}
	json.Unmarshal([]byte(request.Body), &requestBody)

	if requestBody.Payload.Context == "production" {
		mediumautopost.Do("")
	} else {
		fmt.Println("context " + requestBody.Payload.Context + " detected, skipping")
	}

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Body:            "Success",
		IsBase64Encoded: false,
	}, nil
}

func main() {
	lambda.Start(handler)
}