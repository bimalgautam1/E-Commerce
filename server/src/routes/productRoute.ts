

import express,{  Router } from "express";
import productController from "../controllers/productController";
import userMiddleware, { Role } from "../middleware/userMiddleware";

const router:Router = express.Router()

router.route("/create-product").post(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),productController.createProduct)
router.route("/get-all-products").get(productController.getAllProducts)
router.route("/:id").get(productController.getSingleProduct)
router.route("/update-product/:id").post(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),productController.updateProduct)
router.route("/delete-product/:id").post(userMiddleware.isUserLoggedIn,userMiddleware.restrictTo(Role.Admin),productController.deleteProduct)





export default router