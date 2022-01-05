import { Entity, IEntity } from "@/domains/abstract/entity";
import { Photo } from "@/domains/models/photo";

export interface ProductProps extends IEntity {
  name: string;
  price: number;
  productImgs: Photo[];
}

export default class Product extends Entity<ProductProps> implements ProductProps {
  
  protected constructor(props: ProductProps) {
    super('entity:product', props);
  }

  reconstitue(): Product {
    return new Product(this.props);
  }

  static build(props: Partial<ProductProps>): Product {
    return new Product(props as ProductProps);
  }
  
  get name(): string {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get price(): number {
    return this.props.price;
  }
  set price(price: number) {
    this.props.price = price;
  }
  get productImgs(): Photo[] {
    return this.props.productImgs;
  }
  set productImgs(photos: Photo[]) {
    this.props.productImgs = photos;
  }
}
