import AppTable from "../../components/common/AppTable/AppTable"


const UserListPage = () => {

    const columns = [
        { header: "Name", accessor: "customer_name" },
        { header: "Email", accessor: "customer_email_id" },
        {
            header: "Marketplace",
            accessor: "marketplace_name",
            valueColors: {
                amazon: "bg-green-100 text-green-700",
                noon: "bg-blue-100 text-blue-700",
            },
        },
        {
            header: "Total Orders",
            accessor: "total_orders"
        },
        {
            header: "Total Orders Items",
            accessor: "total_order_items"
        },
        {
            header: "Total Purchase Amount",
            accessor: "total_purchase_amount"
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
                title="Customer List"
                endpoint="omnisight_v2/customer/customerOrderList/"
                queryKey={["payments"]}
                columns={columns}
                filters={filters}
                showSearch={true}
            // showView={true}
            // showDelete={true}
            />
        </>
    )
}

export default UserListPage;