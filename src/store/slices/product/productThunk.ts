import { IProduct } from "../../../types/IProduct";
import { AppDispatch } from "../../store";
import { onAddProduct, onCheckProducts, onClearMessage, onLoadProducts, onSeatMessage, onSelectActiveProduct } from "./productSlice";

const API_URL = import.meta.env.VITE_API_URL;

export const startGetProducts=async()=>{
    return async(dispatch:AppDispatch)=>{
        try{
            dispatch(onCheckProducts());
            const response = await fetch(`${API_URL}/product`);
            const data=await response.json();
            dispatch(onLoadProducts(data));
            dispatch(onClearMessage());
        }catch(error){
            dispatch(onSeatMessage("Error loading the products"));
            throw error;
        }
    }
};

export const startSelectActiveProduct=async(productId:string)=>{
    return async(dispatch:AppDispatch)=>{
        try{
            dispatch(onCheckProducts());
            const response = await fetch(`${API_URL}/product/${productId}`);
            const data=await response.json();
            dispatch(onSelectActiveProduct(data));
            dispatch(onClearMessage());
        }catch(error){
            dispatch(onSeatMessage("Error loading the product"));
            throw error;
        }
    }
};

export const getByFilters=async(sex:string,type:string)=>{
        try{
            const response = await fetch(`${API_URL}/product/sex/${sex}/type/${type}`);
            const data=await response.json();
            return data;
        }catch(err){
            throw err;
        }
};

export const getBySubFilters=async(sex:string,subType:string)=>{
        try{
            const response = await fetch(`${API_URL}/product/sex/${sex}/subtype/${subType}`);
            const data=await response.json();
            return data;
        }catch(err){
            throw err;
        }
};

export const startAddProduct=async(productIn:IProduct)=>{
    return async(dispatch:AppDispatch)=>{
        try{
            dispatch(onCheckProducts());
            const response=await fetch(`${API_URL}/product`,{method:'POST',body:JSON.stringify(productIn)});
            const data=await response.json();
            dispatch(onAddProduct(data));
            dispatch(onClearMessage());
        }catch(error){
            dispatch(onSeatMessage("Error creating the products"));
            throw error;
        }
    }
};



/*
    onClearMessage:(state)=>{
        state.productMessage=null;
    }
*/