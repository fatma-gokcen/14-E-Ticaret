
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct, addToCart, clearSelectedProduct } from '../Redux/slices/productSlice';
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";



export default function ProductDetails() {
    const [count, setCount] = useState(1);
    const { id } = useParams();
    const dispatch = useDispatch();

    const { products, selectedProduct } = useSelector((store) => store.product);





    useEffect(() => {
        // Ürün listesi varsa ve selectedProduct henüz seçilmemişse
        if (products && Object.keys(selectedProduct).length === 0) {
            const product = products.find((p) => p.id == id);
            if (product) {
                dispatch(setSelectedProduct(product));
            }
        }

        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [products, id, dispatch]);



    // Ürün bilgileri henüz yüklenmediyse bekleme ekranı gösteriyoruz.

    if (Object.keys(selectedProduct).length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '100px' }}>Ürün bilgileri yükleniyor...</div>;
    }

    const { price, image, title, description } = selectedProduct;

    // Miktar artırma fonksiyonu
    const increment = () => {
        setCount(count + 1);
    };

    // Miktar azaltma fonksiyonu
    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    // Sepete ekleme fonksiyonu
    const handleAddToCart = () => {
        const productToAdd = { ...selectedProduct, quantity: count };
        dispatch(addToCart(productToAdd));
        alert(`${count} adet ${selectedProduct.title} sepete eklendi!`);
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ marginTop: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <img src={image} width={200} height={200} alt={title} />
            </div>

            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '20px' }}>
                <h2 style={{ fontFamily: "sans-serif", color: "darkred" }}>{title}</h2>
                <h3>{description}</h3>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px"
            }}>
                <h1 style={{ marginBottom: "0" }}>{price}$</h1>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "25px",
                    cursor: "pointer"
                }}>
                    <FaCircleMinus onClick={decrement} />
                    <span>{count}</span>
                    <FaPlusCircle onClick={increment} />
                </div>
                <button
                    onClick={handleAddToCart}
                    style={{ fontSize: "20px", backgroundColor: "lightgray", borderRadius: "100px", padding: '10px 20px' }}
                >
                    Sepete Ekle
                </button>
            </div>
        </div>
    );
}
