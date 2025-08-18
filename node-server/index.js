//import Express framework
const express = require("express");

//Create an Express application
const app = express();

//define which port to run the server on
const port = 3000;

//serve static files(HTML, CSS, JS, images,..) from the public_html folder
app.use(express.static('public_html'))

//start the server and log messages to the console
app.listen(port, () => {
    console.log(`Web server running at: http://localhost:${port}`)
        console.log(`Type Ctrl+C to shut down the web server`)
})