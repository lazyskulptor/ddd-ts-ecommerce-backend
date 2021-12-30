import { Entity, IEntity } from "@/domains/abstract/entity";
import { ProductProps } from "@/domains/models/product";
import Product from "@/domains/models/product";

describe('Entity 기본 테스트', () => {
  it('id 는 바꿀 수 없음', () => {
    const product = Product.create({ id: '1234', name: 'Hyeonjun' });

    expect(product.props.id).toBe('1234');
    expect(product.props.name).toBe('Hyeonjun');

    product.props.id = '4567';
    product.props.name = 'Park';

    expect(product.props.id).not.toBe('4567');
    expect(product.props.name).toBe('Park');
  });

  it('id 는 바꿀 수 없음', () => {
    const product = Product.create({ id: '1234', name: 'Hyeonjun' });
    const entity = Sample.create({ id: '1234', name: '' });

    expect(product.equals(entity as unknown as Entity<ProductProps>)).not.toBeTruthy();
  });
});

interface SampleProps extends IEntity {
  name: string
}

class Sample extends Entity<SampleProps> {
  protected isSameType(v: Entity<SampleProps>): v is Entity<SampleProps> {
    return v instanceof Sample;
  }

  static create(props: Partial<SampleProps>): Sample {
    return new Sample(props as SampleProps);
  }
}
