const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getOrders,getOrderById,addOrder } = require('./order.controller')
const router = express.Router()





router.get('/',log,getOrders)
router.get('/:id',getOrderById)
router.post('/', requireAuth,addOrder)



// router.get('/' , log, getOrders)
// router.get('/:id',getOrderById)
// router.post('/',addOrder)

// // TODO
// router.put('/',updateOrder)
// router.delete('/',removeOrder)
module.exports = router

// router.put('/',requireAuth, requireAdmin,updateOrder)
// router.delete('/',requireAuth, requireAdmin,removeOrder)