# Image Processing API

This is a Node.js-based image processing API that provides functionality for resizing images and logging HTTP requests and responses. It is a simple Image Processing API built with Node.js, Express, and the Sharp image processing library. It provides endpoints to resize images and log HTTP requests and responses. It is the first project for Udacity's Full Stack JavaScript Developer Nanodegree.


## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Functionality](#functionality)
- [Endpoints](#endpoints)
- [Tests](#tests)
- [License](#license)


## Features

- Resize images to specified dimensions using the Sharp library.
- Log incoming HTTP requests and responses with timestamps.

## Getting Started

## Requirements

- Node.js (v12 or higher)
- npm package manager
- Git (for cloning the repository)


### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/kevinptx/udacity-image-processing-api
    cd image-processing-api
    npm install
    ```
2. Install the required Node.js packages using npm:
    ```sh
    npm install
    ```
3. Build the TypeScript files:
    ```sh
    npm run build
    ```
4. Run the tests to ensure everything is set up correctly:
    ```sh
    npm test
    ```
5. Start the server:
    ```sh
    npm start
    ```
6. Open your web browser and navigate to http://localhost:3000 to access the Image Processing API.

## Functionality

To resize an image, send a GET request to /resize with the following query parameters:

url: The URL of the image you want to resize.
width: The desired width of the resized image.
height: The desired height of the resized image.

The Image Processing API allows you to resize images by sending a GET request to the following endpoint:

http://localhost:3000/resize?filename=<image-filename>&width=<desired-width>&height=<desired-height>

Replace `<image-filename>` with the name of the image file you want to resize (without the file extension), `<desired-width>` with the desired width of the resized image, and `<desired-height>` with the desired height of the resized image.

Example: http://localhost:3000/resize?filename=fjord&width=200&height=200

The resized image will be saved to disk on first access and then pulled from disk on subsequent access attempts. If the image processing fails or the image does not exist, an appropriate error message will be returned.

To view the logs of HTTP requests and responses, check the terminal where the server is running.

## Endpoints

GET /resize
Query Parameters:
url (string, required): The URL of the image to resize.
width (number, required): The desired width of the resized image.
height (number, required): The desired height of the resized image.

Example: /resize?url=<image-url>&width=200&height=200

## Tests

Run the tests using the following command:

```sh
npm test
```
## License

This project is licensed under the MIT License




