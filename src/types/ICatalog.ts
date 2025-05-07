import { IProduct } from "./IProduct";

export interface ICatalog{
    catalogId:number;
    catalogName:string;
    product:IProduct;
}