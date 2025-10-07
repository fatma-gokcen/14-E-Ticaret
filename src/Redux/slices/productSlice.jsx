
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// const initialState = {
//     products: [],
//     selectedProduct: {},
//     loading: false,
//     cart: []
// }

// const BASE_URL = "https://fakestoreapi.com";

// export const getAllProducts = createAsyncThunk(
//     "product/getAllProducts",
//     async () => {
//         const response = await fetch(`${BASE_URL}/products`);
//         if (!response.ok) {
//             throw new Error("Sunucudan geçerli bir cevap alınamadı");
//         }
//         const data = await response.json();
//         return data;
//     }
// );

// export const productSlice = createSlice({
//     name: "product",
//     initialState,
//     reducers: {
//         setSelectedProduct: (state, action) => {
//             state.selectedProduct = action.payload
//         },
//         clearSelectedProduct: (state) => {
//             state.selectedProduct = {}
//         },
//         // SEPETE EKLEME REDUCER'I
//         addToCart: (state, action) => {
//             const product = action.payload;
//             const existingProduct = state.cart.find(item => item.id === product.id);

//             if (existingProduct) {
//                 // Eğer ürün sepette varsa, miktarını artır.
//                 existingProduct.quantity += product.quantity;
//             } else {
//                 // Eğer ürün sepette yoksa, yeni ürün olarak ekle.
//                 state.cart.push({ ...product });
//             }
//         },
//     },

//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllProducts.pending, (state, action) => {
//                 state.loading = true;
//             })
//             .addCase(getAllProducts.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.products = action.payload;
//             })
//             .addCase(getAllProducts.rejected, (state, action) => {
//                 state.loading = false;
//                 console.error("Ürünler çekilemedi:", action.error.message);
//             });
//     },
// });

// export const { setSelectedProduct, addToCart, clearSelectedProduct } = productSlice.actions

// export default productSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    products: [],
    selectedProduct: {},
    loading: false,
    cart: []
}

const BASE_URL = "https://fakestoreapi.com";

// Yeni yardımcı fonksiyon: API kategorilerini kendi kategorilerinizle eşleştirme
const mapApiCategory = (apiCategory) => {
    // API'den gelen kategoriye göre eşleşme
    const categoryMap = {
        'electronics': 'teknolojik aletler',
        'jewelery': 'aksesuarlar',
        'men\'s clothing': 'erkek',
        'women\'s clothing': 'kadın',
        'bags': 'çantalar',
        'laptops': 'teknolojik aletler'
    };
    return categoryMap[apiCategory.toLowerCase()] || 'diğer';
};

export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async () => {
        const response = await fetch(`${BASE_URL}/products`);


        if (!response.ok) {
            throw new Error("Sunucudan geçerli bir cevap alınamadı");
        }
        const data = await response.json();
        return data;
    }
);
// reducers: durumu güncellerler
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = {}
        },
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.cart.push({ ...product });
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                // Her ürünü dönüştürerek Redux store'a kaydediyoruz
                state.products = action.payload.map(product => ({
                    ...product,
                    // Yeni eklenen category özelliği
                    category: mapApiCategory(product.category)
                }));
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                console.error("Ürünler çekilemedi:", action.error.message);
            });
    },
});

export const { setSelectedProduct, addToCart, clearSelectedProduct } = productSlice.actions

export default productSlice.reducer