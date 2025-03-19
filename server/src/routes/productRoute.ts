

import express,{  Router } from "express";
import productController from "../controllers/productController";
import userMiddleware, { Role } from "../middleware/userMiddleware";
import { multer,storage } from "../middleware/multerMiddleware";
import errorHandler from "../services/errorHandler";
const upload = multer({storage:storage})
const router:Router = express.Router()

router.route("/").post(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),errorHandler(upload.single("productImage")),errorHandler(productController.createProduct))
.get(userMiddleware.isUserLoggedIn, errorHandler(productController.getAllProducts))

router.route("/:id").get(userMiddleware.isUserLoggedIn, errorHandler(productController.getSingleProduct))
.post((userMiddleware.isUserLoggedIn),(userMiddleware.restrictTo(Role.Admin)),userMiddleware.isUserLoggedIn,errorHandler(productController.updateProduct))
.delete(errorHandler(userMiddleware.isUserLoggedIn),errorHandler(userMiddleware.restrictTo(Role.Admin)),errorHandler(productController.deleteProduct))


export default router