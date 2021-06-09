const ITEMS_PER_PAGE = 10;

//Connnect to the API
const fetch = require('node-fetch');

let url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";

let settings = {
  method: "Get"
};

fetch(url, settings)
  .then(res => res.json())
  .then((json) => {
    global.products = json;
    // console.log(json)
  });

const renderIndex = async (req, res, json) => {
  console.log('we get here');
  let searchedValue = req.body.searchValue || req.query.searchValue || '' // Handle for GET, POST or neither
  let page = req.query.page || 1 // Grab our page number, 1 if undefined

  const indexStart = (page - 1) * ITEMS_PER_PAGE // Item index to start on...
  const indexEnd = page * ITEMS_PER_PAGE
  // const jsonResponse = req.url;

  const filteredData = global.products.filter(x =>
    x.name.toLowerCase().includes(searchedValue.toLowerCase())
  )

  let stuff = {
    data: filteredData.slice(indexStart, indexEnd), // For JSON/Array and not Mongoose, .slice() works best.
    path: 'shop/product-list',
    pageTitle: 'Prove 08',
    searchedValue: searchedValue,
    page: page,
    numPages: Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  }

  res.render('shop/product-list', stuff)
}


// New code for W08...
exports.getIndex = (req, res, next) => {
  // console.log('we get to this one');
  renderIndex(req, res, global.jsonResponse) // Render page.
}

exports.processJson = (req, res, next) => {
  // console.log('we get here too');
  renderIndex(req, res, global.jsonResponse) // Render page.
}