const express=require("express");
const router= express.Router();
const blogsController=require("../controllers/blogController");

router.get("/blogs",blogsController.getBlog);

router.get("/blogs/:id",blogsController.getSingleBlog);

router.post("/blogs/createBlog",blogsController.addblog);

router.patch("/blog/update/:id",blogsController.updateBlog);

router.delete("/blog/delete/:id",blogsController.deleteBlog);

module.exports=router