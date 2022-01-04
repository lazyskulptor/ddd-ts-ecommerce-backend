import Product from "@/domains/models/product";
import { ShoppingCart, ShoppingCartProps } from "@/domains/models/shopping-cart";

describe('Shopping Cart', () => {
  it('build shopping cart', () => {
    const products: ShoppingCartProps = { products: {
      "1" : 2,
      "2" : 3,
    } };
    
    const cart = ShoppingCart.build(products);

    expect(cart.products["1"]).toBe(2);
  });

  it('add, remove item from shopping cart', () => {
    const cart = ShoppingCart.build();
    const p1 = Product.build({ id: '1', name: 'test', });
    const p2 = Product.build({ id: '2', name: 'test2', });
    const finalCart = cart.add(p1, p1, p2, p2, p2)
      .remove(p2, p2);

    expect(finalCart.products["1"]).toBe(2);
    expect(finalCart.products["2"]).toBe(1);
  });
});
