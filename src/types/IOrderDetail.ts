import { IProduct } from "./IProduct";

export interface IOrderDetail{
    orderDetailId:number;
    amount:number;
    active:boolean;
    produc:IProduct;
}