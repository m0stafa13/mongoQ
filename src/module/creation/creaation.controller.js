import { Router } from "express";
import { addIndex, createBookCol, createLog } from "./creation.service.js";

const router = Router()
//  create user collection 
router.post("/crate-book", async (req, res) => {
    let { data, code } = await createBookCol()
    res.status(code).json(data)
})
// crate log 
router.post("/create-log", async (req, res) => {
    let { data, code } = await createLog()
    res.status(code).json(data)
})
// add book index 
router.post('/crate-index', async (req, res) => {
    let { data, code } = await addIndex()
    res.status(code).json(data)
})


export default router