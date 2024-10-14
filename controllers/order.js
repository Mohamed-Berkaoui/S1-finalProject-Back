const OrderModel = require("../models/order");
const catchDbErrors = require("../utils/catchDbErros");
const { customFail, customSuccess } = require("../utils/customResponces");

/**
 * @method : get
 * @route : ~/api/order/
 * @desc  : get all Orders
 * @access : admin
 */
async function getAllOrdersController(req, res) {
  const orders = await catchDbErrors(OrderModel.find());
  if (!orders.length) {
    throw new customFail("no orders found")
  }
  res.json(new customSuccess(orders))
}


/**
 * @method : get
 * @route : ~/api/order/userorders
 * @desc  : get user Orders
 * @access : user
 */
async function getuserOrdersController(req, res) {
    const user=req.user
    const userOrders=await catchDbErrors(OrderModel.find({userId:user._id}))
    if(!userOrders.length){
        throw new customFail("no orders")
    }
    res.json(new customSuccess(userOrders))
  }
  
  /**
 * @method : put
 * @route : ~/api/order/updateorder/:id
 * @desc  : update order status 
 * @access : admin
 */
  async function updateOrderStatusController(req, res) {
    const order=await catchDbErrors(OrderModel.findByIdAndUpdate(req.params.id,{status:req.body.status},    { returnDocument: "after" ,runValidators: true}))
    if(!order){
        throw new customFail('order not found')
    }
    res.json(new customSuccess(order))
  }


    /**
 * @method : post
 * @route : ~/api/order/postorder
 * @desc  : post new order order  
 * @access : user
 */
    async function postNewOrderContoroller(req, res) {
        const user=req.user

        const newOrder=await catchDbErrors(OrderModel.create({userId:user._id,orderdProducts:req.body.order}))

        if(!newOrder){
           throw new customFail('somthing went wrong')
        }
        res.json(new customSuccess(newOrder))
      }
module.exports={getAllOrdersController,getuserOrdersController,updateOrderStatusController,postNewOrderContoroller}