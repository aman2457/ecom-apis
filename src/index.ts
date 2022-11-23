import express, { Request, Response } from "express";
import morgan from "morgan";
import errorMiddleware from "./middleware/Exception.middleware";
import { BuyerRouter } from "./routes/BuyerRoutes";
import { SellerRouter } from "./routes/SellerRoutes";
import { UserRouter } from "./routes/UserRoutes";

const app = express();

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const port = process.env.PORT || 3000;

app.use("/api/auth", UserRouter);

app.use("/api/seller", SellerRouter);

app.use("/api/buyer", BuyerRouter);

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Server is up and running.." });
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`🚀 server started at http://localhost:${port}`);
});
