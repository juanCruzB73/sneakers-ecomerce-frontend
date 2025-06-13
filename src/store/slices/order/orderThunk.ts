const API_URL = import.meta.env.VITE_API_URL;
const token=localStorage.getItem("token");

interface ICreateOrderDetail{
amount:number;product:number
}
interface IPayment{
    address:number;
    orderDetails:number[];
    user:number;
}

export const startCreateOrderDetail=async(createOrderDetail:ICreateOrderDetail)=>{

    const orderDetailResponse = await fetch(`${API_URL}/ordertetails/create`, {
        method: 'POST',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createOrderDetail)
    });
    const data=await orderDetailResponse.json();

    return data;


}

export const startCreateOrder=async(createOrderDetail:ICreateOrderDetail)=>{

    const orderDetailResponse = await fetch(`${API_URL}/ordertetails/create`, {
        method: 'POST',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createOrderDetail)
    });
    const data=await orderDetailResponse.json();

    return data;


}

export const startPayment=async(paymentIn:IPayment)=>{

    const paymentResponse = await fetch(`${API_URL}/mercado`, {
        method: 'POST',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentIn)
    });
    const data=await paymentResponse.json();
    return data;
}