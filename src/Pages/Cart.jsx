import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../css/Cart.css";
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const navigate = useNavigate();
    const { cart } = useSelector(store => store.product);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <div className="cart-page-container">
            <div className="cart-content">
                <h1>Sepetim</h1>
                {cart?.length > 0 ? (
                    <div className='cart-items-container'>
                        {cart.map(item => (
                            <div key={item.id} className="cart-item" onClick={() => navigate(`/product-details/${item.id}`)}>
                                <p>{item.title} - {item.quantity} adet</p>
                                <p>Birim Fiyat: ${item.price}</p>
                                <p>Toplam: ${item.price * item.quantity}</p>
                                <img className="product-image" src={item.image} alt={item.title} />
                            </div>
                        ))}
                        <hr />
                        <h2>Toplam Tutar: ${totalPrice.toFixed(2)}</h2>
                    </div>
                ) : (
                    <p>Sepetiniz boş.</p>
                )}
            </div>
        </div>
    );
}