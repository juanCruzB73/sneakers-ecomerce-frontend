import { ICreateProduct } from "../../../components/modals/product-modal/ProductModal";
import { IImg } from "../../../types/IImg";
import { IProduct } from "../../../types/IProduct";
import { AppDispatch } from "../../store";
import { onAddProduct, onCheckProducts, onClearMessage, onDeleteProduct, onLoadActiveProducts, onLoadProducts, onSeatMessage, onSelectActiveProduct, onUpdateProduct } from "./productSlice";

const API_URL = import.meta.env.VITE_API_URL;
const token=localStorage.getItem("token");
const headers = {
  Authorization: token ? `Bearer ${token}` : "",
  "Content-Type": "application/json",
};

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

export const startGetActiveProducts=async()=>{
    return async(dispatch:AppDispatch)=>{
        try{
            dispatch(onCheckProducts());
            const response = await fetch(`${API_URL}/product/active`);
            const data=await response.json();
            dispatch(onLoadActiveProducts(data));
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

export const startAddProduct = (productIn: ICreateProduct) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(onCheckProducts());
      const formData = new FormData();
      if (productIn.image) formData.append("files", productIn.image);

      const token = localStorage.getItem('token');
      
      const imgResponse = await fetch(`${API_URL}/img/upload`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      const imgData: IImg[] = await imgResponse.json();

      const productPayload = {
        ...productIn,
        img: [imgData[0].imgId],
      };
      
      const response = await fetch(`${API_URL}/product/create`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productPayload),
      });

      const data = await response.json();

      dispatch(onAddProduct(data));
      dispatch(onClearMessage());
    } catch (error) {
      dispatch(onSeatMessage("Error creating the products"));
      throw error;
    }
  };
};

export const startUpdateProduct = (productIn: ICreateProduct) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(onCheckProducts());
      const response = await fetch(`${API_URL}/product/update/${productIn.productId}`, {
        method: 'PUT',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productIn),
      });

      const data = await response.json();

      dispatch(onUpdateProduct(data));
      dispatch(onClearMessage());
    } catch (error) {
      dispatch(onSeatMessage("Error creating the products"));
      throw error;
    }
  };
};

export const startDeleteProduct=(porductId:number)=>{
  return async (dispatch: AppDispatch) => {
    try {
      await fetch(`${API_URL}/product/${porductId}`, {method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },});
      dispatch(onClearMessage());
    } catch (error) {
      dispatch(onSeatMessage("Error creating the products"));
      throw error;
    }
  };
}