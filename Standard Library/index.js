const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const storeData = []

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({ message: "Hello from the server side without express" })
    );
    }
  else if (req.url === "/data" && req.method === "POST") {
      let body = ""
      req.on('data', chunk => {
          body += chunk.toString()
      })
      req.on('end', () => {
          const data = JSON.parse(body)
          storeData.push(data)
          res.statusCode = 201
          res.end(JSON.stringify({received: data}))
      })
  } else if (req.url === "/data" && req.method === "GET") {
      res.statusCode = 201
      res.end(JSON.stringify(storeData))
  }
  
  else {
      res.statusCode = 404
      res.end(JSON.stringify({error: 'Not Found'}))
    }
});

server.listen(port, () => {
    console.log(`The server is running on port ${port}`);
    
})
