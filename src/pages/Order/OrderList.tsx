import AppTable from "../../components/common/AppTable/AppTable"
import { useNavigate } from "react-router-dom"

const OrderListPage = () => {

    const navigate = useNavigate();

    const columns = [
        { header: "Order ID", accessor: "order_id" },
        {
            header: "Marketplace",
            accessor: "marketplace",
            valueColors: {
                amazon: "bg-green-100 text-green-700",
                noon: "bg-blue-100 text-blue-700",
            },
        },
        { header: "Date", accessor: "order_date", sortable: true },

        {
            header: "Customer Name",
            accessor: "customer_name",
            sortable: true
        },
        {
            header: "Status",
            accessor: "status"
        },
        {
            header: "Total  Amount",
            accessor: "total_amount",
            sortable: true
        },
        {
            header: "Currency",
            accessor: "currency"
        },
        {
            header: "Items Count",
            accessor: "items_count",
            sortable: true
        },
    ]

    const filters = [
        {
            key: "marketplace",
            label: "Market Place",
            type: "select" as const,
            options: [
                { label: "Amazon", value: "amazon" },
                { label: "Noon", value: "noon" },
            ],
        },
        // {
        //     key: "created_at",
        //     label: "Created Date",
        //     type: "date",
        // },
    ]


    return (
        <>
            < AppTable
                title="Order List"
                endpoint="omnisight_v2/order/orderList/"
                queryKey={["orderList"]}
                columns={columns}
                filters={filters}
                showSearch={true}
                showView={true}
                onView={(row) => navigate(`/order/detail/${row.id}`)}
            // showDelete={true}
            />
        </>
    )
}

export default OrderListPage;