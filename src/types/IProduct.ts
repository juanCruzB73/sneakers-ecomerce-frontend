import { IDiscount } from "./IDiscount";
import { IImg } from "./IImg";
import { IPrice } from "./IPrice";

export interface IProduct{
    productId?:number;
    productName:string;
    productType:string;
    productSubType:string;
    description:string;
    weist:string[];
    stock:number;
    color:string;
    imgs:IImg[];
    sex:string;
    discount:IDiscount;
    price:IPrice;
    active?:boolean;
}