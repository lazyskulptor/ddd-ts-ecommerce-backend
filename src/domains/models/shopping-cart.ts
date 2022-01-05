import { ValueObject, ValueObjectProps } from "@/domains/abstract/value-object";
import Product from "@/domains/models/product";
import Order from "@/domains/models/order";

export interface ShoppingCartProps extends ValueObjectProps {
  products: Product[];
  totalPrice: number;
}

export class ShoppingCart extends ValueObject<ShoppingCartProps> implements ShoppingCartProps {
  static build(props: Partial<ShoppingCartProps> = {}): ShoppingCart {
    if (!props.products) {
      props.products = [];
    }
    props.totalPrice = Order.calTotalPrice(props.products);
    return new ShoppingCart(props as ShoppingCartProps);
  }

  add(...products: Product[]): ShoppingCart {
    const props = this.prototype();
    props.products.push(...products);
    props.totalPrice = Order.calTotalPrice(props.products);
    return new ShoppingCart(props);
  }

  remove(...products: Product[]): ShoppingCart {
    const props = this.prototype();
    products.forEach(e => {
      const index = props.products.findIndex(ee => ee._id === e._id);
      props.products.splice(index, 1);
    });
    props.totalPrice = Order.calTotalPrice(props.products);
    return new ShoppingCart(props);
  }

  get products(): Product[] {
    return this.props.products;
  }

  get totalPrice(): number {
    return this.props.totalPrice;
  }
}

