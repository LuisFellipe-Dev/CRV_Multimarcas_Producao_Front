import type { CustomerFilters } from "../interfaces/Customers"

const endPoint = `${import.meta.env.VITE_API_BASE_URL}/Customers`

export const CustomersService = {
    async get(filters: CustomerFilters = {}){
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
            console.error('Erro ao buscar dados do servidor:', error)
            return []
        }
    },
    async post(Item = {}){
        try {
            const response = await fetch(endPoint,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Item)
            })

            if(!response.ok)
                throw new Error('Erro ao inserir cliente ao sistema')
            return await response.json()
        } catch (error) {
            console.error('Erro ao inserir cliente ao servidor:', error)
        }
    },
    async put(id: string, data: object){
        try {
            const response = await fetch(`${endPoint}/${id}`,{
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if(!response.ok)
                throw new Error('Erro ao editar o cliente do servidor')
            return await response.json()
        } catch (error) {
            console.error('Erro ao editar o cliente do servidor', error)
        }
    },
    async disable(id: string){
        try {
            const response = await fetch(`${endPoint}/${id}`,{
                method: 'DELETE',
            })

            if(!response.ok)
                throw new Error('Erro ao deletar cliente do servidor')
            return await response.json()
        } catch (error) {
            console.error('Erro ao deletar cliente do servidor: ', error)
        }
    }
}