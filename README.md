# Node.js Metadata Scraper API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Cheerio](https://img.shields.io/badge/Cheerio-FFD700?style=for-the-badge&logo=cheerio&logoColor=black)
![Axios](https://img.shields.io/badge/Axios-671DDF?style=for-the-badge&logo=axios&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Overview

The Node.js Metadata Scraper API is a robust and efficient API designed to scrape and extract metadata from web pages. This project demonstrates proficiency in Node.js, Express, Cheerio, and Axios, showcasing my ability to build and manage backend services.

## Features

- **Extract Metadata:** Scrape and retrieve metadata from any given URL.
- **Efficient Web Scraping with cache:** Utilize Cheerio and Axios for fast and efficient web scraping. Used mongoDb as a cache, so if the same url is called again within 5 mins, then the response is returned from DB & not he API.
- **Error Handling:** Comprehensive error handling to manage invalid URLs and failed requests.
- **JSON Response:** Clean and structured JSON responses.
- **RESTful API:** Follow RESTful principles for ease of use and integration.

## Table of Contents

- [Installation](#installation)
- [High Level Architecture](#Architecutre)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contact](#Contact)

## Installation

1. Clone the repository

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file for environment variables, all mentioned in .env.ref file

4. Setup mongodb on a server and get the api endpoint, or use a free db instance from https://cloud.mongodb.com. Mention the ENDPOINT in .env file (MONGO_CONNECTION_URI={Your_MongoAtlast_Endpoint}). If you are using a mongoDB from https://cloud.mongodb.com, then the env of (MONGO_HOSTS=MONGOATLAS)

5. Start the server:

    ```bash
    npm start
    ```

## High Level Architecture
Here’s a high-level overview of the architecture:

User --> CloudFront (Content Delivery Network) --> S3 Bucket (Static React App) --> API Gateway (API Endpoints) --> EC2 Instance (Node.js Express) --> MongoDB Atlas


 **Diagram Explanation:**
1. User: The user interacts with your web application through a web browser.
2. CloudFront: This content delivery network caches your static React app across the globe, ensuring fast and efficient content delivery to users worldwide.
3. S3 Bucket: Your React app (built using npm run build or a similar command) is stored as static files (HTML, CSS, JavaScript) in an S3 bucket.
4. API Gateway: When your React app needs to perform scraping or access data, it sends requests to the API Gateway. This gateway acts as a front door, handling authentication, request routing, and other API management tasks.
5. EC2 Instance: The Node.js Express API runs on an EC2 instance. This is where your scraping logic resides and where data is processed and retrieved from the database & Scrapper API(AXIOS).
6. MongoDB Atlas: Your scraped metadata is stored in MongoDB Atlas, a fully managed cloud database service. This provides scalability, flexibility, and ease of management for your data. I have added a ttl of 5mins to avoid high data retention.

This high-level diagram provides a clear visual representation of the major components and their interactions within your AWS architecture.

## Usage
Send a POST request to the `${BASE_ROUTE_API}/websitescraper/fetch-metadata` endpoint with the target URL as a query parameter.
* BASE_ROUTE_API- this env value will the prefix of routing - example if `BASE_ROUTE_API=/api`, the fetch-metadata endpoint would be `${YOURDOMAIN/LOCALHOST:PORTNUMBER}/api/websitescraper/fetch-metadata`
*Once setup is done, authLogin needs to be called where you will recieve a authToken which you will need to pass in the above `fetch-metadata` Api to authorize it.
*A public PostMan collection which is a reference to all APIs in the project. url - `https://www.postman.com/supply-technologist-17867282/workspace/scraper-public-apis/overview`

## Contact
- **LinkedIn:** [Your LinkedIn](https://www.linkedin.com/in/vinayak-iyer-65610b17)
