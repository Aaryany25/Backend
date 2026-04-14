import { Router } from "express";
import { LoginUser, RegisterUser ,LogoutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    RegisterUser

)
router.route("/login").post(LoginUser)

// Secured Routes
router.route("/logout").post(VerifyJWT,LogoutUser)
export default router