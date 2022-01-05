import Product from "@/domains/models/product";
import { ShoppingCart, ShoppingCartProps } from "@/domains/models/shopping-cart";

describe('Shopping Cart', () => {

  it('build shopping cart', () => {
    const products: ShoppingCartProps = { products: [], totalPrice: 0 };
    
    const cart = ShoppingCart.build(products);

    expect(cart.products).toMatchObject([]);
    expect(cart.totalPrice).toBe(0);
  });

  it('add, remove item from shopping cart', () => {
    const cart = ShoppingCart.build();
    const p1 = Product.build({ id: '1', name: 'test', price: 0 });
    const p2 = Product.build({ id: '2', name: 'test2', price: 0 });

    const finalCart = cart.add(p1, p1, p2, p2, p2)
      .remove(p2, p2);

    expect(finalCart.products.filter(e => e._id === '1').length).toBe(2);
    expect(finalCart.products.filter(e => e._id === '2').length).toBe(1);
    expect(finalCart.totalPrice).toBe(0);
  });
});
