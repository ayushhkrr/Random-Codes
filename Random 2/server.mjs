import * as http from "http";

const hostname = "127.0.0.1";
const port = 3000;

const users = {
  
  user1: {
    Name: "Baby",
    Email: "google.com",
    Age: 20,
  },
  user2: {
    Name: 'Roshan',
    Email: 'roshan.google.com',
    Age: 21
  }
}
  
const server = http.createServer((req, res) => {
  if (req.url === "/data" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ "Data about user": users }));
  } else if (req.url === "/insert" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const parseData = JSON.parse(body);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ inserted: parseData }));
    });
  } else if (req.url === "/update" && req.method === "PATCH") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const parseUpdate = JSON.parse(body);
      user = { ...user, ...parseUpdate };
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ updated: user }));
    });
  } else if (req.url === '/delete' && req.method === 'DELETE') {
    user = null
    res.end('Yo it got deleted')
  }
  else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("You got error");
  }
});

server.listen(port, () => {
  console.log(`The server is running on ${hostname}:${port}`);
});
