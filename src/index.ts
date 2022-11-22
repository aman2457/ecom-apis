import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { buyerController } from './controller/buyerController';
import { sellerController } from './controller/sellerController';
import { userController } from './controller/userController';
import { authorize } from './middleware/authorization';
import { AuthenticatedUserRequest } from './models/authorization';

const app = express()
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

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

app.post('/api/seller/create-catalog', authorize('writeCatalog'), async (req: Request, res: Response) => {
  console.log(req.body)
  return sellerControllerObject.createCatalog(req as AuthenticatedUserRequest, res)
})

app.get('/api/seller/order', authorize('readOrders'), async (req: Request, res: Response) => {
  return sellerControllerObject.getOrders(req as AuthenticatedUserRequest, res)
})

app.get('/api/buyer/list-of-sellers', authorize('readSellers'), async (req: Request, res: Response) => {
  return buyerControllerObject.getSeller(req as AuthenticatedUserRequest, res)
})

app.get('/api/buyer/seller-catalog/:seller_id', authorize('readCatalog'), async (req: Request, res: Response) => {
  return buyerControllerObject.getProductsBySellerId(req as AuthenticatedUserRequest, res)
})

app.post('/api/buyer/create-order/:seller_id', authorize('writeOrder'), async (req: Request, res: Response) => {
  return buyerControllerObject.createOrder(req as AuthenticatedUserRequest, res)
})

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`)
})

function async(arg0: string, req: any, Request: { new(input: RequestInfo | URL, init?: RequestInit | undefined): globalThis.Request; prototype: globalThis.Request; }, res: any, Response: { new(body?: BodyInit | null | undefined, init?: ResponseInit | undefined): globalThis.Response; prototype: globalThis.Response; error(): globalThis.Response; redirect(url: string | URL, status?: number | undefined): globalThis.Response; }): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
  throw new Error('Function not implemented.');
}
