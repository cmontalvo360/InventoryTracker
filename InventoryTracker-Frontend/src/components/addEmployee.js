import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AddEmployee() {
    const [emp, setEmp] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateHired: ''

    });

    async function addEmp(e) {
        e.preventDefault();
        console.log(emp);
        await axios.post('http://localhost:5000/employees', {
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            dateHired: emp.dateHired
        });
    }

    return (
        <div>
            <form>
                <h1>Add Employee</h1>
                <label>First Name:</label>
                <input type="text" onChange={(e) => setEmp({ ...emp, firstName: e.target.value })} />

                <label>Last Name:</label>
                <input type="text" onChange={(e) => setEmp({ ...emp, lastName: e.target.value })} />

                <label>Email:</label>
                <input type="email" onChange={(e) => setEmp({ ...emp, email: e.target.value })} />
                <label>Date Hired:</label>
                <input type="date" onChange={(e) => setEmp({ ...emp, dateHired: e.target.value })} />

                <div className='d-flex justify-content-evenly mt-3'>
                    <button className='btn btn-outline-dark w-25' onClick={addEmp}>Add</button>
                    <Link to='/employees' className='btn btn-outline-dark w-25'>Back</Link>
                </div>
            </form>
        </div>
    )
}
