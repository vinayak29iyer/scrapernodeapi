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
- **Efficient Web Scraping:** Utilize Cheerio and Axios for fast and efficient web scraping.
- **Error Handling:** Comprehensive error handling to manage invalid URLs and failed requests.
- **JSON Response:** Clean and structured JSON responses.
- **RESTful API:** Follow RESTful principles for ease of use and integration.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

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
## Usage
Send a POST request to the `${BASE_ROUTE_API}/websitescraper/fetch-metadata` endpoint with the target URL as a query parameter.
* BASE_ROUTE_API- this env value will the prefix of routing - example if `BASE_ROUTE_API=/api`, the fetch-metadata endpoint would be `${YOURDOMAIN/LOCALHOST:PORTNUMBER}/api/websitescraper/fetch-metadata`
*Once setup is done, authLogin needs to be called where you will recieve a authToken which you will need to pass in the above `fetch-metadata` Api to authorize it.
*A public PostMan collection which is a reference to all APIs in the project. url - `https://www.postman.com/supply-technologist-17867282/workspace/scraper-public-apis/overview`
