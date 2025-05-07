import { IAdress } from "./IAdres";

export interface IUser{
    userId:number;
    name:string;
    dni:string;
    email:string;
    password:string;
    rol:string;
    adresses:IAdress[];
}