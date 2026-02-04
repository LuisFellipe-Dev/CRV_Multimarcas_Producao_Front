import type { Dispatch, SetStateAction } from "react"
import type { Customer } from "./Customers"
import type { Item } from "./Items"

export interface Sale{
    id: string
    Customer: Customer
    CustomerId: string
    Item: Item
    ItemId: string
    Value: number | string
    Type: string
    Date: string
}
export interface FormSale{
    CustomerId?: string
    ItemId?: string
    Value?: number | string
    Type?: string
    Date?: Date | string
}
export interface Search{
    sales: Sale[]
    setSales: Dispatch<SetStateAction<Sale[]>>
}