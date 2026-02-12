import AppChart from "../../../components/common/AppGraph/AppGraph";

type orderDataProps = {
    categories?: string[],
    series: []
}

const OrderData = ({ categories, series }: orderDataProps) => {
    return (

        < AppChart title="Orders"
            subtitle="order performance"
            categories={categories}
            series={series}
            type="area"
            height={320}
            colors={["#4F46E5", "#22C55E", "#F59E0B"]}
        />

    )
}

export default OrderData;
