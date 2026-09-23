import { database } from "../../main.js";

// book collection 
export const createBookCollection = async () => {
    try {
        await database.createCollection("books", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            bsonType: "string",
                            minLength: 1
                        }
                    }
                }
            }
        });
        return {
            message: "collection created successfully",
            code: 201
        }
    } catch (error) {
        return {
            message: "collection already exists",
            code: 409
        }

    }
};
// crate index

export const crateBookIndex = async () => {
    try {
        await database.collection("books").createIndex({ title: 1 })
        return {
            message: "index added successfully",
            code: 201
        }
    } catch (error) {
        return {
            message: "index already exists",
            code: 409
        }
    }
}

// blog model with capped and size
export const crateBlogCollection = async () => {
    try {
        await database.createCollection("blog", {
            capped: true,
            size: 1048576
        })
        return {
            message: "collection crated successfully"
            , code: 409
        }
    } catch (error) {
        return {
            message: "collection already exists",
            code: 409
        }
    }
}

