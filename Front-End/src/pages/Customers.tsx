import { useEffect, useState } from "react"
import type { Customer, CustomerFilters } from "../interfaces/Customers"
import { CustomersService } from "../services/CustomerService"
import { useVerify } from "../hooks/useVerify"

import Form from '../components/layout/FormCustomers'
import NavBar from "../components/layout/NavBar/NavBar"

import styles from './Costumers.module.css'

function Customers(){

    const {handleVerify} = useVerify()
    const [mode, setMode] = useState(true)
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('')
    const [customers, setCustomers] = useState<Customer[]>([])
    const [formSearch, setFormSearch] = useState<CustomerFilters>({
        Name: '',
        Contact: '',
        Debt: ''
    })

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if(mode){
            await filterCustomers()
        }else if(edit){
            await editCostumer(id)
        }else{
            const verify = customers.some(customer => {
                if(formSearch.Name === customer.Name)
                    return true
            })
            if(verify){
                alert('Cliente já cadastrado')
            }else{
                await createCustomer()
                await loadCustomers()
            }
        }
    }

    async function loadCustomers() {
        setCustomers(await CustomersService.get())
    }

    async function filterCustomers() {
        setCustomers(await CustomersService.get(formSearch))
    }

    async function createCustomer() {
        await CustomersService.post(formSearch)
    }

    async function editCostumer(id: string) {
        const confirm = window.confirm('Tem certeza que deseja editar esse Usuário? Todas as alterações não poderam ser revertidas')
        if(confirm){
            await CustomersService.put(id, formSearch)
            await loadCustomers()
            setFormSearch({Name: '', Contact: '', Debt: ''})
            setEdit(false)
            setId('')
        }
    }

    async function disableCustomers(id: string) {
        const confirm = window.confirm('Tem certeza que deseja deletar esse Usuário? Todas as informações ligadas a esse Usuário serão deletadas')
        if(confirm){
            await CustomersService.disable(id)
            await loadCustomers()
        }
    }

    useEffect(()=>{
        handleVerify()
        loadCustomers()
    },[])

    return(

        <div>
            <NavBar/>
            <div className={styles.Form}>
                <div className={styles.Mode}>
                    <div onClick={()=>{
                        setMode(false)
                        setFormSearch(()=>({
                            Name: '',
                            Contact: '',
                            Debt: ''
                        }))
                    }}>Adicionar</div>
                    <div onClick={()=>{
                        setMode(true)
                        setFormSearch(()=>({
                            Name: '',
                            Contact: '',
                            Debt: ''
                        }))
                    }}>Pesquisar</div>
                </div>
                <Form {...{formSearch, setFormSearch, handleSearch, mode, edit, loadCustomers, customers}}/> 
            </div>
            <div className={styles.List}>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Contato</th>
                            <th>Débito</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.filter(customer => customer.Name !== 'Não identificado').map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.Name}</td>
                                <td>{customer.Contact}</td>
                                <td>R${customer.Debt}</td>
                                <td>
                                    <img className={styles.Icons} 
                                    src="/img/EDIT.png" onClick={() => {
                                        setMode(false)
                                        setFormSearch({
                                            Name: customer.Name,
                                            Contact: customer.Contact,
                                            Debt: customer.Debt
                                        })
                                        setEdit(true)
                                        setId(customer.id)
                                    }}
                                    />
                                    <img className={styles.Icons} 
                                        src="/img/DELETE.png" onClick={() => disableCustomers(customer.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customers