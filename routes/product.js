const { getAllProductsController, getSingleProductController, getMostRatedProductsController, getMostPopularProductsController, getProductsPaginationController, postNewProductController, updateProductController, deleteProductController } = require('../controllers/product')
const asyncHandler = require('../utils/asyncHandler')
const productTitileValidation = require('../utils/expressValidator')
const ProductRouter=require('express').Router()
const verifyAdmin=require('../utils/verifyAdmin')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, 'products')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.originalname.split('.')[1])
    },
  })


  const  fileFilter= function(req, file, cb) {

    if (!file.mimetype.includes('image') ) {
      return cb(new Error('I don\'t have a clue!'), false );
    }
    cb(null, true);
  }
const upload = multer({ storage: storage,fileFilter:fileFilter})
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
  ProductRouter.post('/',asyncHandler(verifyAdmin),upload.single("image"),asyncHandler(postNewProductController))


    /**
 * @method : put
 * @route : ~/api/product/update/:id
 * @desc  : update  exist product
 * @access : admin 
 */
    ProductRouter.put('/update/:id',asyncHandler(verifyAdmin),asyncHandler(updateProductController))

    /**
 * @method : delete
 * @route : ~/api/product/delete/:id
 * @desc  : delete a product
 * @access : admin
 */
    ProductRouter.delete('/delete/:id',asyncHandler(verifyAdmin),asyncHandler(deleteProductController))

module.exports=ProductRouter