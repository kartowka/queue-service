import { Task, Status, statusKeys } from '../types'

/**
 * @class Queue
 * @description A class that represents a queue data structure.
 */
class Queue {
	/**
	 * @description decision to use any on the task array is because the task array can contain any type of task.
	 */
	private queue: Task<any>[] = []
	/**
	 * @description decision to use any on the results map is because the results map can contain any type of result.
	 */
	private results = new Map<
		string,
		{
			status: Status
			message: string
			result?: any
		}
	>()
	private running = false
	enqueue<P>(job: () => Promise<P>): string {
		const task: Task<P> = {
			uuid: crypto.randomUUID(),
			job: async () => {
				try {
					this.results.set(task.uuid, { status: statusKeys.IN_PROGRESS, message: 'Task started' })
					const result = await job()
					this.results.set(task.uuid, {
						status: statusKeys.SUCCESS,
						message: 'Task completed',
						result,
					})
					return result
				} catch (error) {
					this.results.set(task.uuid, {
						status: statusKeys.ERROR,
						message: error instanceof Error ? error.message : 'An unknown error occurred',
					})
				}
			},
		}
		this.results.set(task.uuid, { status: statusKeys.NEW, message: 'Task queued' })
		this.queue.push(task)

		this.process()
		return task.uuid
	}
	/**
	 * @description This function is used to dequeue the first element in the queue.
	 */
	private async dequeue() {
		const nextJob = this.queue.shift()
		if (nextJob) await nextJob.job()
	}
	/**
	 * @description This function is used to process the queue sequentially.
	 */
	private async process() {
		if (this.running) return
		this.running = true
		while (this.queue.length > 0) {
			await this.dequeue()
		}
		this.running = false
	}
	/**
	 *
	 * @param uuid 		The uuid of the task.
	 * @returns 		Returns the result of the task with the given uuid.
	 */
	getResult(uuid: string): any | undefined {
		return this.results.get(uuid)
	}
}
export default new Queue()
