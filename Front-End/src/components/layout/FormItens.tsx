import { useEffect } from 'react'
import type { Search } from '../../interfaces/Items'

import styles from './FormItens.module.css'

function FormItens({formSearch, setFormSearch, handleSearch, mode, loadItens, items}: Search){

    useEffect(()=>{
        loadItens()
    },[mode])

    return(
        <form onSubmit={handleSearch}>
            <div className={styles.Inputs}>
                <div>
                    <label>Marca:</label>
                    <select name='Brand' id='Brand' 
                        required={!mode} 
                        value={formSearch.Brand} 
                        onChange={(e) => setFormSearch(prev => ({
                            ...prev,
                            Brand: e.target.value
                        }))}
                    >
                        <option value="">Qualquer</option>
                        <option value="Crosby">Crosby</option>
                        <option value="Equipaggio">Equipaggio</option>
                    </select>
                </div>
                <div>
                    <label>Modelo:</label>
                    <input type="search" name='Model' id='Model' 
                        required={!mode} 
                        placeholder="Modelo" 
                        value={formSearch.Model} 
                        onChange={(e) => setFormSearch(prev => ({
                            ...prev,
                            Model: e.target.value
                        }))}
                    />
                </div>
                <div>
                    <label>Tamanho:</label>
                    <select name='Size' id='Size' required={!mode} 
                        value={formSearch.Size} 
                        onChange={(e) => setFormSearch(prev => ({
                            ...prev,
                            Size: e.target.value
                        }))}
                    >
                        <option value="">Qualquer</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                        <option value="XG">XG</option>
                        <option value="XL1">XL1</option>
                        <option value="XL2">XL2</option>
                    </select>
                </div>
                <div>
                    <label>Descrição:</label>
                    <input type="search" name='Description' id='Description' 
                        placeholder="Descrição" 
                        value={formSearch.Description} 
                        onChange={(e) => setFormSearch(prev => ({
                            ...prev,
                            Description: e.target.value
                        }))}
                    />
                </div>
            </div>
            <div className={styles.Button}>
                <div>
                    <span>Itens Encontrados: {items.length}</span>
                </div>
                <div>
                    <button type="button" onClick={() => 
                        setFormSearch(()=>({
                            Brand: "",
                            Model: "",
                            Size: "",
                            Description: ""
                        }))}
                    >Limpar</button>
                    <button type="submit">{mode ? 'Pesquisar' : 'Adicionar'}</button>
                </div>
            </div>
        </form>
    )
}

export default FormItens