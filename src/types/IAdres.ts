import { IOrder } from "./IOrder";
import { IUser } from "./IUser";

export interface IAdress{
    adressId:number;
    locality:string;
    country:string;
    province:string;
    city:string;
    users:IUser[];
    order:IOrder;
}