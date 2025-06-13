import { useSelector } from 'react-redux';
import style from './productModal.module.css';
import { useDispatch } from 'react-redux';
import { onHandlePopUp } from '../../../store/slices/modals-states/modalSlice';
import { AppDispatch } from '../../../store/store';
import { RootState } from '@reduxjs/toolkit/query';
import { useForm } from '../../../hooks/useForm';
import { Weists } from '../../UI/multipleSelectWeist/Weists';
import { startAddProduct, startUpdateProduct } from '../../../store/slices/product/productThunk';
import { useEffect, useState } from 'react';
import { onSelectActiveProduct } from '../../../store/slices/product/productSlice';
import { IImg } from '../../../types/IImg';
import { IWeistStock } from '../../../types/IWeistStock';

const API_URL = import.meta.env.VITE_API_URL;
export interface ICreateProduct{
    productId?:number;
    productName: string;
    productType: string;
    description:string;
    productSubType: string;
    color: string;
    image: File | null;
    sex: string;
    //discount?: number;
    price: number;
    weistStocks: {
      stock: number;
      weist: {
        id: number;
        value: string;
      };
    }[];
}

export const ProductModal = () => {

  const {statusPopUp} = useSelector((state:RootState)=>state.popUp);
  const {activeProduct} = useSelector((state:RootState)=>state.product);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [weistStocks, setWeistStocks] = useState<IWeistStock[]>([]);


  const dispatch = useDispatch<AppDispatch>();
  const handlePopUpProduct=()=>{
    dispatch(onSelectActiveProduct(null))
    dispatch(onHandlePopUp({popUpType:"",statusPopUp:!statusPopUp}))
  }

const [productInitialState, setProductInitialState] = useState({
  productName: '',
  productType: '',
  productSubType: '',
  description: '',
  weistStocks: [],
  stock: 0,
  color: '',
  sex: '',
  image: null,
  price: 0,
});

const {
    productName,
    productType,
    productSubType,
    description,
    color,
    sex,
    price,
    formValues,
    onInputChange,
    onResetForm,
    setFormValue,
  } = useForm<ICreateProduct>(productInitialState);

  useEffect(() => {
    if (activeProduct) {
      const mappedWeistStocks = activeProduct.weistStock.map((ws: IWeistStock) => ({
        stock: ws.stock,
        weist: { id: ws.weist.id, value: ws.weist.value },
      }));

      const newValues: ICreateProduct = {
        productId: activeProduct.productId,
        productName: activeProduct.productName,
        productType: activeProduct.productType,
        productSubType: activeProduct.productSubType,
        description: activeProduct.description,
        color: activeProduct.color,
        sex: activeProduct.sex,
        image: null,
        price: activeProduct.price.salePrice,
        weistStocks: mappedWeistStocks,
      };

      setFormValue(newValues);
      setWeistStocks(mappedWeistStocks);
      setPreviewUrl(activeProduct.imgs[0]?.imgUrl || null);
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
  
const onHandleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const finalFormValues = {
    ...formValues,
    weistStocks: weistStocks,
  };

  if (activeProduct) {
    if (!formValues.image) {
      dispatch(startUpdateProduct({
        ...finalFormValues,
        productId: activeProduct.productId,
        img: [activeProduct.imgs[0].imgId],
        price: Number(formValues.price),
      }));
    } else {
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

      dispatch(startUpdateProduct({
        ...finalFormValues,
        productId: activeProduct.productId,
        img: [imgData[0].imgId],
        price: Number(formValues.price),
      }));
    }
  } else {
    dispatch(startAddProduct({
      ...finalFormValues,
      price: Number(formValues.price),
    }));
  }

  handlePopUpProduct();
};
  console.log(formValues)
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
                <Weists weistStocks={weistStocks} setWeistStocks={setWeistStocks} />

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
