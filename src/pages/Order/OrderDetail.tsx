//@ts-nocheck
import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../api/axios";

// ---------------------------
// Field Types
// ---------------------------
export type FieldConfig = {
    name: string; // supports nested fields e.g. "items[0].sku"
    label: string;
    type?: "text" | "number" | "email" | "textarea" | "select" | "checkbox" | "date";
    options?: { label: string; value: any }[];
    placeholder?: string;
};

// ---------------------------
// Main Form Fields
// ---------------------------
const orderFields: FieldConfig[] = [
    { name: "purchase_order_id", label: "Purchase Order ID", type: "text" },
    { name: "status", label: "Status", type: "text" },
    { name: "order_total", label: "Order Total", type: "number" },
    { name: "currency", label: "Currency", type: "text" },
    { name: "customer_name", label: "Customer Name", type: "text" },
    { name: "geo", label: "Geo", type: "text" },
    { name: "shipping_cost", label: "Shipping Cost", type: "number" },
    { name: "order_date", label: "Order Date", type: "date" },
];

// ---------------------------
// Order Detail Page
// ---------------------------
const OrderDetailPage = ({ endpoint = `/omnisight_v2/order/orderDetail` }) => {
    const { order_id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, control, formState: { isSubmitting } } = useForm({
        defaultValues: {
            items: [{ item_id: "", sku: "", name: "", quantity: 1, total_price: 0 }],
        },
    });

    // --------------------------- Dynamic Nested Items
    const { fields: itemsFields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    // --------------------------- Fetch Order
    const { data, isLoading } = useQuery({
        queryKey: [endpoint, order_id],
        queryFn: async () => {
            const res = await api.get(`${endpoint}/${order_id}/`);
            return res.data.data;
        },
        enabled: !!order_id,
    });

    // --------------------------- Pre-populate Form
    useEffect(() => {
        if (data && typeof data === "object") {
            reset({
                ...data,
                order_date: data.order_date ? data.order_date.split("T")[0] : "",
            });
        }
    }, [data, reset]);

    // --------------------------- Update Mutation
    const mutation = useMutation({
        mutationFn: async (formData: any) => {
            const res = await api.put(`${endpoint}/${order_id}/`, formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [endpoint] });
            toast.success("Order updated successfully!");
            navigate(-1);
        },
        onError: () => toast.error("Failed to update order!"),
    });

    const onSubmit = (formData: any) => mutation.mutate(formData);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="w-full p-8 rounded-lg shadow-md overflow-y-auto h-screen bg-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold text-gray-600 sticky">Order Detail</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                    Back
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* ---------------- Regular Fields (2 columns per row) ---------------- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orderFields.map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                            {field.type === "select" && field.options ? (
                                <Controller
                                    name={field.name}
                                    control={control}
                                    render={({ field: controllerField }) => (
                                        <select
                                            {...controllerField}
                                            className="w-full border p-2 rounded text-gray-700"
                                        >
                                            <option value="">Select</option>
                                            {field.options.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            ) : field.type === "textarea" ? (
                                <textarea
                                    {...register(field.name)}
                                    placeholder={field.placeholder}
                                    className="w-full border p-2 rounded text-gray-700"
                                />
                            ) : field.type === "checkbox" ? (
                                <input type="checkbox" {...register(field.name)} className="h-5 w-5" />
                            ) : (
                                <input
                                    type={field.type || "text"}
                                    {...register(field.name)}
                                    placeholder={field.placeholder}
                                    className="w-full border p-2 rounded text-gray-700"
                                    disabled
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* ---------------- Dynamic Items ---------------- */}
                <div>
                    <h3 className="text-md font-medium text-gray-800 mb-4">Items</h3>
                    {itemsFields.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-4 gap-4 items-end mb-3">
                            <div>
                                <label className="block text-sm font-medium">SKU</label>
                                <input
                                    type="text"
                                    {...register(`items.${index}.sku` as const)}
                                    className="w-full border p-2 rounded"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    {...register(`items.${index}.name` as const)}
                                    className="w-full border p-2 rounded"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Quantity</label>
                                <input
                                    type="number"
                                    {...register(`items.${index}.quantity` as const)}
                                    className="w-full border p-2 rounded"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Total Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register(`items.${index}.total_price` as const)}
                                    className="w-full border p-2 rounded"
                                    disabled
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ---------------- Submit ---------------- */}
                {/* <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    {isSubmitting ? "Updating..." : "Update Order"}
                </button> */}
            </form>
        </div>
    );
};

export default OrderDetailPage;
