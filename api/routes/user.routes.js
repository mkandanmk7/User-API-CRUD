import {Router} from "express";
import { createUser } from "../controller/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validations/userValidation.js";

const router=Router();

router.post("/",validate(createUserSchema), createUser)

export default router;