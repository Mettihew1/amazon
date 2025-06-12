import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
    const emailRef = useRef();
    const passRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function submitHandler(ev) {
        ev.preventDefault();
        const email = emailRef.current.value;
        const password = passRef.current.value;

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                { email, password },
                { withCredentials: true } // Essential for cookies
            );

            // Save user data (excluding token) to localStorage
            const { token, ...userData } = response.data;
            localStorage.setItem('user', JSON.stringify(userData));

            // Redirect to home or previous protected page
            navigate('/');
            
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={submitHandler} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            
            {error && (
                <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                    ref={emailRef} 
                    type="email" 
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                    ref={passRef} 
                    type="password" 
                    required
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <button 
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded text-white ${isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}