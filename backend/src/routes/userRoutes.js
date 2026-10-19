import express from "express";
import {
  getUsers,
  createUser,
  getUserById,
  loginUser,
} from "../controllers/userController.js";
import { userbody, loginBody } from "../validators/userValidator.js";

const router = express.Router();

router.route("/")
  .get(getUsers)
  .post(userbody, createUser);

router.route('/login')
  .post(loginBody, loginUser);

router.route("/:id")
  .get(getUserById)

export default router;
