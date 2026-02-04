import { useNavigate } from "react-router-dom"
import { AuthService } from "../services/AuthService"

export const useVerify = () => {
    
    const navigate = useNavigate()
    const handleVerify = async() =>{
        const token = localStorage.getItem('token')
        if(!token){
        navigate('/Login')
        }else{
            const verify = await AuthService.get(token)
            if(verify.status === 403)
                navigate('/Login')
        }
    }
    return {handleVerify}
}