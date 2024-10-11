const { validationResult } = require("express-validator");
const ProductModel = require("../models/product");
const {
  customError,
  customFail,
  customSuccess,
} = require("../utils/customResponces");

/**
 * @method : get
 * @route : ~/api/product/
 * @desc  : get all products
 * @access : visitor
 */
async function getAllProductsController(req, res) {
  const products = await ProductModel.find();
  if (!products.length) {
    throw new customFail("no products found");
  }
  res.json(new customSuccess(products));
}

/**
 * @method : get
 * @route : ~/api/product/?page=1&posts=10
 * @desc  : get all products with pagination querys
 * @access : visitor
 */
async function getProductsPaginationController(req, res) {
  const title = new RegExp(req.query.title, "i");
  let products = await ProductModel.find({ title: title })
    .skip((+req.query.page - 1) * +req.query.posts)
    .limit(req.query.posts);
  if (!products.length) {
    throw new customFail("no product found");
  }
  res.json(new customSuccess(products));
}

/**
 * @method : get
 * @route : ~/api/product/:id
 * @desc  : get single product with id
 * @access : visitor
 */
async function getSingleProductController(req, res) {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    throw new customError(" product not found", "fail", 400);
  }
  res.json({ status: "success", data: product });
}

/**
 * @method : get
 * @route : ~/api/product/mostrated
 * @desc  : get 5 most rated products
 * @access : visitor
 */
async function getMostRatedProductsController(req, res) {
  const products = await ProductModel.aggregate([
    { $sort: { "rate.rating": -1 } },
    { $limit: 5 },
  ]);
  if (!products.length) {
    throw new customError(" products not found", "fail", 400);
  }
  res.json({ status: "success", data: products });
}

/**
 * @method : get
 * @route : ~/api/product/mostpopular
 * @desc  : get 5 most popular products
 * @access : visitor
 */
async function getMostPopularProductsController(req, res) {
  const products = await ProductModel.aggregate([
    { $sort: { saleCount: -1 } },
    { $limit: 5 },
  ]);
  if (!products.length) {
    throw new customError(" products not found", "fail", 400);
  }
  res.json({ status: "success", data: products });
}

/**
 * @method : post
 * @route : ~/api/product/
 * @desc  : post a new product
 * @access : admin
 */
async function postNewProductController(req, res) {
  console.log(req.user.id)
  const result = validationResult(req);
  console.log('hellop')

  if (!result.isEmpty()) {
    throw new customError(
      "message from express validator, title must be longer the 3  words",
      "fail",
      400
    );
  }
  var newProd;
  try {
    newProd = await ProductModel.create(req.body);
  } catch (error) {
    throw new customError(error.message, "errorrrrr", 400);
  }
  res.json({ status: "success", data: newProd });
}

/**
 * @method : put
 * @route : ~/api/product/update/:id
 * @desc  : update  exist product
 * @access : admin
 */
async function updateProductController(req, res) {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    throw new customFail("product not found");
  }

  const updatedProd = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );
  res.json(new customSuccess(updatedProd));
}

module.exports = {
  getAllProductsController,
  getSingleProductController,
  getMostRatedProductsController,
  getMostPopularProductsController,
  getProductsPaginationController,
  postNewProductController,
  updateProductController
};
