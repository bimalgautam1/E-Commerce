import express, { Router } from 'express'
import errorHandler from '../services/errorHandler'
import categoryController from '../controllers/categoryController'
import userMiddleware from '../middleware/userMiddleware'
const router:Router = express.Router()

// router.post("/register",UserController.register)
// router.get("/register",UserController.register)


router.route("/").get(categoryController.getCategories).post(userMiddleware.isUserLoggedIn, categoryController.addCategory)
router.route("/:id").patch(categoryController.updateCategories).delete(categoryController.deleteCategories)

export default router  