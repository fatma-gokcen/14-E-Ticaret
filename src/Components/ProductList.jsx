
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllProducts } from '../Redux/slices/productSlice';
// import ProductCard from './ProductCard';
// import '../css/ProductList.css';

// // ProductList artık App.jsx'ten prop alıyor.
// export default function ProductList({ searchQuery }) {
//     const dispatch = useDispatch();
//     const { products } = useSelector((store) => store.product);

//     useEffect(() => {
//         dispatch(getAllProducts());
//     }, [dispatch]);

//     const filteredProducts = products.filter(product =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className="product-list">
//             {filteredProducts && filteredProducts.length > 0 ? (
//                 filteredProducts.map((p) => (
//                     <ProductCard key={p.id} product={p} />
//                 ))
//             ) : (
//                 <p>Ürün bulunamadı.</p>
//             )}
//         </div>
//     );
// }

// ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../Redux/slices/productSlice';
import ProductCard from './ProductCard';
import '../css/ProductList.css';

export default function ProductList({ searchQuery, category, sortOption }) {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        let updatedList = [...products];

        // 1. Kategoriye göre filtreleme
        if (category && category !== 'all') {
            updatedList = updatedList.filter(product =>
                product.category.toLowerCase() === category.toLowerCase()
            );
        }

        // 2. Arama metnine göre filtreleme
        if (searchQuery) {
            updatedList = updatedList.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 3. Sıralama
        if (sortOption === 'price-asc') {
            updatedList.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            updatedList.sort((a, b) => b.price - a.price);
        }

        else if (sortOption === "tittle-asc") {
            updatedList.sort((a, b) => a.title.localeCompare(b.tittle));
        }
        else if (sortOption === "tittle-desc") {
            updatedList.sort((a, b) => b.title.localeCompare(a.tittle));
        }

        setFilteredAndSortedProducts(updatedList);
    }, [searchQuery, category, sortOption, products]);

    return (
        <div className="product-list">
            {filteredAndSortedProducts && filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))
            ) : (
                <p>Ürün bulunamadı.</p>
            )}
        </div>
    );
}