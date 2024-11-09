type Task<P> = {
	uuid: string
	job: () => Promise<P>
}
type ObjectValues<T extends { [key: string]: string }> = T[keyof T]
const statusKeys = {
	NEW: 'new',
	SUCCESS: 'success',
	ERROR: 'error',
	IN_PROGRESS: 'in-progress',
} as const
type Status = ObjectValues<typeof statusKeys>

export { Task, Status, statusKeys }
