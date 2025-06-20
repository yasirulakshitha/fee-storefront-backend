import express from "express";
import {
  createOrder,
  getOrderById,
  handlePayment,
  getOrdersByUser,
  getAllOrders,
} from "../application/orders.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";


const ordersRouter = express.Router();

ordersRouter.route("/").post(ClerkExpressRequireAuth({}), createOrder);
ordersRouter.route("/user/:userId").get(ClerkExpressRequireAuth({}), getOrdersByUser);
ordersRouter.route("/:id").get(ClerkExpressRequireAuth({}), getOrderById);
ordersRouter.route("/").post(ClerkExpressRequireAuth({}), createOrder).get(ClerkExpressRequireAuth({}), AuthorizationMiddleware, getAllOrders);


ordersRouter.route("/webhook/payment").post(handlePayment);

export default ordersRouter;