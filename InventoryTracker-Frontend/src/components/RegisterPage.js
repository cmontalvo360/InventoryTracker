import React, { useState } from 'react'
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [err, setErr] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("/users",
                {
                    firstname: user.firstName,
                    lastname: user.lastName,
                    username: user.email,
                    password: user.password
                });
            console.log(res.data);
            console.log(res.accessToken);

        } catch (err) {
            if (err?.res) {
                setErr("No Server Response");
            } else if (err.res?.status === 409) {
                setErr("Username is already in use");
            } else {
                setErr("Registration failed");
            }
            //errRef.current.focus();
        }
    }

    return (
        <div className='auth-wrapper'>
            <section>
                <h1>Register</h1>
                <form className='register-form' onSubmit={handleSubmit} >
                    <label htmlFor='firstname'>First Name:</label>
                    <input type='text' name='firstname' id='firstname' onChange={(e) => setUser({ ...user, firstName: e.target.value })} />

                    <label htmlFor='lastname'>Last Name:</label>
                    <input type='text' name='lastname' id='lastname' onChange={(e) => setUser({ ...user, lastName: e.target.value })} />

                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' id='email' onChange={(e) => setUser({ ...user, email: e.target.value })} />

                    <label htmlFor='password'>Password:</label>
                    <input type='password' name='password' id='password' onChange={(e) => setUser({ ...user, password: e.target.value })} />

                    <button type='submit' >Sign Up</button>
                </form>
                <p>Already have an Account?</p>
                <Link to="/login">Sign In here</Link>

            </section>
        </div>
    )
}
