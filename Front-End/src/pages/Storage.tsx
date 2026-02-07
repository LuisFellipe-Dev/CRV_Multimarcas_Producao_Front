import { useEffect, useState} from 'react'
import { ItemService } from '../services/ItemService'
import type { Item } from '../interfaces/Items'
import type { ItemFilters } from '../interfaces/Items'
import { useVerify } from '../hooks/useVerify'

import Form from '../components/layout/FormItens'
import NavBar from '../components/layout/NavBar/NavBar'

import DELETE from '/img/DELETE.png'
import styles from './Storage.module.css'

function Storage(){

    const {handleVerify} = useVerify()
    const [mode, setMode] = useState(true)
    const [items, setItems] = useState<Item[]>([])
    const [formSearch, setFormSearch] = useState<ItemFilters>({
        Brand: "",
        Model: "",
        Size: "",
        Description: ""
    })

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if(mode){
            filterItens()
        }else{
            await createItem()
            await loadItens()
        }
    }

    async function loadItens() {
        setItems(await ItemService.get())
    }

    async function filterItens() {
        setItems(await ItemService.get(formSearch))
    }

    async function createItem() {
        await ItemService.post(formSearch)
    }

    async function deleteItem(id: string) {
        const confirm = window.confirm('Tem certeza que deseja deletar esse Item?')
        if(confirm){
            await ItemService.delete(id)
            await filterItens()
        }
    }

    useEffect(() => { 
        handleVerify()
        loadItens()
    }, []);

    return(
        
        <div>
            <NavBar/>
            <div className={styles.Form}>
                <div className={styles.Mode}>
                    <div onClick={()=>{
                        setMode(false)
                        setFormSearch(()=>({
                            Brand: "",
                            Model: "",
                            Size: "",
                            Description: ""
                        }))
                    }}>Adicionar</div>
                    <div onClick={()=>{
                        setMode(true)
                        setFormSearch(()=>({
                            Brand: "",
                            Model: "",
                            Size: "",
                            Description: ""
                        }))
                    }}>Pesquisar</div>
                </div>
                <Form {...{formSearch, setFormSearch, handleSearch, mode, loadItens, items}}/> 
            </div>
            <div className={styles.List}>
                <table>
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Tamanho</th>
                            <th>Descrição</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.Brand}</td>
                                <td>{item.Model}</td>
                                <td>{item.Size}</td>
                                <td>{item.Description}</td>
                                <td>
                                    <img className={styles.Icons} 
                                    src={DELETE} onClick={() => {deleteItem(item.id)}}
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

export default Storage