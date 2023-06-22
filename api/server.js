const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");
app.use(session({
    secret: ';',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  
const cors = require("cors");
app.use(cors());
const path = require("path");
app.use(express.json());
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(helmet());

mongoose.connect('mongodb+srv://frn:test@cluster0.zrmdcbk.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log("connection success"))
.catch(() => console.log("error"));

const clientCtrl = require("./scripts/routers/client");
app.use(clientCtrl);

const suggestionCtrl = require("./scripts/routers/suggestion");
app.use(suggestionCtrl);

const connectionCtrl = require("./scripts/routers/connection");
app.use(connectionCtrl);

const productCtrl = require("./scripts/routers/product");
app.use(productCtrl);

setInterval(() => fetch("http://localhost:4000/api/connection/expired"), 1000 * 60 * 60 * 24);

app.listen(4000, () => console.log("ok"));