import * as p from "@/domains/models/product";

describe('Product', () => {

  it('id 는 바꿀 수 없음', () => {
    const param =  { id: '1', name: 'test', price: 11, productImgs: [] };

    const product = p.buildProduct(param as p.ProductProps);

    expect(product.id).toBe('1');
    expect(product.name).toBe('test');
    expect(product.price).toBe(11);
  });
});
