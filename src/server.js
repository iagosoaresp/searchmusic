const express = require('express');
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(routes)

app.use(cors());

app.use("/api", require("./routes"));

const port = 80

app.listen(port, console.log("API RESPONDENDO NA PORTA " + port));
