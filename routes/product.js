const { getAllProductsController, getSingleProductController, getMostRatedProductsController, getMostPopularProductsController, getProductsPaginationController, postNewProductController, updateProductController } = require('../controllers/product')
const asyncHandler = require('../utils/asyncHandler')
const productTitileValidation = require('../utils/expressValidator')
const ProductRouter=require('express').Router()
const verifyAdmin=require('../utils/verifyAdmin')

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
 * @route : ~/api/product/item/:id
 * @desc  : get single product with id
 * @access : visitor
 */
ProductRouter.get('/item/:id',asyncHandler(getSingleProductController))

  /**
 * @method : post
 * @route : ~/api/product/
 * @desc  : post a new product
 * @access : admin
 */
  ProductRouter.post('/',asyncHandler(verifyAdmin),productTitileValidation(),asyncHandler(postNewProductController))


    /**
 * @method : put
 * @route : ~/api/product/update/:id
 * @desc  : update  exist product
 * @access : admin
 */
    ProductRouter.put('/update/:id',asyncHandler(updateProductController))


module.exports=ProductRouter