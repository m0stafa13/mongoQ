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
            data: {
                message: "collection created successfully",
            },
            code: 201
        }
    } catch (error) {
        return {
            data: {
                message: "something went wrong",
            },
            code: 500
        }
    }
};
// crate index

export const crateBookIndex = async () => {
    try {
        await database.collection("books").createIndex({ title: 1 })
        return {
            data: { message: "index added successfully" },
            code: 201
        }
    } catch (error) {
        return {
            data: { message: "some thing went wrong" },
            code: 500
        }
    }
}

// blog model with capped and size
export const crateLogCollection = async () => {
    try {
        await database.createCollection("blog", {
            capped: true,
            size: 1048576
        })
        return {
            code: 201,
            data: {
                message: "collection created successfully"
            }
        }
    } catch (error) {
        return {
            code: 500,
            data: {
                message: "some thing went wrong"
            }
        }
    }
}

