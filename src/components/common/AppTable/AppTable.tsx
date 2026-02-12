import { useState } from "react"
import { useQuery } from "@tanstack/react-query"


import api from "../../../api/axios"

interface Column {
    header: string
    accessor: string
    render?: (row: any) => React.ReactNode
    valueColors?: Record<string, string>
}

interface FilterConfig {
    key: string
    label: string
    type: "select" | "date" | "daterange" | "text" | "number"
    options?: { label: string; value: string }[]
}

interface AppTableProps {
    title?: string
    endpoint: string
    queryKey: any[]
    columns: Column[]
    showSearch?: boolean
    filters?: FilterConfig[]
    showView?: boolean
    showDelete?: boolean
    pageSize?: number
}

export default function AppTable({
    title,
    endpoint,
    queryKey,
    columns,
    showSearch = true,
    filters = [],
    showView = false,
    showDelete = false,
    pageSize = 24,
}: AppTableProps) {

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [filterValues, setFilterValues] = useState<any>({})

    const fetchData = async () => {
        const { data } = await api.get(endpoint, {
            params: {
                page,
                pageSize,
                search,
                ...filterValues,
            },
        })
        return data
    }

    const { data, isLoading } = useQuery({
        queryKey: [...queryKey, page, search, filterValues],
        queryFn: fetchData,
    })

    const total = data?.data?.total || 0
    const totalPages = Math.ceil(total / pageSize)


    const handleFilterChange = (key: string, value: any) => {
        setFilterValues((prev: any) => ({ ...prev, [key]: value }))
        setPage(1)
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-full overflow-scroll overflow-y-auto">
            {/* Header */}
            {title && (
                <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">{title}</h2>
            )}

            {/* Search + Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
                {showSearch && (
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                    />
                )}

                {filters.map((filter) => {
                    if (filter.type === "select") {
                        return (
                            <select
                                key={filter.key}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                onChange={(e) =>
                                    handleFilterChange(filter.key, e.target.value)
                                }
                            >
                                <option value="">All {filter.label}</option>
                                {filter.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        )
                    }

                    if (filter.type === "date") {
                        return (
                            <input
                                key={filter.key}
                                type="date"
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                onChange={(e) =>
                                    handleFilterChange(filter.key, e.target.value)
                                }
                            />
                        )
                    }

                    return null
                })}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.accessor} className="px-4 py-3 font-medium">
                                    {col.header}
                                </th>
                            ))}
                            {(showView || showDelete) && (
                                <th className="px-4 py-3">Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="text-center py-6"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : !data?.data?.data || data?.data.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (showView || showDelete ? 1 : 0)}
                                    className="text-center py-6 text-gray-500"
                                >
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            data?.data?.data?.map((row: any, i: number) => (
                                <tr
                                    key={i}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >
                                    {columns.map((col) => {
                                        const value = row[col.accessor]

                                        return (
                                            <td key={col.accessor} className="px-4 py-3">
                                                {col.render
                                                    ? col.render(row)
                                                    : col.valueColors && col.valueColors[value] ? (
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${col.valueColors[value]}`}
                                                        >
                                                            {value}
                                                        </span>
                                                    ) : (
                                                        value
                                                    )}
                                            </td>
                                        )
                                    })}

                                    {(showView || showDelete) && (
                                        <td className="px-4 py-3 flex gap-2">
                                            {showView && (
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    View
                                                </button>
                                            )}
                                            {showDelete && (
                                                <button className="text-red-600 hover:text-red-800 text-sm">
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* Pagination */}
            <div className="flex justify-end items-center gap-3 mt-4">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Prev
                </button>

                <span className="text-sm text-gray-600">
                    Page {totalPages === 0 ? 0 : page} of {totalPages}
                </span>

                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page >= totalPages || totalPages === 0}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>

        </div>
    )
}
