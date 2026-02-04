const endPoint = `${import.meta.env.VITE_API_BASE_URL}/Account`

export const AccountService = {
    async get(){
        try {
            const response = await fetch(endPoint)
            if(!response.ok)
                throw new Error('Erro ao buscar dados do servidor')
            return await response.json()
        } catch (error) {
            console.error('Erro ao buscar dados do servidor:', error)
            return []
        }
    }
}