import { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import './auth.css'
import { useRouter } from 'next/router';
import Link from 'next/link';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setLoading(true)
        try {
            const response = await axios.post('/api/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            router.push('/home')
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
                        <h5 className="card-title">Login</h5>
                        <hr></hr>
                        {error != '' &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    className="form-control"
                                    id="exampleFormControlInput1"
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
                                <button type="submit" className="btn btn-primary">Login</button>
                            }
                            <Link href={'/register'}><p className='mt-3'>Click here to register</p></Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
