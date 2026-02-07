import { useEffect, useState } from "react"
import type { Sale } from "../interfaces/Sales"
import { SaleService } from "../services/SaleService"
import { useVerify } from "../hooks/useVerify"

import NavBar from "../components/layout/NavBar/NavBar"
import Form from "../components/layout/FormSales"

import DELETE from '/img/DELETE.png'
import styles from "./Sales.module.css"

function Sales(){
    const {handleVerify} = useVerify()
    const [sales, setSales] = useState<Sale[]>([])

    async function get() {
        setSales(await SaleService.get())
    }

    async function deleteSale(id: string) {
        const confirm = window.confirm('Tem certeza que deseja deletar essa Venda? Os dados dessa Venda no Caixa também serão deletados')
        if(confirm){
            setSales(await SaleService.delete(id))
            get()
        }
    }

    useEffect(()=>{
        handleVerify()
        get()
    },[])

    return(
        <div>
            <NavBar/>
            <div>
                <Form {...{sales, setSales}}/>
            </div>
            <div className={styles.List}>
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Item</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales?.slice(-10).map((sale)=>(
                            <tr key={sale.id}>
                                <td>{sale.Customer.Name}</td>
                                <td>{`${sale.Item.Brand} - ${sale.Item.Model}(${sale.Item.Size}): ${sale.Item.Description}`}</td>
                                <td>R${sale.Value}</td>
                                <td>{sale.Type}</td>
                                <td>{new Date(sale.Date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                <td>
                                    <img className={styles.Icons} 
                                    src={DELETE} onClick={() => deleteSale(sale.id)}
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

export default Sales