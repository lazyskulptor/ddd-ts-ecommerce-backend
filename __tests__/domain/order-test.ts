import { reqOrder } from "@/domains/models/order";
import * as p from "@/domains/models/product";
import * as c from "@/domains/models/shopping-cart";

describe('Order', () => {

  it('request order by shopping cart', () => {
    const cart = c.buildShoppingCart();
    const p1 = p.buildProduct({ id: '1', name: 'test', price: 11, productImgs: [] } as p.Product);
    const p2 = p.buildProduct({ id: '2', name: 'test2', price: 17, productImgs: [] } as p.Product);

    const added = c.add(cart, p1, p1, p2, p2, p2);
    const finalCart = c.remove(added, p2, p2);

    const order = reqOrder(finalCart);

    expect(order.cart.totalPrice).toBe((11 * 2) + (17 * 1));
    expect(order.status).toBe('PENDING_PAYMENT');
  });
});
