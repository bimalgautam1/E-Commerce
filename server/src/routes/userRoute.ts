import express, { Router } from 'express'
import UserController from '../controllers/userController'
import errorHandler from '../services/errorHandler'
const router:Router = express.Router()

// router.post("/register",UserController.register)
// router.get("/register",UserController.register)


router.route("/register").post(errorHandler(UserController.register))
router.route("/login").post(errorHandler(UserController.login))

export default router  