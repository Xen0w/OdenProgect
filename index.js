import http from "http";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const server = http.createServer((req, res) => {
    let filePath = "." + (req.url === "/" ? "/index.html" : req.url + ".html");

    fs.readFile(filePath, (err, data) => {
        if (err) {
            fs.readFile("./404.html", (err, page) => {
                res.statusCode = 404;
                res.setHeader("content-type", "text/html");
                res.end(page);
            });
        } else {
            res.statusCode = 200;
            res.setHeader("content-type", "text/html");
            res.end(data);
        }
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`server runing at PORT:http//:localhost:${port}/`);
});
