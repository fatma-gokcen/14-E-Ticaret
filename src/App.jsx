
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import ProductList from './Components/ProductList';
// import ProductDetails from './Components/ProductDetails';
// import Cart from './Pages/Cart';

// import './App.css';

// export function App() {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <Router>
//       {/* app-countainer divine aldım her şeyi */}
//       <div className="app-container">
//         <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//         <main className="content">
//           <Routes>
//             <Route path="/" element={<ProductList searchQuery={searchQuery} />} />
//             <Route path="/product-details/:id" element={<ProductDetails />} />
//             <Route path="/cart" element={<Cart />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   )
// }

// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProductList from './Components/ProductList';
import ProductDetails from './Components/ProductDetails';
import Cart from './Pages/Cart';
import './App.css';

export function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all'); // Kategori durumu
  const [sortOption, setSortOption] = useState('default'); // Sıralama durumu

  return (
    <Router>
      <div className="app-container">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCategory={setCategory}
          setSortOption={setSortOption}
        />
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  searchQuery={searchQuery}
                  category={category} // <-- Eksik olan prop
                  sortOption={sortOption} // <-- Eksik olan prop
                />
              }
            />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}