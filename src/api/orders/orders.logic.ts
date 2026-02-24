import { context } from "@app/db";
import { IProduct, OrderItem } from "@app/models";
import { getProductByIds } from "../products/products.logic.ts";
import { getUserById } from "../users/users.logic.ts";


export async function addOrder(userId: string) {
  const user = await getUserById(userId);
  if (!user) {
    return null;
  }

  const products = await getProductByIds(user.carts);

  if (!products || products.length === 0) {
    return null;
  }

  const orderItems = products.map(p => {
    return <OrderItem>{
      product: p._id,
      price: p.price,
      priceAfterDiscount: p.price,
      discountAmount: 0
    };
  });

  return await context.order.create({
    user: userId,
    orderItems,
    discount: undefined,
    discountCode: undefined,
    totalPrice: orderItems.reduce((sum, item) => sum + item.priceAfterDiscount, 0),
    totalDiscount: orderItems.reduce((sum, item) => sum + item.discountAmount, 0),
    refId: crypto.randomUUID(),
    transactionTime: new Date(),
    description: undefined
  });
}

export function getOrderById(_id: string) {
  return context.order.findById(_id).populate("user").populate("orderItems.product");
}

export function getAllOrders() {
  // order transactionTime desc
  return context.order.find({}).sort({ transactionTime: -1 }).populate("user").populate("orderItems.product").exec();
}

export function getUserOrders(userId: string) {
  return context.order.find({ user: userId }).populate("orderItems.product");
}

export async function getProductsInOrdersOfUser(userId: string) {
  // just select products
  const orders = await context.order.find({ user: userId }).populate("orderItems.product").select("orderItems.product");
  const products: IProduct[] = [];
  for (const element of orders) {
    products.push(...element.orderItems.map(item => item.product as IProduct));
  }
  return products;
}