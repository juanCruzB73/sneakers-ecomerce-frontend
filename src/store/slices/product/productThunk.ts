export const startGetProducts=async()=>{
    const response = await fetch("http://localhost:8081/product");
    const data=await response.json();
    return data;
};