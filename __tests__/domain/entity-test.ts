import { areEntity, buildEntity, equals, IEntity, isEntity } from "@/domains/abstract/entity";
import { prototype } from "@/domains/abstract/value-object";
import { buildProduct, ProductProps } from "@/domains/models/product";

describe('Entity basic test', () => {
  it('checks instance is Entity', () => {
    const props = { _discriminator: 'sample', id: '1234' } as unknown as ProductProps;
    const entity1 = buildProduct(props);
    const entity2 = buildProduct(props);
    const notEntity = buildEntity(props);
    delete notEntity._discriminator;

    expect(isEntity(entity1)).toBeTruthy();
    expect(isEntity(entity2)).toBeTruthy();
    expect(areEntity(entity1, entity2)).toBeTruthy();
    expect(areEntity(entity1, notEntity)).not.toBeTruthy();
    expect(isEntity(notEntity)).not.toBeTruthy();
  });

  it('id immutability', () => {
    const product = buildProduct({ id: '1234', name: 'Hyeonjun' } as ProductProps);

    expect(product.id).toBe('1234');
    expect(product.name).toBe('Hyeonjun');

    product.name = 'Park';

    expect(product.name).toBe('Park');
  });

  it('id equality', () => {
    const product = buildProduct({ id: '1234', name: 'Hyeonjun' } as ProductProps);
    const entity = buildEntity({ _discriminator: 'sample', id: '1234', name: '' } as unknown as IEntity);
    const cloned = prototype(product);

    
    expect(equals(product, entity)).not.toBeTruthy();
    expect(cloned.name).toBe(product.name);
  });
});

