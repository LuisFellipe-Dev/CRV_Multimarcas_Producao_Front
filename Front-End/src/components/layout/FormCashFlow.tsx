import { useState, useEffect, useMemo } from "react"
import Select from "react-select"
import type { FormCashflow, Search } from "../../interfaces/Cashflow"
import type { Customer } from "../../interfaces/Customers"
import { CashflowService } from "../../services/CashflowService"
import { CustomersService } from "../../services/CustomerService"
import { AccountService } from "../../services/AccountService"

import styles from './FormCashFlow.module.css'

function FormCashFlow({setCashFlows, setAccounts}: Search){
    const date = new Date().toLocaleDateString('en-CA')
    const [mode, setMode] = useState(true)
    const [operation, setOperation] = useState<FormCashflow>({
        Description: '',
        Value: '',
        Operation: 'Entrada',
        Type: 'Conta',
        Date: date
    })
    const [customers, setCustomers] = useState<Customer[]>([])
    const customersOps = useMemo(
        () =>
            customers.map(customer => ({
                value: customer.id,
                label: customer.Name
            })),
        [customers]
    )
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if(mode){
            post()
        }else{
            getFiltered()
        }
    }

    async function get() {
        setCashFlows(await CashflowService.get())
    }

    async function getCustomers() {
        setCustomers(await CustomersService.get())
    }

    async function getAccounts() {
        setAccounts(await AccountService.get())
    }

    async function getFiltered() {
        setCashFlows(await CashflowService.get(operation))
    }

    async function post() {
        await CashflowService.post(operation)
        setCashFlows(await CashflowService.get())
        getAccounts()
    }

    useEffect(()=>{
        get()
        getAccounts()
        getCustomers()
    }, [])

    return(
        <form onSubmit={handleSearch} className={styles.Form}>
            <div className={styles.Mode}>
                <div onClick={()=>{
                    setMode(true)
                    setOperation(()=>({
                        Description: '',
                        Value: '',
                        Operation: 'Entrada',
                        Type: 'Conta',
                        Date: date
                    }))
                }}>Adicionar</div>
                <div onClick={()=>{
                    setMode(false)
                    setOperation(()=>({
                        Description: '',
                        Value: '',
                        Operation: 'Entrada',
                        Type: 'Conta',
                        Date: date
                    }))
                }}>Pesquisar</div>
            </div>
            <div>
                <div className={styles.Div}>
                    <div className={styles.Camp}>
                        <div>
                            <label>Descrição:</label>
                        </div>
                        {mode ? (
                            <Select onChange={(e) => 
                                setOperation(prev =>({
                                    ...prev,
                                    Description: e ? e.label : ''
                                }))} 
                                name="Description"
                                id="Description" 
                                value={{label: operation.Description}}
                                options={customersOps}
                                className={styles.customSelect}
                                classNamePrefix="react-select"
                            />
                        ):(
                            <input className={styles.Input} type="text" 
                                onChange={(e) =>
                                    setOperation(prev => ({
                                        ...prev,
                                        Description: e ? e.target.value : ''
                                }))}
                                name="Description"
                                id="Description" 
                            />
                        )}
                    </div>
                    <div className={styles.Camp}>
                        <div>
                            <label>Valor:</label>
                        </div>
                        <input type="number" onChange={(e) =>
                            setOperation(prev => ({
                                ...prev,
                                Value: e ? e.target.value : ''
                            }))}
                            name="Value"
                            id="Value"
                            value={operation.Value}
                            required={mode}
                        />
                    </div>
                    <div className={styles.Camp}>  
                        <div>
                            <label>Data:</label>
                        </div>
                        <input type="date"  max={date}
                            value={operation.Date?.toString()} 
                            onChange={(e) =>
                                setOperation(prev => ({
                                    ...prev,
                                    Date: e ? e.target.value : date
                                }))
                            }
                            name="Date"
                            id="Date"
                        />
                    </div>
                </div>
                <div className={styles.Div}>
                    <div className={styles.Camp}>
                        <div>
                            <label>Operação:</label>
                        </div>
                        <select
                            value={operation.Operation}
                            required={mode}
                            onChange={(e)=>{
                                setOperation(prev => ({
                                    ...prev,
                                    Operation: e ? e.target.value : 'Entrada'
                                }))
                            }}
                            name="Operation"
                            id="Operation"    
                        >
                            <option value="Entrada">Entrada</option>
                            <option value="Saída">Saída</option>
                        </select>
                    </div>
                    <div className={styles.Camp}>
                        <div>
                            <label>Tipo:</label>
                        </div>
                        <select
                            value={operation.Type}
                            required={mode}
                            onChange={(e)=>{
                                setOperation(prev => ({
                                    ...prev,
                                    Type: e ? e.target.value : 'Conta'
                                }))
                            }}
                            name="Type"
                            id="Type"
                        >
                            <option value="Conta">Conta</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>
                    </div>
                    <div className={styles.Button}>
                        <button type="reset" onClick={() => {
                            setOperation(()=>({
                                Description: '',
                                Value: '',
                                Operation: '',
                                Type: '',
                                Date: ''
                            }))}}
                        >Limpar</button>
                        <button type="submit">{mode ? 'Confirmar' : 'Pesquisar'}</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormCashFlow