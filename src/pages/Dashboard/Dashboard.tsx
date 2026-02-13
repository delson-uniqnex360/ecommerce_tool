//@ts-nocheck
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppChart from "../../components/common/AppGraph/AppGraph";
import api from "../../api/axios";

// ----------------------
// Types
// ----------------------
type OrderGraphItem = {
    date: string;
    total_orders: number;
    amazon: number;
    noon: number;
};

type RevenueMetrics = {
    total_revenue: number;
    revenue_per_marketplace: Record<string, number>;
    revenue_per_item: Record<string, number>;
    average_order_value: number;
};

type DashboardData = {
    order_graph_data: OrderGraphItem[];
    revenue_metrics: RevenueMetrics;
};

// ----------------------
// Dashboard Component
// ----------------------
// const DashboardPage = () => {
//     // ----------------------
//     // Filters state
//     // ----------------------
//     const [startDate, setStartDate] = useState<string>("");
//     const [endDate, setEndDate] = useState<string>("");
//     const [marketplace, setMarketplace] = useState<"all" | "amazon" | "noon">("all");

//     // ----------------------
//     // Fetch dashboard data
//     // ----------------------
//     const { data, isLoading, isError } = useQuery<DashboardData>({
//         queryKey: ["dashboard-kpi-metrics", startDate, endDate, marketplace],
//         queryFn: async () => {
//             const params: Record<string, any> = {};
//             if (startDate) params.start_date = startDate;
//             if (endDate) params.end_date = endDate;
//             if (marketplace !== "all") params.marketplaces = [marketplace];

//             const response = await api.get("/omnisight_v2/dashboard/dashboardKPIMetrics/", { params });
//             return response.data.data as DashboardData;
//         },
//         keepPreviousData: true,
//     });


//     // ----------------------
//     // Prepare charts
//     // ----------------------
//     const orderCategories = data?.order_graph_data.map((item) => item.date) || [];
//     const orderSeries = [
//         { name: "Total Orders", data: data?.order_graph_data.map((item) => item.total_orders) || [] },
//         { name: "Amazon", data: data?.order_graph_data.map((item) => item.amazon) || [] },
//         { name: "Noon", data: data?.order_graph_data.map((item) => item.noon) || [] },
//     ];

//     const revenueMetrics = data?.revenue_metrics;

//     // Top 10 items by revenue
//     const topItems = revenueMetrics
//         ? Object.entries(revenueMetrics.revenue_per_item)
//             .sort(([, a], [, b]) => b - a)
//             .slice(0, 10)
//             .map(([sku, revenue]) => ({ sku, revenue }))
//         : [];

//     return (
//         <div className="h-screen w-full flex flex-col p-6 bg-gray-50">
//             {/* ----------------------
//           Filters
//       ---------------------- */}
//             <div className="sticky top-0 z-10 py-2 mb-4 bg-gray-50">
//                 <div className="flex flex-col md:flex-row items-center gap-4">
//                     {/* Start Date */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                         <input
//                             type="date"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                     </div>

//                     {/* End Date */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">End Date</label>
//                         <input
//                             type="date"
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                     </div>

//                     {/* Marketplace */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Marketplace</label>
//                         <select
//                             value={marketplace}
//                             onChange={(e) => setMarketplace(e.target.value as "all" | "amazon" | "noon")}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         >
//                             <option value="all">All</option>
//                             <option value="noon">Noon</option>
//                             <option value="amazon">Amazon</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {/* ----------------------
//           Loading / Error
//       ---------------------- */}
//             {isLoading ? (
//                 <div className="flex justify-center items-center h-full">Loading...</div>
//             ) : isError || !data ? (
//                 <div className="text-red-500 text-center">Failed to load dashboard data</div>
//             ) : (
//                 <div className="flex-1 overflow-y-auto space-y-6">
//                     {/* ----------------------
//               Top KPIs
//           ---------------------- */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
//                             <p className="text-gray-500 text-sm">Total Revenue</p>
//                             <p className="text-2xl font-bold text-gray-800">AED {revenueMetrics.total_revenue.toFixed(2)}</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
//                             <p className="text-gray-500 text-sm">Average Order Value</p>
//                             <p className="text-2xl font-bold text-gray-800">AED {revenueMetrics.average_order_value.toFixed(2)}</p>
//                         </div>


//                     </div>

//                     {/* ----------------------
//               Orders Graph
//           ---------------------- */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <AppChart
//                             title="Orders"
//                             subtitle="Order performance over time"
//                             type="area"
//                             height={320}
//                             categories={orderCategories}
//                             series={orderSeries}
//                             colors={["#F59E0B", "#4F46E5", "#22C55E",]}
//                         />

//                         <div className="bg-white p-4 rounded-xl shadow">
//                             <p className="text-gray-500 text-sm">Marketplace Revenue</p>
//                             <div className=" mx-auto  h-full">
//                                 <AppChart
//                                     type="donut"
//                                     series={[
//                                         revenueMetrics?.revenue_per_marketplace?.amazon ?? 0,
//                                         revenueMetrics?.revenue_per_marketplace?.noon ?? 0,
//                                     ]}
//                                     categories={["Amazon", "Noon"]}
//                                     colors={["#4F46E5", "#22C55E"]}
//                                     showLegend={true}
//                                     height={320}
//                                     extraOptions={{ labels: ["Amazon", "Noon"] }} // Pass labels here
//                                 />

//                             </div>

//                         </div>


//                     </div>

//                     {/* ----------------------
//               Top 10 Items Revenue
//           ---------------------- */}
//                     <AppChart
//                         title="Top 10 Items by Revenue"
//                         type="bar"
//                         height={350}
//                         categories={topItems.map((item) => item.sku)}
//                         series={[{ name: "Revenue", data: topItems.map((item) => item.revenue) }]}
//                         colors={["#F59E0B"]}
//                         tickAmountValue={1}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

const DashboardPage = () => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [marketplace, setMarketplace] = useState<"all" | "amazon" | "noon">("all");

    const { data, isLoading, isError } = useQuery<DashboardData>({
        queryKey: ["dashboard-kpi-metrics", startDate, endDate, marketplace],
        queryFn: async () => {
            const params: Record<string, any> = {};
            if (startDate) params.start_date = startDate;
            if (endDate) params.end_date = endDate;
            if (marketplace !== "all") params.marketplaces = [marketplace];
            const response = await api.get("/omnisight_v2/dashboard/dashboardKPIMetrics/", { params });
            return response.data.data as DashboardData;
        },
        keepPreviousData: true,
    });

    const orderCategories = data?.order_graph_data.map((item) => item.date) || [];
    const orderSeries = [
        { name: "Total Orders", data: data?.order_graph_data.map((item) => item.total_orders) || [] },
        { name: "Amazon", data: data?.order_graph_data.map((item) => item.amazon) || [] },
        { name: "Noon", data: data?.order_graph_data.map((item) => item.noon) || [] },
    ];
    const revenueMetrics = data?.revenue_metrics;
    const topItems = revenueMetrics
        ? Object.entries(revenueMetrics.revenue_per_item)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([sku, revenue]) => ({ sku, revenue }))
        : [];

    return (
        <div className="max-h-screen w-full flex flex-col  bg-gray-50 overflow-x-auto p-3 md:p-6">
            {/* Filters */}
            <div className="sticky top-0 z-10 py-2 mb-4 mt-0 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Marketplace</label>
                        <select
                            value={marketplace}
                            onChange={(e) => setMarketplace(e.target.value as "all" | "amazon" | "noon")}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500
                            ${marketplace === "all" ? "text-gray-400" : "text-gray-900"}`}
                        >
                            <option value="all" className="text-gray-900">All</option>
                            <option value="noon" className="text-gray-900">Noon</option>
                            <option value="amazon" className="text-gray-900">Amazon</option>
                        </select>

                    </div>
                </div>
            </div>

            {/* Loading / Error */}
            {isLoading ? (
                <div className="flex justify-center items-center h-full">Loading...</div>
            ) : isError || !data ? (
                <div className="text-red-500 text-center">Failed to load dashboard data</div>
            ) : (
                <div className="flex-1 flex flex-col gap-6">
                    {/* Top KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
                            <p className="text-gray-500 text-sm">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-800">AED {revenueMetrics.total_revenue.toFixed(2)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
                            <p className="text-gray-500 text-sm">Average Order Value</p>
                            <p className="text-2xl font-bold text-gray-800">AED {revenueMetrics.average_order_value.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Orders & Revenue Graphs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            <AppChart
                            title="Orders"
                            subtitle="Order performance over time"
                            type="area"
                            height={320}
                            categories={orderCategories}
                            series={orderSeries}
                            colors={["#F59E0B", "#4F46E5", "#22C55E"]}
                        
                        />


                        
                        <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
                            <p className="text-gray-500 text-sm mb-2">Marketplace Revenue</p>
                            <AppChart
                                type="donut"
                                series={[revenueMetrics?.revenue_per_marketplace?.amazon ?? 0, revenueMetrics?.revenue_per_marketplace?.noon ?? 0]}
                                categories={["Amazon", "Noon"]}
                                colors={["#4F46E5", "#22C55E"]}
                                showLegend={true}
                                height={320}
                                extraOptions={{ labels: ["Amazon", "Noon"] }}
                            />
                        </div>
                    </div>

                    {/* Top 10 Items */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <AppChart
                            title="Top 10 Items by Revenue"
                            type="bar"
                            height={350}
                            categories={topItems.map((item) => item.sku)}
                            series={[{ name: "Revenue", data: topItems.map((item) => item.revenue) }]}
                            colors={["#F59E0B"]}
                            tickAmountValue={1}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};


export default DashboardPage;
