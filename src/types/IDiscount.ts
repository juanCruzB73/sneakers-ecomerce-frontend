import { IPrice } from "./IPrice";

export interface IDiscount{
    discountId:number;
    startDate:string;
    endDate:string;
    price:IPrice;
}