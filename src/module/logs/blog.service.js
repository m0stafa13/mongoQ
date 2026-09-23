
import { ObjectId } from "mongodb";
import { bookModel, logModel } from "../../main.js"

export const insetLog = async (body) => {
    try {
        let { book_id, action } = body
        const checkBook = await bookModel.findOne({ _id: new ObjectId(book_id) })
        if (checkBook) {
            const addLog = await logModel.insertOne({ book_id: new ObjectId(book_id), action })
            if (addLog) {
                return {
                    code: 201,
                    data: {
                        message: "log added successfully"
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
        } else {
            return {
                code: 404,
                message: "book id is not found"
            }
        }
    } catch (error) {
        return {
            code: 500,
            data: {
                message: "incorrect data input"
            }
        }
    }
}