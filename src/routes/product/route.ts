// src/pages/Product/routes.ts
import ProductListPage from "../../pages/Product/ProductList";
import ProductDetail from "../../pages/Product/ProductDetail";


export const ProductRoute = [
    {
        path: "/product",
        element: ProductListPage,
    },
    {
        path: "/product/detail/:product_id",
        element: ProductDetail,
    },
]


