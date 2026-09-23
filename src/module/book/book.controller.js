import { Router } from "express";
import { insertBook, insertMultiBook } from "./book.service.js";
const router = Router()
// add new book 
router.post("/add-book", async (req, res) => {
    const { data, code } = await insertBook(req.body)
    res.status(code).json(data)
})
//add multi books 
router.post("/add-multi-book", async (req, res) => {
    let { code, data } = await insertMultiBook(req.body)
    res.status(code).json(data)
})

export default router