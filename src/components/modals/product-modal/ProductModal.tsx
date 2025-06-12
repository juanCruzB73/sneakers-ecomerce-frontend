import { useSelector } from 'react-redux';
import style from './productModal.module.css';
import { useDispatch } from 'react-redux';
import { onHandlePopUp } from '../../../store/slices/modals-states/modalSlice';
import { AppDispatch } from '../../../store/store';
import { RootState } from '@reduxjs/toolkit/query';
import { useForm } from '../../../hooks/useForm';
import { WeistMultiSelect } from '../../UI/multipleSelectWeist/MultipleSelectWeist';
import { startAddProduct, startUpdateProduct } from '../../../store/slices/product/productThunk';
import { useEffect, useState } from 'react';
import { onSelectActiveProduct } from '../../../store/slices/product/productSlice';
import { IImg } from '../../../types/IImg';

const API_URL = import.meta.env.VITE_API_URL;
export interface ICreateProduct{
    productId?:number;
    productName: string;
    productType: string;
    productSubType: string;
    description: string;
    weist: string[];
    stock: number;
    color: string;
    image: File | null;
    sex: string;
    discount?: number;
    price: number;
}

export const ProductModal = () => {

  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const {activeProduct} = useSelector((state:RootState)=>state.product);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);


  const dispatch = useDispatch<AppDispatch>();
  const handlePopUpProduct=()=>{
    dispatch(onSelectActiveProduct(null))
    dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
  }

  const [productInitialState,setProductInitialState]=useState({
  productName: '',
  productType: '',
  productSubType: '',
  description: '',
  weist: [],
  stock: 0,
  color: '',
  sex: '',
  image: null,
  price: 0,
})
const {
    productName,
    productType,
    productSubType,
    description,
    weist,
    stock,
    color,
    sex,
    discount,
    price,
    formValues,
    onInputChange,
    onResetForm,
    setFormValue,
  } = useForm<ICreateProduct>(productInitialState);

  useEffect(() => {
  if (activeProduct) {
    const newValues = {
      productName: activeProduct.productName,
      productType: activeProduct.productType,
      productSubType: activeProduct.productSubType,
      description: activeProduct.description,
      weist: activeProduct.weists,
      stock: activeProduct.stock,
      color: activeProduct.color,
      sex: activeProduct.sex,
      image: null,
      price: activeProduct.price.salePrice,
    };
    setFormValue(newValues);
    setPreviewUrl(activeProduct.imgs[0].imgUrl);
  }
}, [activeProduct]);

  const productCategories = ['sport', 'fashion', 'urban'];
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'];

  const productTypes = [
    'football',
    'basketball',
    'running',
    'heels',
    'boots',
    'dress',
    'sandals',
    'slipsOn',
  ];  
  
  const onHandleSubmit=async(e: React.FormEvent)=>{
    e.preventDefault();
    if(activeProduct){
      if(!formValues.image){
        const data={...formValues,productId:activeProduct.productId,img:[activeProduct.imgs[0].imgId],price:Number(formValues.price),stock:Number(formValues.stock)}
        dispatch(startUpdateProduct(data));
      }else{
        const formData = new FormData();
        formData.append("files", formValues.image);

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
          ...formValues,
          productId:activeProduct.productId,
          img: [imgData[0].imgId],
          price:Number(formValues.price),
          stock:Number(formValues.stock)
        };
        dispatch(startUpdateProduct(productPayload));
      }
    }else{
      dispatch(startAddProduct({...formValues,price:Number(formValues.price),stock:Number(formValues.stock)}));
    }
    handlePopUpProduct();
  }
  
  return (
    <div className={style.productModalMainContainer}>
      <form className={style.productModalContainer} onSubmit={onHandleSubmit}>
        <div className={style.productModalInputMainContainer}>
          <div className={style.productModalInputContainer}>
            <input
              type="text"
              placeholder="Product name"
              name="productName"
              value={productName}
              onChange={onInputChange}
            />
            <input
              type="number"
              placeholder="Precio"
              name="price"
              value={price}
              onChange={onInputChange}
            />
            <input
              type="number"
              placeholder="Stock"
              name="stock"
              value={stock}
              onChange={onInputChange}
            />
            <select name="productType" value={productType} onChange={onInputChange}>
              <option value="">Category</option>
              {productCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select name="productSubType" value={productSubType} onChange={onInputChange}>
              <option value="">Sub Category</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select name="color" value={color} onChange={onInputChange}>
              <option value="">Color</option>
              {colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select name="sex" value={sex} onChange={onInputChange}>
              <option value="">Sex</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>

          </div>

          <div className={style.productModalInputMainContainerDescription}>
            <div className={style.productModalInputContainer}>
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={description}
                onChange={onInputChange}
                style={{padding:"2.5rem",margin:"0px"}}
              />
              <div className={style.productModalImgInputContainer}>
                <span>Select product image</span>
                <input type="file"  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFormValue({ ...formValues, image: file });
                    if (file) {
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
                 
                  <img
                    src={previewUrl || ""}
                    alt="preview"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                <WeistMultiSelect
              selectedWeist={weist}
              onChange={(newWeist: string[]) =>
                setFormValue({ ...formValues, weist: newWeist })
              }
            />
              </div>
            </div>
          </div>
        </div>

        <div className={style.productModalButtons}>
          <button type="button" onClick={handlePopUpProduct}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
