import { ValueObject, ValueObjectProps } from "@/domains/abstract/value-object";
import Product from "@/domains/models/product";

export interface ShoppingCartProps extends ValueObjectProps {
  products: { [productId: string]: number };
}

export class ShoppingCart extends ValueObject<ShoppingCartProps> implements ShoppingCartProps {
  static build(props: Partial<ShoppingCartProps> = {}): ShoppingCart {
    if (!props.products) {
      props.products = {};
    }
    return new ShoppingCart(props as ShoppingCartProps);
  }

  add(...products: Product[]): ShoppingCart {
    const props = this.prototype();
    products.forEach(e => {
      props.products[e.id] = 1 + (props.products[e.id] ?? 0);
    });
    return new ShoppingCart(props);
  }

  remove(...products: Product[]): ShoppingCart {
    const props = this.prototype();
    products.forEach(e => {
      if (props.products[e.id] && props.products[e.id] > 0)
        props.products[e.id] =  (- 1) + (props.products[e.id] ?? 0);
    });
    return new ShoppingCart(props);
  }

  get products(): { [productId: string]: number } {
    return this.props.products;
  }
}

