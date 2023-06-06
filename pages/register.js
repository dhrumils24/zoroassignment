import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import './auth.css'
import Link from 'next/link';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setLoading(true)
        try {
            const response = await axios.post('/api/register', { name, email, password });
            if (response) {
                console.log(response)
                setSuccess(true)
                setEmail('')
                setPassword('')
                setName('')
                setLoading(false)
            }
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false)
        }
    };

    return (
        <>
            <Navbar />
            <div className='auth-card-container'>
                <div className="card" style={{ 'width': '475px' }}>
                    <div className="card-body">
                        <h5 className="card-title">Register</h5>
                        <hr></hr>
                        {error != '' &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        {success &&
                            <div className="alert alert-success" role="alert">
                                User registerd! You may now login but visitng the login page.
                            </div>
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    className="form-control"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    className="form-control"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    className="form-control"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {loading ? <button class="btn btn-primary" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </button> :
                                <button type="submit" className="btn btn-primary">Register</button>
                            }
                            <Link href={'/login'}><p className='mt-3'>Click here to login</p></Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
