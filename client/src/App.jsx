
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import Receipt from './pages/Receipt'
import Report from './pages/Report'
import UpdateListing from './pages/UpdateListing'
import Search from './pages/Search'
import ReportItems from './components/ReportItems'


export default function App() {
  

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/about' element={<About />} />
                <Route path='/search' element={<Search />} />
                
                <Route element={<PrivateRoute />}>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/create-listing' element={<CreateListing />} />
                    <Route path='/receipt' element={<Receipt />} />
                    <Route path='/report' element={<Report />} />
                    <Route path='/update-listing/:reportId' element={<UpdateListing />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
  }
  
  
  