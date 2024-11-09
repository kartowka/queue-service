import express, { Express } from 'express'
import { router } from './routes'
require('dotenv').config()
const app: Express = express()
app.use(express.json())
app.use('/api/v1/queue', router)

app.listen(process.env.PORT, () => {
	console.log('Server is running on port 3000')
})
