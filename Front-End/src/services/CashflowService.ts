import type { FormCashflow } from "../interfaces/Cashflow"

const endPoint = `${import.meta.env.VITE_API_BASE_URL}/CashFlow`

export const CashflowService = {
    async get(filters: FormCashflow = {}){
        try {
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
        } catch (error) {
            console.error('Erro ao buscar dados do servidor:', error)
            return []
        }
    },
    async post(CashFlow = {}){
        try {
            const response = await fetch(endPoint,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(CashFlow)
            })
            if(!response.ok)
                throw new Error('Erro ao inserir operação ao servidor')
            return await response.json()
        } catch (error) {
            console.error('Erro ao inserir operação ao servidor:', error)
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
                throw new Error('Erro ao editar operação')
            return await response.json()
        } catch (error) {
            console.error('Erro ao editar operação', error)
        }
    },
    async delete(id: string){
        try {
            const response = await fetch(`${endPoint}/${id}`,{
                method: 'DELETE'
            })
            if(!response.ok)
                throw new Error('Erro ao deletar operação')
            return await response.json()
        } catch (error) {
            console.error('Erro ao deletar operação: ', error)
        }
    }
}