const { getAllProductsController, getSingleProductController, getMostRatedProductsController, getMostPopularProductsController, getProductsPaginationController, postNewProductController } = require('../controllers/product')
const asyncHandler = require('../utils/asyncHandler')

const productTitileValidation = require('../utils/expressValidator')
const ProductRouter=require('express').Router()


/**
 * @method : get
 * @route : ~/api/product/
 * @desc  : get all products
 * @access : visitor
 */
ProductRouter.get('/',asyncHandler(getAllProductsController))

/**
 * @method : get
 * @route : ~/api/product/pagination?page=1&posts=10
 * @desc  : get all products with pagination querys
 * @access : visitor
 */
ProductRouter.get('/pagination',asyncHandler(getProductsPaginationController))

  /**
 * @method : post
 * @route : ~/api/product/
 * @desc  : post a new product
 * @access : admin
 */
  ProductRouter.post('/',productTitileValidation(),asyncHandler(postNewProductController))

/**
 * @method : get
 * @route : ~/api/product/mostrated
 * @desc  : get 5 most rated products
 * @access : visitor
 */
ProductRouter.get('/mostrated',asyncHandler(getMostRatedProductsController))




/**
 * @method : get
 * @route : ~/api/product/mostpopular
 * @desc  : get 5 most popular products
 * @access : visitor
 */
ProductRouter.get('/mostpopular',asyncHandler(getMostPopularProductsController))

/**
 * @method : get
 * @route : ~/api/product/:id
 * @desc  : get single product with id
 * @access : visitor
 */
ProductRouter.get('/:id',asyncHandler(getSingleProductController))


module.exports=ProductRouter