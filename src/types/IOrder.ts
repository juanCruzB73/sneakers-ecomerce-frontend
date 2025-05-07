import { IAdress } from "./IAdres";
import { IDiscount } from "./IDiscount";

export interface IOrder{
    orderId:number;
    total:number;
    descuentos:IDiscount[];
    purchaingDate:string;
    adress:IAdress;
}