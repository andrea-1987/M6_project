const express=require("express");
const router = express.Router();
const usersController= require("../controllers/usersController");
const validateUser = require("../middlewares/validateUserBody");
const verified = require("../middlewares/verifyToken")

router.get("/users",verified,usersController.getUsers);

router.get("/users/:id", usersController.getSingleUser);

router.post("/createUser",validateUser,usersController.addUser);

router.patch("/users/update/:id",usersController.updateUser);

router.delete("/users/delete/:id",usersController.deleteUser);

module.exports=router