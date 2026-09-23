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
// update book 
export const updateBook = async (oldTitle, body) => {
    let { title, year, author, genres } = body
    let setData = {}
    title ? setData.title = title : null
    year ? setData.year = year : null
    author ? setData.author = author : null
    genres ? setData.genres = genres : null
    let findTitle = await bookModel.findOne({ title: oldTitle })
    if (findTitle) {
        let updatedData = await bookModel.updateOne({ title: oldTitle }, { $set: setData })
        if (updatedData.modifiedCount > 0) {
            return {
                code: 200,
                data: {
                    message: "data updated successfully"
                }
            }
        } else {
            return {
                code: 500,
                data: {
                    message: "something went wrong "
                }
            }
        }
    } else {
        return {
            code: 404,
            data: {
                message: 'the book with this title is not found'
            }
        }
    }

}
// find book by title 
export const findBookWithTitle = async (title) => {
    let book = await bookModel.findOne({ title })
    if (book) {
        return {
            data: {
                message: "book find successfully",
                book
            },
            code: 200
        }
    } else {
        return {
            data: {
                message: "book not found"
            },
            code: 404
        }
    }
}
// find books with year condition 
export const findBookBetweenYears = async (from, to) => {
    let books = await bookModel.aggregate([
        { $match: { year: { $gte: from, $lte: to } } },
    ]).toArray()
    console.log(books);

}




