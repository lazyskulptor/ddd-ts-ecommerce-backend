import { Entity, IEntity } from "@/domains/abstract/entity";
import { Photo } from "@/domains/models/photo";

export interface ProductProps extends IEntity {
  name: string;
  price: number;
  productImgs: Photo[];
}

export default class Product extends Entity<ProductProps> implements ProductProps {
  protected isSameType(v: Entity<ProductProps>): v is Entity<ProductProps> {
    return v instanceof Product;
  }
  
  constructor(props: ProductProps) {
    super(props);
  }
  name: string;
  price: number;
  productImgs: Photo[];

  static build(props: Partial<ProductProps>): Product {
    return new Product(props as ProductProps);
  }
}
