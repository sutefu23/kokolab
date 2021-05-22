import { Order } from "../../models/order";

export type OnChangeModel = {
    value: string | number | boolean,
    error: string,
    touched: boolean,
    field: string
};

export interface IFormStateField<T> {error: string, value: T};

export interface IProductFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    amount: IFormStateField<number>;
    price: IFormStateField<number>;
    hasExpiryDate: IFormStateField<boolean>; 
    category: IFormStateField<string>;
}

export  interface IOrderFormState {
    name: IFormStateField<string>;
    product: IFormStateField<Order | null>;
    amount: IFormStateField<number>;
    totalPrice: IFormStateField<number>;
};

export interface ILoginFormState {
    email: IFormStateField<string>;
    password: IFormStateField<string>;
  }