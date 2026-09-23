import { Router } from "express";
import { insetLog } from "./blog.service.js";
const router = Router()

// insert new log
router.post("/insert-log", async (req, res) => {
    let { data, code } = await insetLog(req.body)
    res.status(code).json(data)
})




export default router