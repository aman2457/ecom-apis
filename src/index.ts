import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { buyerRouter } from './routes/buyerRoutes';
import { sellerRouter } from './routes/sellerRoutes';
import { userRouter } from './routes/userRoutes';

const app = express()

app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const port = 3000

app.use('/api/auth', userRouter)

app.use('/api/seller', sellerRouter)

app.use('/api/buyer', buyerRouter)

app.get('/health', (req: Request, res: Response) => {
  res.json({message: 'Server is up and running..'})
})


app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`)
})
