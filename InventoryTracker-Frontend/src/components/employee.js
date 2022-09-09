import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [query, setQuery] = useState("");

    async function deletePerson(id) {
        let removeUser = [...employees].filter(user => user.userId !== id);
        await axios.delete(`/users/${id}`);
        setEmployees(removeUser);
    }

    useEffect(() => {
        async function getEmployees() {
            const response = await axios.get('/users');
            setEmployees(response.data);
        }
        getEmployees();
    }, []);

    return (
        <div className='container'>
            <h1>Employees</h1>
            <form>
                <label>Search by Last Name:</label>
                <input className='input' type="text" placeholder="Type to search" onChange={(e) => setQuery(e.target.value)} />
            </form>

            <Link to='/employee/add' className='align-self-center btn btn-outline-dark w-25'>Add Employee</Link>

            <table className='table mt-3'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.filter(person => {
                        if (query === "") {
                            return person;
                        } else {
                            return person.lastname.toLowerCase().includes(query.toLowerCase());
                        }
                    }).map((person) => (
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.firstname}</td>
                            <td>{person.lastname}</td>
                            <td>{person.username}</td>
                            <td>
                                <div className='d-flex justify-content-evenly'>
                                    <i className="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#updateModal"></i>
                                    <i className="bi bi-trash" onClick={(e) => deletePerson(person.id)}></i>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal to update User */}
            <div className='modal fade' id='updateModal' tabIndex="-1" aria-labelledby='updateModalLabel' aria-hidden="true">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id="updateModalLabel">Update User</h5>

                        </div>
                        <div className='modal-body'>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-fname" className="col-form-label">First Name:</label>
                                    <input type="text" className="form-control" id="recipient-fname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-lname" className="col-form-label">Last Name:</label>
                                    <input type="text" className="form-control" id="recipient-lname" />
                                </div>
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
