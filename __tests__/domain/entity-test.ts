import { Entity, IEntity } from "@/domains/abstract/entity";
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
    const cloned = product.reconstitue();

    //@ts-expect-error to test
    expect(product.equals(entity)).not.toBeTruthy();
    expect(product.equals(entity as Entity<Product>)).not.toBeTruthy();
    expect(cloned.props.name).toBe(product.name);
  });

  it('prop can`t be overwritten direct', () => {
    const product = Product.build({ id: '1234', name: 'Hyeonjun' });
    //@ts-expect-error to test
    const op = () => product.props = { ...product.props, name: "Josh" };

    expect(op).toThrowError(TypeError);
  });
});

interface SampleProps extends IEntity {
  name: string
}

class Sample extends Entity<SampleProps> {
  reconstitue(): Entity<SampleProps> {
    return Sample.build(this.props);
  }

  static build(props: Partial<SampleProps>): Sample {
    return new Sample('sample', props as SampleProps);
  }
}
