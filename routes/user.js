import express from "express";

import {
  getAllusers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/all", getAllusers);

router.get("/me",isAuthenticated,getMyProfile);




export default router;
