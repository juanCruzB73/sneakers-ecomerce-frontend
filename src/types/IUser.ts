import { IAdress } from "./IAddress";

export interface IUser{
    userId?:number;
    name:string;
    lastname:string;
    username:string;
    dni:number;
    email:string;
    password?:string;
    userType:string;
    active:boolean
    adresses?:IAdress[];
}