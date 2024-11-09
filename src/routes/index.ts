import express from 'express'
import { getResult, initJob } from '../controllers/queue'
const router = express.Router()

router.get('/enqueue', initJob)
router.get('/result/:uuid', getResult)

export { router }
