import { createOrderDto } from "./dto/orders.js";
import Order from "../infrastructure/schemas/Order.js";
import { NotFoundError } from "../domain/errors/not-found-error.js";
import { ValidationError } from "../domain/errors/validation-error.js";

export const createOrder = async (req, res) => {
  const order = createOrderDto.safeParse(req.body);
  console.log("Incoming Order Payload", req.body);

  if (!order.success) {
    throw new ValidationError(order.error.message);
  }

  const createdOrder = await Order.create({
    userId: order.data.userId,
    orderProducts: order.data.orderProducts,
    address: order.data.address,
  });
  return res.status(201).json(createdOrder);
};

export const handlePayment = async (req, res) => {
  const { orderId, status } = req.body;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  if (status === "SUCCESS") {
    order.paymentStatus = "PAID";
    await order.save();
    return res.status(200).send();
  }

  if (status === "FAILED") {
    return res.status(200).send();
  }
};

export const getOrderById = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate({
    path: "orderProducts.productId",
    model: "Product",
  });

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  return res.status(200).json(order);
};

export const getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  const order = await Order.find({ userId: userId }).populate({
    path: "orderProducts.productId",
    model: "Product",
  });

  return res.status(200).json(order);
};