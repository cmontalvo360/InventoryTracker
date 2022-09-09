import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ Logout }) {
    function handleClick() {
        Logout();
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <div className='container-fluid'>
                <Link to='/' className='navbar-brand'>Inventory Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse justify-content-end' id="navbarNav">
                    <ul className='navbar-nav'>
                        <li className='nav-item'><Link className='nav-link' to='/employees' >Employees</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/' >Inventory</Link></li>
                        <li className='nav-item'><Link className='nav-link' to='/' onClick={handleClick}>Log Out</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};