// src/pages/OrderList/routes.ts
import OrderListPage from "../../pages/Order/OrderList";
import OrderDetailPage from "../../pages/Order/OrderDetail";

export const ORDER_ROUTE = [
    {
        path: "/order",
        element: OrderListPage,
    },
    {
        path: "/order/detail/:order_id",
        element: OrderDetailPage,
    }
]


