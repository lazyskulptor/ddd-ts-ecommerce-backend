import { Entity, IEntity } from "@/domains/abstract/entity";
import Product from "@/domains/models/product";
import { ShoppingCartProps } from "@/domains/models/shopping-cart";

export const ORDER_STATUS_VALS = ['PENDING_PAYMENT', 'FAILED', 'PAYED', 'SHIPPING', 'ARRIVED', 'CANCELLING', 'CANCELED', 'CONFIRMED'] as const;
export type ORDER_STATUS = typeof ORDER_STATUS_VALS[number];

export interface OrderProps extends IEntity {
  cart: ShoppingCartProps
  status: ORDER_STATUS;
}

export default class Order extends Entity<OrderProps> implements OrderProps {
  
  constructor(props: OrderProps) {
    super('entity:order', props);
  }

  reconstitue(): Order {
    return new Order(this.props);
  }

  static build(param: ShoppingCartProps | OrderProps): Order {
    // if (param instanceof ShoppingCartProps) {
    //   const now = new Date();
    //   return new Order({ cart: param,
    //                      status: 'PENDING_PAYMENT',
    //                      createdAt: now,
    //                      updatedAt: now,
    //                      deletedAt: null,
    //                   } as OrderProps);
    // }
    return new Order(param as OrderProps);
  }

  static calTotalPrice = (products: Product[]): number =>
    products.reduce((sum, curr) => sum + curr?.price ?? 0, 0);

  get cart(): ShoppingCartProps {
    return this.props.cart;
  }
  get status(): ORDER_STATUS {
    return this.props.status;
  }
  set status(state: ORDER_STATUS)  {
    this.props.status = state;
  }
}
