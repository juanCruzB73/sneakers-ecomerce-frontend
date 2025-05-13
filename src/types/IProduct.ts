import { ICatalog } from "./ICatalog";
import { IPrice } from "./IPrice";
import { IProductDetail } from "./IProductDetail";
import { IWeist } from "./IWeist";

export interface IProduct{
    productId:number;
    productName:string;
    catalog:ICatalog;
    productType:string;
    weist:IWeist[];
    stock:number;
    color:string;
    state:boolean;
    img:string;
    sex:string;
    price:IPrice;

}