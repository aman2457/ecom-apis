import express, { Request, Response } from 'express'
import { buyerController } from './controller/buyerController';
import { sellerController } from './controller/sellerController';
import { userController } from './controller/userController';

const app = express()
app.use(express.json());
const port = 3000

const userControllerObject = new userController()
const sellerControllerObject = new sellerController()
const buyerControllerObject = new buyerController()

app.get('/health', (req: Request, res: Response) => {
  res.json({message: 'Server is up and running..'})
})

app.post('/api/auth/register', async (req: Request, res: Response) => {
  return userControllerObject.createUser(req, res)
})

app.post('/api/auth/login', async (req: Request, res: Response) => {
  return userControllerObject.loginUser(req, res)
})

app.post('/api/seller/create-catalog', async (req: Request, res: Response) => {
  return sellerControllerObject.createCatalog(req, res)
})

app.get('/api/seller/order', async (req: Request, res: Response) => {
  return sellerControllerObject.getOrders(req, res)
})

app.get('/api/buyer/list-of-sellers', async (req: Request, res: Response) => {
  return buyerControllerObject.getSeller(req, res)
})

app.get('/api/buyer/seller-catalog/:seller_id', async (req: Request, res: Response) => {
  return buyerControllerObject.getProductsBySellerId(req, res)
})

app.post('/api/buyer/create-order/:seller_id', async (req: Request, res: Response) => {
  return buyerControllerObject.createOrder(req, res)
})

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`)
})