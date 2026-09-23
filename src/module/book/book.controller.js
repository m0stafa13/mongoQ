import { Router } from "express";
import { aggregateGenres, deleteBeforeYear, filterBooks, filterBooksMatch, findBookBetweenYears, findBookSkip, findBookWithTitle, findBookYearInt, getBookWithout, insertBook, insertMultiBook, joinBookWithLog, searchInGenres, updateBook } from "./book.service.js";
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
    let { data, code } = await findBookBetweenYears(from, to)
    res.status(code).json(data)
})
// search in genres 
router.get("/search-genres/:target", async (req, res) => {
    let { target } = req.params
    let { data, code } = await searchInGenres(target)
    res.status(code).json(data)
})
// find book and skip 
router.get("/find-book-skip/:skip/:limit", async (req, res) => {

    let { skip, limit } = req.params
    let { data, code } = await findBookSkip(skip, limit)
    res.status(code).json(data)
})
//Find books where the year field stored as an integer
router.get("/find-book-year/:year", async (req, res) => {
    let { year } = req.params
    let { data, code } = await findBookYear(year)
    res.status(code).json(data)
})
// find books where the year field stored as integer
router.get("/find-book-year-int", async (req, res) => {
    let { data, code } = await findBookYearInt()
    res.status(code).json(data)
})
// get book without some words in genres
router.get("/get-book-without/:words", async (req, res) => {
    let { words } = req.params
    let { data, code } = await getBookWithout(words)
    res.status(code).json(data)
})

//Delete all books published before year
router.delete("/delete-book-before/:year", async (req, res) => {
    let { year } = req.params
    let { code, data } = await deleteBeforeYear(year)
    res.status(code).json(data)
})
// git book and sort it using filter 
router.get("/filter-book/:year", async (req, res) => {
    let { year } = req.params
    let { data, code } = await filterBooks(year)
    res.status(code).json(data)
})
// get book and filter using match and aggregate 
router.get("/filter-book-match/:year", async (req, res) => {
    let { year } = req.params
    let { data, code } = await filterBooksMatch(year)
    res.status(code).json(data)
})
//convert array to doc
router.get("/convert-genres", async (req, res) => {
    let { data, code } = await aggregateGenres()
    res.status(code).json(data)
})
// aggregate book with log
router.get("/join-book-with-log", async (req, res) => {

    let { data, code } = await joinBookWithLog()
    res.status(code).json(data)
})


router.all("/*path", (req, res) => {
    res.status(404).json({
        message: "wrong path"
    });
});
export default router