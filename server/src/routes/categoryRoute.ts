import express, { Router } from 'express'
import errorHandler from '../services/errorHandler'
import categoryController from '../controllers/categoryController'
import userMiddleware, { Role } from '../middleware/userMiddleware'
const router:Router = express.Router()

// router.post("/register",UserController.register)
// router.get("/register",UserController.register)


router.route("/").get(categoryController.getCategories).post(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin), categoryController.addCategory)
router.route("/:id").patch(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),categoryController.updateCategories).delete(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),categoryController.deleteCategories)

export default router  