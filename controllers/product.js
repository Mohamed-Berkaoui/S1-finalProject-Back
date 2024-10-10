const { validationResult } = require("express-validator");
const ProductModel = require("../models/product");
const customError = require("../utils/CustemError");
/**
 * @method : get
 * @route : ~/api/product/
 * @desc  : get all products
 * @access : visitor
 */
async function getAllProductsController(req, res) {
  const products = await ProductModel.find();
  if (!products.length) {
    throw new customError("no products found", "fail", 400);
  }
  res.json({ status: "success", data: products });
}

/**
 * @method : get
 * @route : ~/api/product/?page=1&posts=10
 * @desc  : get all products with pagination querys
 * @access : visitor
 */
async function getProductsPaginationController(req, res) {
  const products = await ProductModel.find()
    .skip((+req.query.page - 1) * +req.query.posts)
    .limit(req.query.posts);
  if (!products.length) {
    throw new customError("no products found", "fail", 400);
  }
  res.json({ status: "success", data: products });
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
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new customError(
      "message from express validator, title must be longer the 3  words",
      "fail",
      400
    );
  }
  var newProd
try {
     newProd=  await ProductModel.create(req.body)
     
} catch (error) {
    throw new customError(error.message,"errorrrrr",400)
}
    console.log("🚀 ~ postNewProductController ~ newProd:", newProd)
    res.json({status:"success",data:newProd})

}
module.exports = {
  getAllProductsController,
  getSingleProductController,
  getMostRatedProductsController,
  getMostPopularProductsController,
  getProductsPaginationController,
  postNewProductController
};
