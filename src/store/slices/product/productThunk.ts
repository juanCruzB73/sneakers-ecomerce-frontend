import { IProduct } from "../../../types/IProduct";
import { AppDispatch } from "../../store";
import { onAddProduct, onCheckProducts, onClearMessage, onLoadProducts, onSeatMessage } from "./productSlice";

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