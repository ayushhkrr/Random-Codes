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
    Name: "Roshan",
    Email: "roshan.google.com",
    Age: 21,
  },
};

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
  } else if (req.url.startsWith("/users/") && req.method === "PATCH") {
    const id = req.url.split("/")[2];
    let body = '';
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if(!users[id]){
        res.statusCode = 404
        res.end(JSON.stringify({error : 'User not found'}))
      }

      const parseUpdate = JSON.parse(body);
      users[id] = { ...users[id], ...parseUpdate };
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ Updated: users[id] }));
    });
  } else if(req.url.startsWith('/users/') && req.method === 'DELETE'){
    const id = req.url.split('/')[2]
    if (users[id]){

      delete users[id]
    
    res.statusCode = 204
    res.end('User got deleted')
    }else {
      res.statusCode = 404
      req.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({error: 'user not found'}))
    }
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
