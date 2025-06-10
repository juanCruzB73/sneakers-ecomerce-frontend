import { IAdress } from "./IAddress";
import { IUser } from "./IUser";

export interface IOrder{
    orderId:number;
    date:string;
    total:number;
    addres:IAdress;
    active:boolean;
    user:IUser;
}