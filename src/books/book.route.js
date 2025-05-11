const express = require('express');
const Book = require('./book.model');
const {postABook, getAllBooks, getSingleBook, updateBook, deleteABook} = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

router.post("/create-book", verifyAdminToken, postABook)

router.get("/", getAllBooks)

router.get("/:id",getSingleBook)

router.put("/edit/:id", updateBook, verifyAdminToken,)

router.delete("/:id", deleteABook, verifyAdminToken,)

module.exports = router