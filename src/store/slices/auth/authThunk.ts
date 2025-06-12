import { AppDispatch } from "../../store";
import { startGetAddresses } from "../address/addressThunk";
import { onSeatMessage } from "../product/productSlice";
import { startGetUsers } from "../user/userThunk";
import { IUserAuth, onLogin, onLogOut } from "./authSlice";

const API_URL = import.meta.env.VITE_API_URL;

export const startLogin=async({username,password})=>{
    return async(dispatch:AppDispatch)=>{
        try{
            const response = await fetch(`${API_URL}/auth/login`,{method:'POST',headers: { 'Content-Type': 'application/json' },body:JSON.stringify({username,password})});
            const data = await response.json();
            localStorage.setItem('token',data.token);
            dispatch(onLogin({email:data.email,username:data.username,userId:data.userId,userType:data.userType}))
            dispatch(await startGetAddresses(data.userId));
            if(data.userType==="admin"){
                dispatch(await startGetUsers());
            }
        }catch(error){
            dispatch(onSeatMessage("Error loading the product"));
            throw error;
        }
    }
};

export const startRegister=async({name,lastname,dni,email,username,password})=>{
    return async(dispatch:AppDispatch)=>{
        try{
            const response = await fetch(`${API_URL}/auth/register`,{method:'POST',headers: { 'Content-Type': 'application/json' },body:JSON.stringify({name,lastname,dni,email,username,password})});
            const data = await response.json();
            localStorage.setItem('token',data.token);
            dispatch(onLogin({email:data.email,username:data.username,userId:data.userId,userType:data.userType}))
        }catch(error){
            dispatch(onSeatMessage("Error loading the product"));
            throw error;
        }
    }
}