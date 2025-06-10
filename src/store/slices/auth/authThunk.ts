import { AppDispatch } from "../../store";
import { onSeatMessage } from "../product/productSlice";
import { IUserAuth, onLogin } from "./authSlice";

const API_URL = import.meta.env.VITE_API_URL;

export const startLogin=async({username,password})=>{
    return async(dispatch:AppDispatch)=>{
        try{
            const response = await fetch(`${API_URL}/auth/login`,{method:'POST',headers: { 'Content-Type': 'application/json' },body:JSON.stringify({username,password})});
            const data = await response.json();
            localStorage.setItem('token',data.token);
            dispatch(onLogin({email:data.email,username:data.username,userId:data.userId}))
        }catch(error){
            dispatch(onSeatMessage("Error loading the product"));
            throw error;
        }
    }
};