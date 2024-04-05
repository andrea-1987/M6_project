const BookModel=require("../models/books")
const upload = require("../middlewares/multer")
const cloudUpload = require("../middlewares/cloudinary");

//with cloudinary upload\\
exports.cloudUploadBooks=async(req,res)=>{
    try {
        res.status(200).json({source:req.file.path})
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"file upload error"
        })
    }
}

//--to upload in localstorage--\\
exports.uploadBooks=async(req,res)=>{
    const url= req.protocol + `://` + req.get(`host`);
    try {
        const imageUrl=req.file.filename
        res.status(200).json({img :`${url}/uploads/${imageUrl}`})
    } catch (error) {
        res.status(500)
        .send({
            statusCode: 500,
            message: 'file upload error'
        })
    }
}

exports.getBooks=async(req,res)=>{
    const {page = 1, pageSize = 10} = req.query
    try {
        const books = await BookModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .sort({pubDate: -1})

        const totalBooks = await BookModel.countDocuments();

        res.status(200)
            .send({
                currentPage: page,
                pageSize,
                totalPages: Math.ceil(totalBooks / pageSize),
                books
            })
    } catch (e) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
};

exports.getSingleBook=async(req,res)=>{
    const {id}=req.params
    try {
        const book=await BookModel.findById(id)
        if(!book){
            return res
            .status(404)
            .send({
                statusCode:404,
                message: `Book with id ${id} not found!`
            })
        }
            res.status(200).send({
                statusCode:200,
                payload :book
            })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
}

exports.postBook=async(req,res)=>{
    const newBook = new BookModel(req.body)
    try {
        await newBook.save()
        res.status(201).send({
            statusCode:201,
            payload : "Book successfully create"
        })
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message: "Internal server error"
        })
    }
};

exports.upDateBook=async(req,res)=>{
    const{id}=req.params
    try {
        const book = await BookModel.findById(id)
        if (!book) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: `Book with id ${id} not found!`
                })
        }

        const bookToUpdate = req.body
        const options = { new: true }
        const result = await BookModel.findByIdAndUpdate(id, bookToUpdate, options)

        res.status(200).send(result)
    } catch (e) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
};

exports.deleteBook=async(req,res)=>{
    const {id}=req.params
    try {
        const book = await BookModel.findByIdAndDelete(id);
        if (!book) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'The requested book not exist!'
                })
        }

        res.status(200)
            .send(`Book with id ${id} successfully removed`)
    } catch (e) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
};