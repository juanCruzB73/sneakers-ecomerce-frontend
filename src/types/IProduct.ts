import { IDiscount } from "./IDiscount";
import { IImg } from "./IImg";
import { IPrice } from "./IPrice";
import { IWeistStock } from "./IWeistStock";

export interface IProduct{
    productId?:number;
    productName:string;
    productType:string;
    productSubType:string;
    description:string;
    color:string;
    imgs:IImg[];
    sex:string;
    discount:IDiscount;
    price:IPrice;
    active?:boolean;
    weistStock:IWeistStock[]
}