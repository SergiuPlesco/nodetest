import express from "express";
import apiController from "../controllers/api.controller.js";
const router = express.Router();

// Public resources
router.get("/posts", apiController.publicResourcePosts);
router.get("/posts/:id", apiController.publicResourceGetPostsById);
router.post("/posts", apiController.publicResourceGetPostsCreate);
router.delete("/posts/:id", apiController.publicResourceGetPostsDelete);

// App resources
router.get("/blogs", apiController.blogs_all);
router.get("/blogs/:id", apiController.blogs_by_id);
router.post("/blogs/add", apiController.blogs_add);
router.put("/blogs/:id", apiController.blogs_update);
router.delete("/blogs/:id", apiController.blogs_delete);

export default router;
