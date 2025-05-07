import { IDiscount } from "./IDiscount";
import { IProductDetail } from "./IProductDetail";

export interface IPrice{
    priceId:number;
    purchasePrice:number;
    salePrice:number;
    productDetail:IProductDetail;
    discount:IDiscount;
}