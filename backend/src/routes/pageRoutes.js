import express from "express";
import {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage,
} from "../controllers/pageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All page routes require authentication
router.use(protect);

router.route("/")
  .get(getPages)
  .post(createPage);

router.route("/:pageId")
  .get(getPageById)
  .put(updatePage)
  .delete(deletePage);

export default router;
