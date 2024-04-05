const UserModel = require("../models/users");
const bcrypt = require("bcrypt");

exports.getUsers=async(req,res)=>{
    try {
        const users= await UserModel.find()
        res.status(200).send({
            statusCode:200,
            payload : users
        })
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"Internal server error"
        })
    }
};

exports.getSingleUser=async(req,res)=>{
    const{id}=req.params
    try {
        const user = await UserModel.findById(id)
        res.status(200).send({
            statusCode:200,
            message:`User with id ${id} correctly found`
        })
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"Internal server error"
        })
    }
};

exports.addUser=async(req,res)=>{

    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(req.body.password ,salt)
    

    const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        age: Number(req.body.age)
    })
    try {
       await newUser.save()
       res.status(201).send({
        statusCode:201,
        payload : "User succesfully create"
       })
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message: "Internal server error"
        })
    }
};

exports.updateUser=async(req,res)=>{
    const {id}= req.params
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).send({
                statusCode: 404,
                message: 'The requested user not exist!'
            })
    }

    try {

        const updatedData = req.body;
        const options = { new: true };

        const result = await UserModel.findByIdAndUpdate(id, updatedData, options);

        res.status(200).send(result)
    } catch (e) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
};

exports.deleteUser=async(req,res)=>{
    const {id}= req.params
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({
                    statusCode: 404,
                    message: 'The requested user not exist!'
                })
        }
        res.status(200).send(`User with id ${id} successfully removed`)
    } catch (e) {
        res.status(500).send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
};