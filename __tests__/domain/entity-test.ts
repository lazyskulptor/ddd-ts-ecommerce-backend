import { Entity, IEntity } from "@/domains/abstract/entity";
import { ProductProps } from "@/domains/models/product";
import Product from "@/domains/models/product";

describe('Entity basic test', () => {
  it('id immutability', () => {
    const product = Product.build({ id: '1234', name: 'Hyeonjun' });

    expect(product.props.id).toBe('1234');
    expect(product.props.name).toBe('Hyeonjun');

    product.props.id = '4567';
    product.props.name = 'Park';

    expect(product.props.id).not.toBe('4567');
    expect(product.props.name).toBe('Park');
  });

  it('id equality', () => {
    const product = Product.build({ id: '1234', name: 'Hyeonjun' });
    const entity = Sample.build({ id: '1234', name: '' });

    expect(product.equals(entity as unknown as Entity<ProductProps>)).not.toBeTruthy();
  });

  it('prop can`t be overwritten direct', () => {
    const product = Product.build({ id: '1234', name: 'Hyeonjun' });
    //@ts-ignore
    const op = () => product.props = { ...product.props, name: "Josh" };

    expect(op).toThrowError(TypeError);
  });
});

interface SampleProps extends IEntity {
  name: string
}

class Sample extends Entity<SampleProps> {
  protected isSameType(v: Entity<SampleProps>): v is Entity<SampleProps> {
    return v instanceof Sample;
  }

  static build(props: Partial<SampleProps>): Sample {
    return new Sample(props as SampleProps);
  }
}
