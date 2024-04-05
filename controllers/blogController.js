const BlogModel = require("../models/blogs");

exports.getBlog = async (req, res) => {
  try {
    const authors = await BlogModel.find();
    res.status(200).send({
      statusCode: 200,
      payload: authors,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server Error",
    });
  }
};

exports.getSingleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await BlogModel.find(id);
    res.status(200).send({
      statusCode: 200,
      message: `Author with id ${id} correctly found`,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.addblog = async (req, res) => {
  const newAuthor = new BlogModel(req.body);
  try {
    await newAuthor.save();
    res.status(201).send({
      statusCode: 201,
      payload: "Author successfully create",
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const author = await BlogModel.findById(id);
  if (!author) {
    return res.status(404).send({
      statusCode: 404,
      message: "The requested author not exist",
    });
  }
  try {
    const updatedData = req.body;
    const options = { new: true };

    const result = await UserModel.findByIdAndUpdate(id, updatedData, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await BlogModel.findByIdAndDelete(id);
    if (!author) {
      return res.status(404).send({
        statusCode: 404,
        message: "The requested author not exist",
      });
    }
    res.status(200).send(`Author with id ${id} successfully removed`);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
