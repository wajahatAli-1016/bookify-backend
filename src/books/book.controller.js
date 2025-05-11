const Book = require("./book.model");

const postABook = async (req, res) => {
    try {
        const newBook = await Book({ ...req.body })
        await newBook.save();
        res.status(200).send({ mesage: "Book posted successfully", book: newBook })

    } catch (error) {
        console.log("Error creating book", error);
        res.status(500).send({ message: "Book posted unsuccessfully" })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)

    } catch (error) {
        console.log("Error fetching book", error);
        res.status(500).send({ message: "Error in fetching books" })
    }
}
const getSingleBook = async (req, res) => {
    try {

        const { id } = req.params
        const book = await Book.findById(id)
        if (!book) {
            res.status(404).send({ message: "Book not found" })
        }
        res.status(200).send(book)


    } catch (error) {
        console.log("Error fetching book", error);
        res.status(500).send({ message: "Error in fetching books" })
    }
}

const updateBook = async (req, res) => {
    try {

        const { id } = req.params;
        const updateBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateBook) {
            res.status(404).send({ message: "Book is not found" })
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updateBook
        })

    } catch (error) {

        console.log("Error fetching book", error);
        res.status(500).send({ message: "failed to update a book" })

    }
}


const deleteABook = async (req, res) => {
    try {

        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({ message: "Book not found" })
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })

    } catch (error) {

        console.log("Error fetching book", error);
        res.status(500).send({ message: "failed to update a book" })


    }
}


module.exports = {
    postABook, getAllBooks, getSingleBook, updateBook, deleteABook
}