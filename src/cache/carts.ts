import { IProduct } from "@app/models";

const carts = new Map<string, {
  item: {
    product: IProduct;
    createAt: number;
  }[];
}>();

export function addCart(userId: string, product: IProduct) {

  let cart = carts.get(userId);

  if (!cart) {
    cart = {
      item: [],
    };
    carts.set(userId, cart);
  }
  cart.item.push({
    createAt: Date.now(),
    product
  });
}

export function getCart(userId: string) {
  return carts.get(userId)?.item.map(i => i.product);
}
