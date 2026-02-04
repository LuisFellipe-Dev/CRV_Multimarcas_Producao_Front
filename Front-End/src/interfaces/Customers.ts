import type { Dispatch, SetStateAction } from "react"

export interface Customer{
    id: string
    Name: string
    Contact: string
    Debt: number | string
}

export interface CustomerFilters{
    Name?: string
    Contact?: string
    Debt?: number | string
}

export interface Search{
    formSearch: CustomerFilters
    setFormSearch: Dispatch<SetStateAction<CustomerFilters>>
    handleSearch: (e: React.FormEvent) => void
    mode: boolean
    edit: boolean
    loadCustomers: () => Promise<void>
    customers: Array<Customer>
}