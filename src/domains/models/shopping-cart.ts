import { buildVO, prototype, ValueObject } from "@/domains/abstract/value-object";
import { ProductProps } from "@/domains/models/product";

export interface ShoppingCartProps extends ValueObject {
  products: ProductProps[];
  totalPrice: number;
}

const validateShoppingCart = (v?: ShoppingCartProps) => {
  const that = v ?? {} as ShoppingCartProps;
  that.products = that.products ?? [];
  that.totalPrice = that.totalPrice ?? 0;
  return that;
};

export const buildShoppingCart = (v?: ShoppingCartProps): ShoppingCartProps => {
  const param = validateShoppingCart(v);
  return buildVO(param);
};

export const add = (v: ShoppingCartProps, ...products: ProductProps[]): ShoppingCartProps => {
  const props = prototype(v);
  props.products.push(...products);
  props.totalPrice = calTotalPrice(props.products);
  return buildShoppingCart(props);
};

export const remove = (v: ShoppingCartProps, ...products: ProductProps[]): ShoppingCartProps => {
  const props = prototype(v);
  products.forEach(e => {
    const index = props.products.findIndex(ee => ee.id === e.id);
    props.products.splice(index, 1);
  });
  props.totalPrice = calTotalPrice(props.products);
  return buildShoppingCart(props);
};
  
const calTotalPrice = (products: ProductProps[]): number =>
    products.reduce((sum, curr) => sum + curr?.price ?? 0, 0);
