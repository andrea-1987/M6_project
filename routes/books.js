const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const cloudUpload = require ("../middlewares/cloudinary");

router.get("/books", booksController.getBooks);

router.get("/books/:id", booksController.getSingleBook);

router.post("/books/createBook", booksController.postBook);

router.patch("/books/update/:id", booksController.upDateBook);

router.delete("/books/delete/:id", booksController.deleteBook);

router.post("/books/cloudUploadImg", cloudUpload, booksController.cloudUploadBooks);

module.exports = router;
