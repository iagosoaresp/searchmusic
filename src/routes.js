const express = require("express");

const SearchController = require("./controller/SearchController")

const routes = express.Router();

routes.get('/search-city', SearchController.index)

module.exports = routes;