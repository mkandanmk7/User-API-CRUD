import {Router} from "express";
import { createUser, deletUser, getUser, getUsers, updateUser } from "../controller/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema, updateUserSchema } from "../validations/userValidation.js";

const router=Router();

router.post("/",validate(createUserSchema), createUser);
router.get("/",getUsers);
router.get("/:userId",getUser);
router.put("/:userId",validate(updateUserSchema),updateUser);
router.delete("/:userId",deletUser)

export default router;