import { IPrice } from "./IPrice";
import { IProduct } from "./IProduct";
import { IWeist } from "./IWeist";

export interface IProductDetail{
    productDetailId:number;
    weist:IWeist[];
    stock:number;
    product:IProduct;
    color:string;
    state:boolean;
    price:IPrice;
}