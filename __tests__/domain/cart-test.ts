import { buildProduct, Product } from "@/domains/models/product";
import { add, buildShoppingCart, remove, ShoppingCart } from "@/domains/models/shopping-cart";

describe('Shopping Cart', () => {

  it('build shopping cart', () => {
    const products: ShoppingCart = { products: [], totalPrice: 0 };
    
    const cart = buildShoppingCart(products);
    console.debug(cart);

    expect(cart.products).toMatchObject([]);
    expect(cart.totalPrice).toBe(0);
  });

  it('add, remove item from shopping cart', () => {
    const cart = buildShoppingCart();
    const p1 = buildProduct({ id: '1', name: 'test', price: 0 } as Product);
    const p2 = buildProduct({ id: '2', name: 'test2', price: 0 } as Product);
    
    const added = add(cart, p1, p1, p2, p2, p2);
    const finalCart = remove(added, p2, p2);

    expect(finalCart.products.filter(e => e.id === '1').length).toBe(2);
    expect(finalCart.products.filter(e => e.id === '2').length).toBe(1);
    expect(finalCart.totalPrice).toBe(0);
  });
});
