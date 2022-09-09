import './App.css';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import Employees from './components/employee';
import AddItem from './components/addItem';
import AddEmployee from './components/addEmployee';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Layout from './components/Layout';


export default function App() {

  return (
    <Routes>

      {/* public routes */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      <Route path='/' element={<Layout />} >

        {/* protected routes */}
        <Route element={<RequireAuth />} >
          <Route path='/' element={<Home />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/item/add' element={<AddItem />} />
          <Route path='/item/edit/:id' element={<AddItem />} />
          <Route path='/employee/add' element={<AddEmployee />} />
          <Route path='/delete' element={<addItem />} />
          <Route path='/item' element={<Home />} />
        </Route>

        {/* incorrect URL */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
