const request = require("request");
const fs = require("fs");
// Implement a node app called fetcher.js.

// It should take two command line arguments:

//     a URL
//     a local file path

// It should download the resource at the URL to the local path on your machine.
// Upon completion, it should print out a message like Downloaded
// and saved 1235 bytes to ./index.html.

const fetcher = function (URL, path) {
  request(`${URL}`, (error, response, body) => {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    fs.writeFile(`${path}`, body, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  setTimeout(() => {
    fs.stat(path, (error, stats) => {
      if (error) {
        console.log("error: ", error);
      }
      let size = stats.size;
      console.log(`Downloaded and saved ${size} bytes to ${path}`);
    });
  }, 500);
};

fetcher("https://example.edu/", "./test.html");
