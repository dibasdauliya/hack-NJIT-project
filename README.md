# React Map Application with AWS Location Service

App features includes displaying weather, temperature, wind and its direction, sunrise, and sunset of a specified pointer on a map that also displays an option to show related news nearby same location.

In order to retrieve the required information for global real time map with markers, we, at first, used the [`Amazon Location Service`](https://github.com/aws-geospatial/amazon-location-samples-js.git) and cloned the provided repository for location service via GitHub and started building our projects with other necessary APIs.

## Resources to create a Website

1. [`AmazonLocationServiceAPI`](https://location.aws.com/sample/react-map-with-markers) : To display real-time map on a website
2. React.js with Vite
3. TailWind CSS
4. [`react-hot-toast`](https://react-hot-toast.com/docs) to display toast messages
5. [`OpenWeatherAPI`](https://openweathermap.org/api): To retrieve data related to the weather
6. [`WorldAPI`](https://worldapi.com/): To get the latest news of a clicked location
7. [`ChatBot`](https://www.chatbase.co/): To further assist users for their concerns

## Prerequisites

Before getting started, ensure that you have the following set up:

- Node.js installed on your machine.
- An AWS account with Amazon Location Service configured.
- Geolocation supports in your browser.

## Configure

Copy `.env.example` to `.env` and populate environment variables with the CloudFormation stack
outputs.

## Run

Run `npm start` to start a local web server on [`localhost:3000`](http://localhost:3000/) with this
example and open it in a browser.

## Clean up

To remove all of the resources created in this walkthrough, delete the CloudFormation stack named
`react-map-with-markers`.

## License

This library is licensed under the MIT-0 License.
