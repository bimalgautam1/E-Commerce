import express, { Router } from 'express'
import errorHandler from '../services/errorHandler'
import userMiddleware, { Role } from '../middleware/userMiddleware'
import cartController from '../controllers/cartController'
import UserController from '../controllers/userController'
const router:Router = express.Router()

router.route('/')
.post(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Customer),errorHandler(cartController.addCart))

router.route('/:productId')
.get(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Customer),errorHandler(cartController.getMyCartItems))
.delete(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),errorHandler(cartController.deleteItemsOnCart))
.patch(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),errorHandler(cartController.updateCartItemQuantity))


export default router