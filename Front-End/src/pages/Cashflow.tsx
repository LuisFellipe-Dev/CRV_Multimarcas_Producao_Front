import { useEffect, useState} from "react"
import type { CashFlow } from "../interfaces/Cashflow"
import { CashflowService } from "../services/CashflowService"
import { AccountService } from "../services/AccountService"
import type { Account } from "../interfaces/Account"
import { useVerify } from "../hooks/useVerify"

import Form from '../components/layout/FormCashFlow'
import NavBar from "../components/layout/NavBar/NavBar"

import styles from './Cashflow.module.css'

function Cashflow(){
    const {handleVerify} = useVerify()
    const [cashFlows, setCashFlows] = useState<CashFlow[]>([])
    const [accounts, setAccounts] = useState<Account[]>([])

    async function deleteCashFlow(id: string) {
        const confirm = window.confirm('Tem certeza que deseja deletar essa Operação? Se houverem dados presentes nas Vendas, também serão deletados')
        if(confirm){
            await CashflowService.delete(id)
            setCashFlows(await CashflowService.get())
            setAccounts(await AccountService.get())
        }
    }

    useEffect(()=>{
        handleVerify()
    },[])

    return(
        <div>
            <NavBar/>
            <div>
                <Form {...{setCashFlows, setAccounts}}/>
            </div>
            <div>
                <div className={styles.List}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mês/Ano</th>
                                <th>Conta</th>
                                <th>Dinheiro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.slice(-6).map((account)=>(
                                <tr key={account.id}>
                                    <td>{account.Month}/{account.Year}</td>
                                    <td>R${account.Bank}</td>
                                    <td>R${account.Cash}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div className={styles.List}>
                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Operação</th>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cashFlows?.slice(-10).map((cashFlow)=>(
                                <tr key={cashFlow.id}>
                                    <td>{cashFlow.Description}</td>
                                    <td>R${cashFlow.Value}</td>
                                    <td style={{color: cashFlow.Operation === 'Entrada' ? 'blue' : 'red'}}>
                                        {cashFlow.Operation}
                                    </td>
                                    <td>{cashFlow.Type}</td>
                                    <td>{new Date(cashFlow.Date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                    <td>
                                        <img className={styles.Icons} 
                                            src='/img/DELETE.png' onClick={() => deleteCashFlow(cashFlow.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cashflow