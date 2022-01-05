import Product from "@/domains/models/product";

describe('Product', () => {

  it('id 는 바꿀 수 없음', () => {
    const param =  { id: '1', name: 'test', price: 11 };

    const product = Product.build(param);

    expect(product.id).toBe('1');
    expect(product.name).toBe('test');
    expect(product.price).toBe(11);
  });
});
