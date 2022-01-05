import Order from "@/domains/models/order";
import Product from "@/domains/models/product";
import { ShoppingCart } from "@/domains/models/shopping-cart";

describe('Order', () => {

  it('add, remove item from shopping cart', () => {
    const cart = ShoppingCart.build();
    const p1 = Product.build({ id: '1', name: 'test', price: 11 });
    const p2 = Product.build({ id: '2', name: 'test2', price: 17 });

    const finalCart = cart.add(p1, p1, p2, p2, p2)
      .remove(p2, p2);

    const order = Order.build(finalCart);

    expect(order.cart.totalPrice).toBe((11 * 2) + (17 * 1));
    expect(order.status).toBe('PENDING_PAYMENT');
  });
});
