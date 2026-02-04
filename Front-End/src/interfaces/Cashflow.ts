import type { Dispatch, SetStateAction } from "react"
import type { Account } from "./Account"

export interface CashFlow{
    id: string
    Description: string
    Value: number | string
    Operation: string
    Type: string
    Date: string
}
export interface FormCashflow{
    Description?: string
    Value?: number | string
    Operation?: string
    Type?: string
    Date?: string
}
export interface Search{
    setCashFlows: Dispatch<SetStateAction<CashFlow[]>>
    setAccounts: Dispatch<SetStateAction<Account[]>>
}