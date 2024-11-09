import queueService from '../services'
import { NextFunction, Request, Response } from 'express'

export const initJob = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const task = await queueService.enqueue<string>(() => new Promise((resolve) => setTimeout(() => resolve('Task 1 completed'), 3000)))
		res.status(200).send({ task })
	} catch (e) {
		res.status(500).send({ message: e instanceof Error ? e.message : 'An unknown error occurred' })
	}
}

export const getResult = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { uuid } = req.params
		const result = queueService.getResult(uuid)
		if (!result) {
			res.status(404).send({ message: 'Task not found' })
			return
		}

		res.status(200).send({ result })
	} catch (e) {
		res.status(500).send({ message: e instanceof Error ? e.message : 'An unknown error occurred' })
	}
}
