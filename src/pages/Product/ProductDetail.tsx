//@ts-nocheck
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

// ---------------------------
// Product Fields Config
// ---------------------------
const productFields = [
  { name: "asin", label: "ASIN", type: "text" },
  { name: "sku", label: "SKU", type: "text" },
  { name: "product_title", label: "Product Title", type: "text" },
  { name: "product_description", label: "Description", type: "textarea" },
  { name: "price", label: "Price", type: "number" },
  { name: "currency", label: "Currency", type: "text" },
  { name: "quantity", label: "Quantity", type: "number" },
  { name: "net_profit", label: "Net Profit", type: "number" },
  { name: "total_cogs", label: "Total COGS", type: "number" },
  { name: "new_product", label: "New Product", type: "text" },
  { name: "is_duplicate", label: "Is Duplicate", type: "text" },
  { name: "brand_name", label: "Brand", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "pack_size", label: "Pack Size", type: "number" },
  { name: "will_ship_internationally", label: "Ships Internationally", type: "text" },
  { name: "expedited_shipping", label: "Expedited Shipping", type: "text" },
  { name: "fullfillment_by_channel", label: "Fulfillment By Channel", type: "text" },
  { name: "channel_fee", label: "Channel Fee", type: "number" },
  { name: "image_url", label: "Image URL", type: "image" },
  { name: "product_created_date", label: "Created At", type: "date" },
  { name: "producted_last_updated_date", label: "Last Updated", type: "date" },
];

// ---------------------------
// Product Detail Page
// ---------------------------
const ProductDetailPage = ({ endpoint = "/omnisight_v2/product/productDetail" }) => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const { register, reset } = useForm({ defaultValues: {} });

  // --------------------------- Fetch Product
  const { data, isLoading } = useQuery({
    queryKey: [endpoint, product_id],
    queryFn: async () => {
      const res = await api.get(`${endpoint}/${product_id}/`);
      return res.data.data;
    },
    enabled: !!product_id,
  });

  // --------------------------- Populate Form
  useEffect(() => {
    if (data && typeof data === "object") {
      reset({
        ...data,
        product_created_date: data.product_created_date?.split("T")[0] || "",
        producted_last_updated_date: data.producted_last_updated_date?.split("T")[0] || "",
      });
    }
  }, [data, reset]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen px-8 rounded-lg shadow-md overflow-y-auto bg-white">
      {/* ---------------- Sticky Header ---------------- */}
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 px-4 py-2 border-b border-gray-200">
        <h2 className="text-4xl font-bold text-gray-600">Product Detail</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Back
        </button>
      </div>

      {/* ---------------- Product Form ---------------- */}
      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productFields.map((field) => {
            const value = data?.[field.name];

            return (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">{field.label}</label>

                {field.type === "textarea" ? (
                  <textarea
                    {...register(field.name)}
                    defaultValue={value || ""}
                    className="w-full border p-2 rounded text-gray-700"
                    disabled
                  />
                ) : field.type === "image" ? (
                  value ? (
                    <img src={value} alt={data.product_title} className="w-48 h-auto rounded" />
                  ) : (
                    <span className="text-gray-500">No image</span>
                  )
                ) : (
                  <input
                    type={field.type || "text"}
                    {...register(field.name)}
                    defaultValue={value || ""}
                    className="w-full border p-2 rounded text-gray-700"
                    disabled
                  />
                )}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default ProductDetailPage;
