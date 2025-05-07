import { ICatalog } from "./ICatalog";
import { IProductDetail } from "./IProductDetail";

export interface IProduct{
    productId:number;
    productName:string;
    catalog:ICatalog;
    productType:string;
    productDetail:IProductDetail;
}