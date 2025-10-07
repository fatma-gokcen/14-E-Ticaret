import React from 'react'
import '../css/ProductCard.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/slices/productSlice';

export default function ProductCard({ product }) {
    const { id, price, image, title, description } = product;


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyNow = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        navigate("/cart");
        alert(`${1} adet ${product.title} sepete eklendi!`);
    };

    return (
        // Kartın ana div'ine tıklama olayını ekliyoruz
        <div
            className="product-card"
            onClick={() => navigate(`/product-details/${id}`)}
            style={{ cursor: 'pointer' }}
        >
            <img className="product-image" src={image} alt={title} />
            <h3 className="product-title">{title}</h3>
            <p className="product-price">${price}</p>

            <div className='button-group'>
                <div>

                    {/* e.stopPropagation() ile, butonun tıklama olayını üstteki dive iletmesini engelliyoruz */}
                    <button onClick={(e) => { e.stopPropagation(); handleBuyNow(e); }} className='buyNow-button'>Hemen Al</button>


                </div>
            </div>
        </div>
    )
}
