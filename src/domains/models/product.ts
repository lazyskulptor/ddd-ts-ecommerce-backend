import { Entity, IEntity } from "@/domains/abstract/entity";
import { Photo } from "./photo";

export interface ProductProps extends IEntity {
  name: string;
  productImgs: Photo[];
}

export default class Product extends Entity<ProductProps> {
  protected isSameType(v: Entity<ProductProps>): v is Entity<ProductProps> {
    return v instanceof Product;
  }
  
  constructor(props: ProductProps) {
    super(props);
  }

  static create(props: Partial<ProductProps>): Product {
    return new Product(props as ProductProps);
  }
  
  static reconstitute(props: Partial<ProductProps>): Product {
    return new Product(props as ProductProps);
  }
}
