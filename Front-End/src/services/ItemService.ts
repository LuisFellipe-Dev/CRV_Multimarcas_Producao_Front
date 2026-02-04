import type { ItemFilters } from "../interfaces/Items"

const endPoint = `${import.meta.env.VITE_API_BASE_URL}/Storage`

export const ItemService = {
    async get(filters: ItemFilters = {}){
        try{
            const params = new URLSearchParams()

            Object.entries(filters).forEach(([key, value]) => {
                if(value !== undefined && value !== '')
                    params.append(key, value)
            })

            params.toString()

            const url = `${endPoint}${params ? '?' + params : ''}`
            const response = await fetch(url)

            if(!response.ok)
                throw new Error('Erro ao buscar dados do servidor')
            return await response.json()

        }catch(error){
            console.error("Erro ao buscar dados do servidor:", error)
            return [];
        }
    },
    async post(Item = {}){
        try {
            const createItem = await fetch(endPoint,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Item)
            })
            if(!createItem.ok)
                throw new Error('Erro ao inserir item no servidor')
            return await createItem.json()
                
        } catch (error) {
            console.error("Erro ao inserir item no servidor", error)
        }
    },
    async delete(id: string){
        try {
            const deleteItem = await fetch(`${endPoint}/${id}`,{
                method: 'DELETE',
            })

            if(!deleteItem.ok)
                throw new Error('Erro ao deletar item do servidor')
            return await deleteItem.json()
        } catch (error) {
            console.error("Erro ao deletar item do servidor", error)
        }
    }
}