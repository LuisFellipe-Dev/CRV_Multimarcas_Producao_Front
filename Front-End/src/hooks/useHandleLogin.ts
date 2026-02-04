import { useNavigate } from "react-router-dom"
import { AuthService } from "../services/AuthService"
import type { FormLogin } from "../interfaces/Login"

export const useHandleLogin = () => {

    const navigate = useNavigate()
    const handleLogin = async (e: React.FormEvent, login: FormLogin) => {
        e.preventDefault()
        const Auth = await AuthService.post(login)
        if(Auth.token){
            localStorage.setItem('token', Auth.token)
            navigate('/Estoque')
        }else{
            alert(`${Auth.message}`)
        }
    }
    
    return {handleLogin}
}