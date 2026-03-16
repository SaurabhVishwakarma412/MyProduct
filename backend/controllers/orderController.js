import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { items, total } = req.body;

  const order = await Order.create({
    userId: req.user,
    items,
    total
  });

  res.json(order);
};