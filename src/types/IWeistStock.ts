import { IWeist } from "./IWeist";

export interface IWeistStock{
    id:number;
    stock:number;
    weist:IWeist;
    active:boolean;
}