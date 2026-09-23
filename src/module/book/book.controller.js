import { Router } from "express";
import { findBookBetweenYears, findBookWithTitle, insertBook, insertMultiBook, updateBook } from "./book.service.js";
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
// update book 
router.put("/update-book/:title", async (req, res) => {
    let { title } = req.params
    let { data, code } = await updateBook(title, req.body)
    res.status(code).json(data)
})
// find book with title 
router.get("/find-book-title/:title", async (req, res) => {
    let { title } = req.params
    let { data, code } = await findBookWithTitle(title)
    res.status(code).json(data)
})
// find book between years 
router.get("/find-book-years", async (req, res) => {
    let { from, to } = req.query
    let data = await findBookBetweenYears(from, to)
    res.json(data)
})





export default router