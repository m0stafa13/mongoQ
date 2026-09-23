import { bookModel } from "../../main.js"
// insert only book to db
export const insertBook = async (book) => {
    let { title, author, year, genres } = book
    try {
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
    } catch (error) {
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
        { $match: { year: { $gte: Number(from), $lte: Number(to) } } }
    ]).toArray()
    if (books.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books
            },
            code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }
}
//search in genres
export const searchInGenres = async (target) => {
    let findWord = await bookModel.find({ genres: target }).toArray()
    if (findWord.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books: findWord
            },
            code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }

}
// find book and skip
export const findBookSkip = async (skip, limit) => {
    let books = await bookModel.find().skip(Number(skip)).limit(Number(limit)).sort({ year: -1 }).toArray()
    if (books.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books
            },
            code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }
}
//find books where the year field stored as an integer
export const findBookYearInt = async () => {
    let books = await bookModel.find({ year: { $type: "int" } }).toArray()
    if (books.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books
            },
            code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }
}
// get book without some words in genres
export const getBookWithout = async (words) => {
    let books = await bookModel.find({ genres: { $not: { $all: words.split(",") } } }).toArray()
    if (books.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books
            },
            code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }
}
// delete book before year 
export const deleteBeforeYear = async (year) => {
    let deleteBook = await bookModel.deleteMany({
        year: { $lt: Number(year) }
    })

    if (deleteBook.deletedCount > 0) {
        return {
            data: {
                message: "books deleted successfully"
            }, code: 200
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
// get book and sort in and filter 
export const filterBooks = async (year) => {
    let books = await bookModel.aggregate([
        {
            $match: {
                year: { $gt: Number(year) }
            }
        },
        {
            $sort: {
                year: -1
            }
        }
    ]).toArray();

    if (books.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books
            }, code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }
}
// get book and filter using match and aggregate 
export const filterBooksMatch = async (year) => {
    let books = await bookModel.aggregate([
        {
            $match: { year: { $gt: Number(year) } }
        },
        {
            $project: {
                _id: 0,
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]).toArray();
    if (books.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books
            }, code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }
}
// convert array to doc
export const aggregateGenres = async () => {
    let books = await bookModel.aggregate([
        {
            $unwind: "$genres"
        }
    ]).toArray()
    if (books.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books
            }, code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }
}
// join book with log
export const joinBookWithLog = async () => {
    let books = await bookModel.aggregate([
        {
            $lookup: {
                from: "blog",
                localField: "_id",
                foreignField: "book_id",
                as: "logs"
            }
        }
    ]).toArray()
    if (books.length > 0) {
        return {
            data: {
                message: "books find successfully",
                books
            }, code: 200
        }
    } else {
        return {
            data: {
                message: "no books found"
            },
            code: 404
        }
    }
}