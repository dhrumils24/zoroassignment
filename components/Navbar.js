import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setIsLoggedIn(true)
    }, [])
    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login')
    }
    return (
        <nav className="navbar bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Zoro Full-Stack Assignment</a>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                </ul>
                <span>
                    {!isLoggedIn ?
                        <>
                            <Link href={'/login'}>
                                <button type="button" className="btn btn-outline-secondary">Login</button>
                            </Link>
                            <Link href={'/register'}>
                                <button type="button" className="btn btn-outline-secondary mx-2">Register</button>
                            </Link>
                        </>
                        :
                        <button type="button" className="btn btn-outline-secondary" onClick={() => logout()}>Logout</button>

                    }
                </span>
            </div>
        </nav>
    )
}

export default Navbar