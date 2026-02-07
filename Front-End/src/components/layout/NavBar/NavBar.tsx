import styles from './NavBar.module.css'

import {Link} from 'react-router-dom'

function NavBar(){
    return(
        <header className={styles.NavBar}>
            <div>
                <a href='#'><img className={styles.Logo} src='/img/logo.png'/></a>
                <a href='#'><img className={styles.Nome} src='/img/nome.png'/></a>
            </div>
            <div>
                <nav>
                    <Link to="/Estoque">Estoque</Link>
                    <Link to="/Clientes">Clientes</Link>
                    <Link to="/Vendas">Vendas</Link>
                    <Link to="/Caixa">Caixa</Link>
                </nav>
            </div>
        </header>
    )
}

export default NavBar