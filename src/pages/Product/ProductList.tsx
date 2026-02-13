import AppTable from "../../components/common/AppTable/AppTable"
import { useNavigate } from "react-router-dom"

const ProductListpage = () => {

    const navigate = useNavigate();

    const columns = [
        { header: "ASIN", accessor: "asin" },
        { header: "SKU", accessor: "sku" },
        { header: "Name", accessor: "product_title" , truncate: true},
        { header: "Price", accessor: "price", sortable: true },
        { header: "Quantity", accessor: "quantity", sortable: true },
        { header: "COGS", accessor: "total_cogs" },
    ]

    return (
        <>
            < AppTable
                title="Product List"
                endpoint="omnisight_v2/product/productListAPI/"
                queryKey={["orderList"]}
                columns={columns}
                // filters={filters}
                showSearch={true}
                showView={true}
                onView={(row) => navigate(`/product/detail/${row.id}`)}
            // showDelete={true}
            />
        </>
    )
}

export default ProductListpage;



    

