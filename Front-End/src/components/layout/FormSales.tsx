import { useEffect, useMemo, useState } from "react"
import Select from "react-select"

import type { FormSale, Search} from "../../interfaces/Sales"
import type { Customer } from "../../interfaces/Customers"
import type { Item } from "../../interfaces/Items"
import { CustomersService } from "../../services/CustomerService"
import { ItemService } from "../../services/ItemService"
import { SaleService } from "../../services/SaleService"

import styles from "./FormSales.module.css"

function FormSales({sales, setSales}: Search){
    const date = new Date().toLocaleDateString('en-CA')
    const [mode, setMode] = useState(true)
    const [sale, setSale] = useState<FormSale>({
        CustomerId: '',
        ItemId: '',
        Value: '',
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
    const [items, setItems] = useState<Item[]>([])
    const itemsOps = useMemo(
        () => 
            items.map(item => ({
                value: item.id,
                label: `${item.Brand} - ${item.Model}(${item.Size}): ${item.Description}`
            })),
        [items]
    )

    async function get() {
        setCustomers(await CustomersService.get())
        setItems(await ItemService.get())
    }

    async function getFiltered() {
        setSales(await SaleService.get(sale))
    }

    async function createSale() {
        await SaleService.post(sale)
        setSales(await SaleService.get())
    }

    const handleSale = async (e: React.FormEvent) => {
        e.preventDefault()
        if(mode){
            if (sale.ItemId === '') {
                return alert('Selecione um Item')
            }else{
                await createSale()
            }
        }else{
           await getFiltered()
        }
    }

    useEffect(() => {
        get()
    }, [sales])

    return(
        <form onSubmit={handleSale} className={styles.Form}>
            <div className={styles.Mode}>
                <div onClick={()=>{
                    setMode(true)
                    setSale(()=>({
                        CustomerId: '',
                        ItemId: '',
                        Value: '',
                        Type: 'Conta',
                        Date: date
                    }))
                    
                }}>Adicionar</div>
                <div onClick={()=>{
                    setMode(false)
                    setSale(()=>({
                        CustomerId: '',
                        ItemId: '',
                        Value: '',
                        Type: 'Conta',
                        Date: date
                    }))
                }}>Pesquisar</div>
            </div>
            <div className={styles.Div}>
                <div>
                    <label>Cliente:</label>
                </div>
                <Select onChange={(e) => 
                    setSale(prev =>({
                        ...prev,
                        CustomerId: e ? e.value : undefined
                    }))} 
                    name="CustomerId"
                    id="CustomerId"
                    value={customersOps.find(customersOp => customersOp.value === sale.CustomerId)}
                    options={customersOps}
                />
            </div>
            <div className={styles.Div}>
                <div>
                    <label>Item:</label>
                </div>
                {mode ? (
                    <Select onChange={(e) =>
                        setSale(prev => ({
                            ...prev,
                            ItemId: e ? e.value : undefined
                        }))}
                        name="ItemId"
                        id="ItemId"
                        value={itemsOps.find(itemsOp => itemsOp.value === sale.ItemId)}
                        options={itemsOps}
                    />
                ):(
                    <input className={styles.Input} type="text" 
                        onChange={(e) =>
                            setSale(prev => ({
                                ...prev,
                                ItemId: e ? itemsOps.find(itemsOp => itemsOp.value === e.target.value)?.value : ''
                        }))}
                        value={itemsOps.find(itemsOp => itemsOp.value === sale.ItemId)?.label}
                        name="ItemId"
                        id="ItemId"
                    />
                )}
            </div>
            <div className={styles.Inputs}>
                {mode ? (
                    <div>  
                        <div>
                            <label>Valor:</label>
                        </div>
                        <input type="number" 
                            value={sale.Value} 
                            onChange={(e) =>
                                setSale(prev => ({
                                    ...prev,
                                    Value: e ? e.target.value : ''
                                }))
                            }
                            name="Value"
                            id="Value"
                            required
                        />
                    </div>
                 ):(
                    <div>  
                        <div>
                            <label>Data:</label>
                        </div>
                        <input type="date"  max={date}
                            value={sale.Date?.toString()} 
                            onChange={(e) =>
                                setSale(prev => ({
                                    ...prev,
                                    Date: e ? e.target.value : date
                                }))
                            }
                            name="Date"
                            id="Date"
                        />
                    </div>
                 )}
                <div>
                    <div>
                        <label>Forma de Pagamento:</label>
                    </div>
                    <select 
                        name="Type"
                        id="Type"
                        value={sale.Type} 
                        required={mode}
                        onChange={(e)=>{
                            setSale(prev => ({
                                ...prev,
                                Type: e ? e.target.value : 'Conta'
                            }))
                        }}
                    >
                        {mode ? '' : (<option value="">Qualquer</option>)}
                        <option value="Conta">Conta</option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Fiado">Fiado</option>
                    </select>
                </div>
                <div>
                    <button type="reset" onClick={() => {
                        setSale(()=>({
                            Value: '',
                            Type: 'Conta',
                            Date: ''
                        }))}}
                    >Limpar</button>
                    <button type="submit">{mode ? 'Confirmar' : 'Pesquisar'}</button>
                </div>
            </div>
        </form>
    )
}

export default FormSales