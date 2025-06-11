import { IAdress } from "./IAddress";

export interface IUser{
    userId?:number;
    name:string;
    lastname:string;
    username:string;
    dni:string;
    email:string;
    password?:string;
    userType:string;
    active:boolean
    adresses?:IAdress[];
}