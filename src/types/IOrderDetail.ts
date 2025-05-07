import { IOrder } from "./IOrder";

export interface IOrderDetail{
    orderDetailId:number;
    order:IOrder;
    amount:number
}