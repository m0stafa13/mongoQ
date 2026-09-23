import { crateBookIndex, crateLogCollection, createBookCollection } from "../../db/model/all.model.js"

export const createBookCol = async () => {
    let { data, code } = await createBookCollection()
    return { data, code }
}
// create log collection 
export const createLog = async () => {
    let { data, code } = await crateLogCollection()
    return { data, code }
}

//add index to book 
export const addIndex = async () => {
    let { data, code } = await crateBookIndex()
    return { data, code }
}