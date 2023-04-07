# <img src="https://avatars1.githubusercontent.com/u/7063040?v=4&s=200.jpg" alt="Hurb" width="24" /> Bravo Challenge

[[English](README.md) | [Portuguese](README.pt.md)]

## Code Architecture

<p align="center">
    <img src="README_assets/app-architecture.jpg" alt="Code Architecture" />
</p>

### Features

- Convert an amount from one currency to another
- Add a currency convert rate
- Delete a currency convert rate

## Endpoints

Convert an amount from one currency to another:
<pre><code>curl -X 'GET' \
    'http://localhost:3000/convert?from=USD&to=BRL&amount=1000'
</code></pre>

Add a currency convert rate:
<pre><code>curl -X 'POST' \
    'http://localhost:3000/currency?from=HURB&to=BRL&rate=5'
</code></pre>

Delete a currency convert rate:
<pre><code>curl -X 'DELETE' \
    'http://localhost:3000/currency?from=HURB&to=BRL'
</code></pre>

## Libraries and Tools

- [Node.js](https://nodejs.org/en/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Express](https://expressjs.com/)
- [axios](https://www.npmjs.com/package/axios)

## Tests

[Docker](https://www.docker.com/) is a prerequisite to run this project. Once its installed on the machine follow the steps below:

- Clone the repository to your machine
- Open a terminal in the containing folder of the project
- Run the command `sudo docker compose up` to build the docker image of the app and to run the containers with the application

After this the API should be running on the address `http://localhost:3000`. To test it, you can use your preferred tool for making HTTP requests ([curl](https://curl.se/), [Postman](https://www.postman.com/), etc).

## Limitations and Possible Improvements

- Authentication and Authorization: These features were not considered, since its a simple implementation. Future versions could expand the functionalities of the API by adding Authentication and Authorization to it.