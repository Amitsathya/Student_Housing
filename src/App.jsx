import Navbar from './shared/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import ApplyNow from './pages/ApplyNow'
import FloorPlans from './pages/FloorPlans'
import Amenities from './pages/Amenities'
import { createContext, useState } from 'react'
import Payment from './pages/Payment.jsx'
import Maintenance from './pages/Maintenance.jsx'

export const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
})
// const setUserType = (newType) => {
//   UserContext.setValue({ ...UserContext.value, userType: newType })
// }
// export const UserContext = createContext({ userType: null, setUserType })
const App = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('userType')
  )
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Navbar />
        <section className="mainbody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register" element={<ApplyNow />} />
            <Route path="floorplans" element={<FloorPlans />} />
            <Route path="amenities" element={<Amenities />} />
            <Route path="payment" element={<Payment />} />
            <Route path="maintenance" element={<Maintenance />} />
          </Routes>
        </section>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}
export default App
