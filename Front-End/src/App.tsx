import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Login from './pages/Login/Login'
import Storage from './pages/Storage'
import Customers from './pages/Customers'
import Sales from './pages/Sales'
import Cashflow from './pages/Cashflow'

import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/Login'/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Estoque' element={<Storage/>}/>
          <Route path='/Clientes' element={<Customers/>}/>
          <Route path='/Vendas' element={<Sales/>}/>
          <Route path='/Caixa' element={<Cashflow/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
