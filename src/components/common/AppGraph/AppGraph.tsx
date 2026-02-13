//@ts-nocheck
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type AppChartProps = {
    title?: string;
    subtitle?: string;
    categories?: string[];
    series?: any[];
    type?: "line" | "area" | "bar" | "donut";
    height?: number;
    colors?: string[];
    smooth?: boolean;
    showLegend?: boolean;
    tickAmountValue?: number
};


// const AppChart = ({
//     title,
//     subtitle,
//     categories = [],
//     series = [],
//     type = "line", // line | area | bar
//     height = 300,
//     colors = ["#6366F1", "#10B981", "#F59E0B"],
//     smooth = true,
//     showLegend = true,
// }: AppChartProps) => {
//     const options: ApexOptions = {
//         chart: {
//             type,
//             height,
//             toolbar: { show: false },
//             zoom: { enabled: false },
//             animations: {
//                 enabled: true,
//                 speed: 800,
//                 animateGradually: { enabled: true, delay: 150 },
//                 dynamicAnimation: { enabled: true, speed: 350 },
//             },
//             background: "transparent",
//         },
//         stroke: {
//             curve: smooth ? "smooth" : "straight",
//             width: 3,
//         },
//         colors,
//         xaxis: {
//             categories,
//             labels: {
//                 style: {
//                     colors: "#6B7280", // always this color
//                 },
//             },
//         },
//         yaxis: {
//             labels: {
//                 style: {
//                     colors: "#6B7280", // always this color
//                 },
//             },
//         },
//         grid: {
//             borderColor: "#E5E7EB", // always this color
//         },
//         legend: {
//             show: showLegend,
//             position: "top",
//             labels: {
//                 colors: "#111827", // always this color
//             },
//         },
//         dataLabels: { enabled: false },
//         tooltip: { theme: "light" }, // always light
//     };

//     return (
//         <div className="w-full bg-white rounded-xl p-4 shadow-sm">
//             {(title || subtitle) && (
//                 <div className="mb-4">
//                     {title && (
//                         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//                     )}
//                     {subtitle && (
//                         <p className="text-sm text-gray-500">{subtitle}</p>
//                     )}
//                 </div>
//             )}
//             <Chart options={options} series={series} type={type} height={height} />
//         </div>
//     );
// };


const AppChart = ({
    title,
    subtitle,
    categories = [],
    series = [],
    type = "line",
    height = 300,
    colors = ["#6366F1", "#10B981", "#F59E0B"],
    smooth = true,
    showLegend = true,
    tickAmountValue = 7
}: AppChartProps) => {

    const isDonut = type === "donut";

    const options: ApexOptions = {
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top"
            }
          }
        },
        chart: {
            type,
            height,
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: {
                enabled: true,
                speed: 800,
                animateGradually: { enabled: true, delay: 150 },
                dynamicAnimation: { enabled: true, speed: 350 },
            },
            background: "transparent",
        },

        stroke: {
            curve: smooth ? "smooth" : "straight",
            width: 3,
        },

        colors,

        legend: {
            show: showLegend,
            position: "top",
            labels: {
                colors: "#111827",
            },
        },
        // ###
        // dataLabels: {
        //     enabled: type === "bar", // show only for bar charts
        //     style: {
        //         colors: ["#111827"], // color of the label
        //         fontSize: "12px",
        //         fontWeight: "bold",
        //     },
        //     offsetY: -5, // move label a bit above the bar
        // },
        dataLabels: {
            enabled: type === "bar",
            style: {
                colors: ['#6B7280'], // gray color
                fontSize: '12px',
                fontWeight: 'bold',
            },
            background: { enabled: false },
            dropShadow: { enabled: false },
            formatter: function (val: number, opts: any) {
                // opts.seriesIndex and opts.dataPointIndex are available
                // Adjust offset dynamically if needed
                return val;
            },
            offsetY: -20, // large enough to float above even tiny bars
        },



        grid: { borderColor: "#E5E7EB" },

        tooltip: {
            theme: "light",
            ...(isDonut
                ? {}
                : {
                    x: {
                        formatter: function (value: string) {
                            return value; // show full SKU in tooltip
                        },
                    },
                }),
        },

        // ---------------------------
        // Donut Chart Configuration
        // ---------------------------
        ...(isDonut
            ? {
                labels: categories,
            }
            : {
                // ---------------------------
                // Line / Area / Bar Configuration
                // ---------------------------
                xaxis: {
                    categories,
                    tickAmount: Math.ceil(categories.length / tickAmountValue),
                    labels: {
                        style: { colors: "#6B7280" },
                        formatter: function (value: string) {
                            if (!value) return value;
                            return value.length > 15
                                ? value.substring(0, 15) + "..."
                                : value;
                        },
                    },
                },
                yaxis: {
                    labels: {
                        style: { colors: "#6B7280" },
                    },
                },
            }),
    };

    return (
        <div className="w-full bg-white rounded-xl p-4 shadow-sm">
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && (
                        <h3 className="text-lg font-semibold text-gray-800">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-sm text-gray-500">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            <Chart
                options={options}
                series={series}
                type={type}
                height={height}
            />
        </div>
    );
};

export default AppChart;

