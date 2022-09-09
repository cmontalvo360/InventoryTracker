import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [demoEmail, setDemo] = useState("admin@yahoo.com");
    const [demoPass, setPass] = useState("password12!@");
    const [err, setErr] = useState("");
    const LOGIN_URL = '/authenticate';
    //const [jwt, setJwt] = useLocalState("", "jwt");

    useEffect(() => {
        setErr("");
    }, [email, password])

    async function handleSubmit(num, e) {
        e.preventDefault();

        if (num === 2) {
            console.log("demo");
            try {
                const res = await axios.post(LOGIN_URL,
                    JSON.stringify({ demoEmail, demoPass }),
                    {
                        auth: {
                            username: demoEmail,
                            password: demoPass
                        }
                    }
                )
                console.log(JSON.stringify(res?.data));
                const accessToken = res?.data?.accessToken;
                const roles = res?.data?.roles;
                setAuth({ demoEmail, demoPass, roles, accessToken })
                setEmail("");
                setPassword("");
                navigate(from, { replace: true });
            } catch (error) {
                if (!error?.res) {
                    setErr("No Server Response");
                }
                else if (error.res?.status === 400) {
                    setErr("Missing Username or Password");
                }
                else if (error.res?.status === 401) {
                    setErr("Unauthorized");
                }
                else {
                    setErr("Login Failed");
                }
            }
        } else {
            console.log("real");
            try {
                const res = await axios.post(LOGIN_URL,
                    JSON.stringify({ email, password }),
                    {
                        auth: {
                            username: email,
                            password: password
                        }
                    }
                )
                console.log(JSON.stringify(res?.data));
                const accessToken = res?.data?.accessToken;
                const roles = res?.data?.roles;
                setAuth({ email, password, roles, accessToken })
                setEmail("");
                setPassword("");
                navigate(from, { replace: true });
            } catch (error) {
                if (!error?.res) {
                    setErr("No Server Response");
                }
                else if (error.res?.status === 400) {
                    setErr("Missing Username or Password");
                }
                else if (error.res?.status === 401) {
                    setErr("Unauthorized");
                }
                else {
                    setErr("Login Failed");
                }
            }
        }
    }

    return (
        <div className='auth-wrapper'>

        <section>
            <h1>Sign In</h1>
            <form>
                <label htmlFor='email'>Email:</label>
                <input type='email' id="username" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password:</label>
                <input type='password' id="password" onChange={(e) => setPassword(e.target.value)} />

                <div className='loginBtns mb-3'>
                    <button onClick={(e) => handleSubmit(1, e)} >Log In</button>
                    <button onClick={(e) => handleSubmit(2, e)} >Demo</button>
                </div>

                <p>Dont have an Account?</p>
                <Link to="/register">Register here</Link>
            </form>
        </section>
        </div>
    )
}