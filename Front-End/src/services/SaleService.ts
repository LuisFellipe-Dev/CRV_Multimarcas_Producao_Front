import type { FormSale } from "../interfaces/Sales"

const endPoint = `${import.meta.env.VITE_API_BASE_URL}/Sales`

export const SaleService = {
    async get(filters: FormSale = {}){
        try {
            const params = new URLSearchParams()

            Object.entries(filters).forEach(([key, value])=>{
                if(value !== undefined && value !== '')
                    params.append(key, value)
            })

            params.toString()

            const url = `${endPoint}${params ? '?' + params : ''}`
            const response = await fetch(url)

            if(!response.ok)
                throw new Error("Erro ao buscar dados no servidor")
            return await response.json()
        } catch (error) {
           console.error("Erro ao buscar dados no servidor") 
        }
    },
    async post(sale = {}){
        try {
            const response = await fetch(endPoint,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sale)
            })
            if(!response.ok)
                throw new Error("Erro ao inserir venda no servidor")
            return await response.json()
        } catch (error) {
            console.error("Erro ao inserir venda no servidor", error)
        }
    },
    async delete(id: string){
        try {
            const response = await fetch(`${endPoint}/${id}`,{
                method: 'DELETE'
            })
            if(!response.ok)
                throw new Error('Erro ao deletar venda')
            return await response.json()
        } catch (error) {
            console.error('Erro ao deletar venda: ', error)
        }
    }
}