# Penaguiao Counter App

This repository contains a **Node.js server** that serves a simple counter web application and provides an API for managing its value. It is designed to run on a VPS with **nginx** and a custom domain pointing to your server's IP.

---

## Features

* **Counter Web App**
  Served at: [`https://penaguiao.phd/counter`](https://penaguiao.phd/counter)
  Displays:

  * A button to increment the counter
  * A text box showing the current counter value

* **API Endpoints**

  * `GET /api/counter` — Returns the current integer value of the counter
  * `POST /api/upcounter` — Increments the counter by 1

* **Persistent Key/Value Storage**
  The server keeps track of the counter value in a simple key/value "database".

---

## Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   node server.js
   ```

---

## Server Structure

* `server.js` — Node.js server that handles:

  * Serving the counter front-end
  * API endpoints for reading and updating the counter

* `public/` — Front-end files for the counter app

  * `index.html` — Main page with button and counter display
  * `script.js` — Handles API calls to get/update counter
---

## Usage

1. Open your browser and navigate to:
   [`https://penaguiao.phd/counter`](https://penaguiao.phd/counter)

2. Click the **Increment** button to increase the counter.
   The counter value is fetched from the API at [`https://penaguiao.phd/api/counter`](https://penaguiao.phd/api/counter) and updated live.

3. API interaction (example using `curl`):

   ```bash
   # Get current counter
   curl https://penaguiao.phd/api/counter

   # Increment counter
   curl -X POST https://penaguiao.phd/api/upcounter
   ```

---

## Nginx Configuration

Your nginx should be configured to proxy requests to the Node.js server. Example:

```nginx
server {
    listen 80;
    server_name penaguiao.phd;

    location /counter {
        proxy_pass http://localhost:3000/counter;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Dependencies

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* Optional: [body-parser](https://www.npmjs.com/package/body-parser) for handling POST requests

---

## License

MIT License
