import express, { Request, Response } from 'express'
import { userController } from './controller/userController';

const app = express()
app.use(express.json());
const port = 3000

const userControllerObject = new userController()

app.get('/health', (req: Request, res: Response) => {
  res.json({message: 'Server is up and running..'})
})

app.post('/api/auth/register', async (req: Request, res: Response) => {
  return userControllerObject.createUser(req, res)
})

app.post('/api/auth/login', async (req: Request, res: Response) => {
  return userControllerObject.loginUser(req, res)
})

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`)
})