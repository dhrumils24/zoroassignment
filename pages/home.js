import Navbar from '@/components/Navbar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './auth.css'
import { useRouter } from 'next/router'

function home() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            axios.post('/api/getUser', { token }).then((data) => {
                setData(data.data.user)
                setLoading(false)
            }).catch((error) => {
                router.push('/login')
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    })
    return (

        <>
            <Navbar />
            <div className='container'>
                <div className='auth-card-container'>
                    {loading ?
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div className="card" style={{ 'width': '475px' }}>
                            <div className="card-body">
                                <h5 className="card-title">Hi {data.name}!</h5>
                                <p>Your email is: {data.email}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default home