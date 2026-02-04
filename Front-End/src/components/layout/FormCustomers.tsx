import { useEffect } from "react"
import type { Search } from "../../interfaces/Customers"

import styles from './FormCustomers.module.css'


function FormCustomers({formSearch, setFormSearch, handleSearch, mode, edit, loadCustomers, customers}: Search){

    useEffect(() => {
        loadCustomers()
    },[mode])

    return(
        <form onSubmit={handleSearch}>
            <div className={styles.Inputs}>
                <div>
                    <label>Nome:</label>
                    <input type="search" name='Name' id="Name" required={!mode} 
                        placeholder="Nome" value={formSearch.Name} 
                        onChange={(e) => setFormSearch(prev => ({
                            ...prev,
                            Name: e.target.value
                        }))}
                    />
                </div>
                <div>
                    <label>Contato:</label>
                    <input type="search" name='Contact' id="Contact" required={!mode} 
                        placeholder="Contato" value={formSearch.Contact} 
                        onChange={(e) => setFormSearch(prev => ({
                            ...prev,
                            Contact: e.target.value
                        }))}
                    />
                </div>
                <div>
                    <label>Débito:</label>
                    <input disabled={mode} type="number" name='Debt' id="Debt" 
                        placeholder="Débito" value={formSearch.Debt} 
                        onChange={(e) => setFormSearch(prev => ({
                            ...prev,
                            Debt: e.target.value === '' ? '' : Number(e.target.value)
                        }))}
                    />
                </div>
            </div>
            <div className={styles.Button}>
                <div>
                    <span>Clientes Encontrados: {customers.length - 1}</span>
                </div>
                <div>
                    <button type="button" 
                        onClick={() => 
                            setFormSearch(()=>({
                            Name: '',
                            Contact: '',
                            Debt: ''
                        }))}
                    >Limpar</button>
                    <button type="submit">{edit ? 'Editar' : mode ? 'Pesquisar' : 'Adicionar'}</button>
                </div>
            </div>
        </form>
    )
}

export default FormCustomers