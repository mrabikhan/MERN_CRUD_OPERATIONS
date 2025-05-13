import { Router } from "express";
import { registerUser, getUser, getOne, updateUser, deleteUser} from "../controllers/userController.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/getusers").get(getUser);
router.route("/getoneuser/:id").get(getOne);
router.route("/updateuser/:id").put(updateUser)
router.route("/deleteuser/:id").delete(deleteUser)
export default router;