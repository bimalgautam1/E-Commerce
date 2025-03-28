import express, { Router } from 'express'
import errorHandler from '../services/errorHandler'
import OrderController from '../controllers/orderController'
import userMiddleware, { Role } from '../middleware/userMiddleware'

const router:Router = express.Router()

// router.post("/register",UserController.register)
// router.get("/register",UserController.register)


router.route("/")
.post(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Customer), errorHandler(OrderController.createOrder))
router.route('/verify-pidx').post(userMiddleware.isUserLoggedIn,errorHandler(OrderController.verifyTransaction))

export default router