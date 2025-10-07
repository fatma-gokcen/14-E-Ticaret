// import React from 'react';
// import logo from '../images/resim.png';
// import '../css/Header.css';
// import { useNavigate } from 'react-router-dom';
// import { SlBasket } from "react-icons/sl";
// import { useSelector } from 'react-redux';
// import { useState } from 'react';

// export default function Header({ searchQuery, setSearchQuery, setCategory, setSortOption }) {

//     const[miniCart,setMiniCart]= useState(false);


//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//     };

//     const handleSortChange = (e) => {
//         setSortOption(e.target.value);
//     };

//     const navigate = useNavigate();
//     const { cart } = useSelector(store => store.product);
//     const totalItems = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

//     return (
//         <div className="header">
//             {/* ... Sol taraf */}
//             <div onClick={() => navigate("/")} className="flex-row">
//                 <img src={logo} className="logo" alt="logo" />
//                 <p className="brand">Click&Shop</p>
//             </div>

//             {/* ... Sağ taraf */}
//             <div className="right-side">
//                 <select className="category-dropdown" onChange={handleCategoryChange}>
//                     <option value="all">Tüm Kategoriler</option>
//                     <option value="kadın">Kadın</option>
//                     <option value="erkek">Erkek</option>
//                     <option value="çantalar">Çantalar</option>
//                     <option value="aksesuarlar">Aksesuarlar</option>
//                     <option value="teknolojik aletler">Teknolojik Aletler</option>
//                 </select>

//                 <select className="sort-dropdown" onChange={handleSortChange}>
//                     <option value="default">Sıralama</option>
//                     <option value="price-asc">Fiyata Göre Artan</option>
//                     <option value="price-desc">Fiyata Göre Azalan</option>
//                     <option value="tittle-asc">A'dan Z'ye</option>
//                     <option value="tittle-desc">Z'den A'ya</option>


//                 </select>

//                 <input
//                     type="text"
//                     className="input"
//                     placeholder="Ürün ara..."
//                     value={searchQuery}
//                     onChange={handleSearch}
//                 />

//                 <div onClick={() => navigate("/cart")} className="basket-container">
//                 onMouseEnter={()=>seMiniCartVisible(true)}
//                 onMouseLeave={()=>seMiniCartVisible(false)}
//                     <SlBasket className="basket-icon" />
//                     {totalItems > 0 && (<span className="item-count">{totalItems}</span>)}
//                 </div>
//             </div>

//         </div>
//     );
// }

import React, { useState } from 'react';
import logo from '../images/resim.png';
import '../css/Header.css';
import { useNavigate } from 'react-router-dom';
import { SlBasket } from "react-icons/sl";
import { useSelector } from 'react-redux';

export default function Header({ searchQuery, setSearchQuery, setCategory, setSortOption }) {
    const [miniCart, setMiniCart] = useState(false);
    const navigate = useNavigate();
    const { cart } = useSelector(store => store.product);
    const totalItems = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="header">
            <div onClick={() => navigate("/")} className="flex-row">
                <img src={logo} className="logo" alt="logo" />
                <p className="brand">Click&Shop</p>
            </div>

            <div className="right-side">
                <select className="category-dropdown" onChange={e => setCategory(e.target.value)}>
                    <option value="all">Tüm Kategoriler</option>
                    <option value="kadın">Kadın</option>
                    <option value="erkek">Erkek</option>
                    <option value="çantalar">Çantalar</option>
                    <option value="aksesuarlar">Aksesuarlar</option>
                    <option value="teknolojik aletler">Teknolojik Aletler</option>
                </select>

                <select className="sort-dropdown" onChange={e => setSortOption(e.target.value)}>
                    <option value="default">Sıralama</option>
                    <option value="price-asc">Fiyata Göre Artan</option>
                    <option value="price-desc">Fiyata Göre Azalan</option>
                    <option value="tittle-asc">A'dan Z'ye</option>
                    <option value="tittle-desc">Z'den A'ya</option>
                </select>

                <input
                    type="text"
                    className="input"
                    placeholder="Ürün ara..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />

                {/* Yeni kapsayıcı div: Sepet ikonu ve mini sepet burada olacak */}
                <div
                    className="cart-and-preview-container"
                    onMouseEnter={() => setMiniCart(true)}
                    onMouseLeave={() => setMiniCart(false)}
                >
                    <div onClick={() => navigate("/cart")} className="basket-container">
                        <SlBasket className="basket-icon" />
                        {totalItems > 0 && (<span className="item-count">{totalItems}</span>)}
                    </div>

                    {miniCart && (
                        <div className="mini-cart-preview">
                            <h4>Sepetinizdeki Ürünler</h4>
                            {cart?.length > 0 ? (
                                cart.map(item => (
                                    <div key={item.id} className="mini-cart-item">
                                        <img src={item.image} alt={item.title} className='mini-cart-item-image' />
                                        <div>
                                            <p className="mini-cart-item-title">{item.title}</p>
                                            <p className="mini-cart-item-quantity">{item.quantity} adet</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Sepetiniz boş.</p>
                            )}
                            <hr />
                            <p>Toplam Tutar: ${totalPrice.toFixed(2)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}