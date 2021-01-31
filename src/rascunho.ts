const users = [];

// http
//     .createServer(function (req, res) {
//         const url = req.url;
//         const method = req.method;

//         res.setHeader("Content-Type", "application/json");

//         if (url.startsWith("/users")) {
//             // if (method === "GET") {
//             //     res.write(JSON.stringify(users));
//             // }

//             // if (method === "POST") {
//             //     let body = "";
//             //     req.on("data", chunk => {
//             //         body += chunk.toString(); // convert Buffer to string
//             //     });
//             //     req.on("end", () => {
//             //         users.push(JSON.parse(body));
//             //         res.end("ok");
//             //         //res.write(JSON.stringify(users));
//             //     });
//             // }

//             if (method === "PUT") {
//                 let body = "";

//                 req.on("data", chunk => {
//                     body += chunk.toString(); // convert Buffer to string
//                 });

//                 req.on("end", () => {
//                     const id = url.split("/")[2];
//                     const user = users.find(el => {
//                         return el.id === parseInt(id);
//                     });

//                     body = JSON.parse(body);
//                     user.name = body.name;
//                     user.username = body.username;
//                     user.email = body.email;

//                     res.end("ok");
//                     //res.write(JSON.stringify(users));
//                 });
//             }

//             if (method === "DELETE") {
//                 const id = url.split("/")[2];
//                 const index = users.findIndex(el => {
//                     return el.id === parseInt(id);
//                 });

//                 users.splice(parseInt(index), 1);
//                 if (index === -1) {
//                     res.statusCode = 404;
//                 }
//             }

//             res.end(); //end the response
//         } else {
//             res.write("<h1>Prova Backend Helpper<h1>"); //write a response
//             res.end(); //end the response
//         }
//     })
//     .listen(3000, function () {
//         console.log("server start at port 3000"); //the server object listens on port 3000
//     });