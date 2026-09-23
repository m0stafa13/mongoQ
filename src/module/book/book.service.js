import { bookModel } from "../../main.js"
// insert only book to db
export const insertBook = async (book) => {
    let { title, author, year, genres } = book
    let addBook = await bookModel.insertOne({ title, author, year, genres })
    if (addBook.insertedId) {
        return ({
            code: 201,
            data: {
                message: "book inserted successfully"
            }
        })
    } else {
        return {
            code: 500,
            data: {
                message: "something went wrong"
            }
        }
    }
}
// insert multi books 
export const insertMultiBook = async (books) => {
    let addBooks = await bookModel.insertMany(books)
    if (addBooks.insertedCount > 0) {
        return {
            code: 201,
            data: {
                message: "books added successfully"
            }
        }
    } else {
        return {
            code: 500,
            data: {
                message: "something went wrong"
            }
        }
    }
}





