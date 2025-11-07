// simple local server using Node.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const file = req.url === "/" ? "index.html" : req.url.slice(1);
  const filePath = path.join(__dirname, file);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      const ext = path.extname(filePath);
      const type =
        ext === ".css" ? "text/css" : ext === ".html" ? "text/html" : "text/plain";
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    }
  });
});

server.listen(8000, () => {
  console.log("🚀 Server running at http://localhost:8000");
});
