import type { AuthPromise } from "../interfaces/Auth"
import type { FormLogin } from "../interfaces/Login"

const endPoint = `${import.meta.env.VITE_API_BASE_URL}/AuthUser`

export const AuthService = {
    async get(token: string){
        try {
            const response = await fetch(endPoint,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            return await response.json()
        } catch (error) {
            throw error
        }
    },
    async post(User: FormLogin){
        try {
            const response = await fetch(endPoint,{
                method: 'Post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(User)
            })
            return await response.json() as Promise<AuthPromise>
        } catch (error) {
            throw error
        }
    }
    
}