import { useState } from "react"
import type {FormLogin} from '../../interfaces/Login'
import { useHandleLogin } from "../../hooks/useHandleLogin"

import styles from './Login.module.css'

function Login(){
    const {handleLogin} = useHandleLogin()
    const [login, setLogin] = useState<FormLogin>({
        User: '',
        Password: ''
    })

    return(
        <div className={styles.Login}>
            <div>
                <h1>Login</h1>
            </div>
            <form onSubmit={(e) => handleLogin(e, login)}>
                <div className={styles.Input}>
                    <div>
                        <label>Usuário:</label>
                    </div>
                    <div>
                        <input type="text" name="User" id="User" placeholder="Usuário"
                            onChange={(e) => 
                                setLogin(prev => ({
                                    ...prev,
                                    User: e ? e.target.value : ''
                                }))
                            }
                        />
                    </div>
                </div>
                <div className={styles.Input}>
                    <div>
                        <label>Senha:</label>
                    </div>
                    <div>
                        <input type="password" name="Password" id="Password" placeholder="Senha"
                            onChange={(e) => 
                                setLogin(prev => ({
                                    ...prev,
                                    Password: e ? e.target.value : ''
                                }))
                            }
                        />
                    </div>
                </div>
                <div className={styles.Button}>
                    <div>
                        <button type="submit">Entrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login