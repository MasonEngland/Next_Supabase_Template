'use client';

import React from 'react';
import Image from 'next/image';
import login from './login';
import { useState } from 'react';
import { redirect } from 'next/navigation';

const LoginPage = () => {
    // Customizable variables
    const primaryColor = '#4F46E5'; // Change this to update the primary color
    const secondaryColor = '#E5E7EB'; // Change this to update the secondary color
    const logoUrl = "./logo.png"; // Update this to change the logo

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result) {
            console.log('Login successful:', result);
            redirect('/dashboard');
            // Redirect or update UI as needed
        } else {
            console.error('Login failed');
        }
    };

    return (
        <div style={{ backgroundColor: secondaryColor, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    Logo placeholder - replace with your own logo
                    {/* <Image src={logoUrl} alt="Logo" width={100} height={100} /> */}
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `1px solid ${secondaryColor}`,
                                borderRadius: '4px',
                                outline: 'none',
                                fontSize: '1rem',
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `1px solid ${secondaryColor}`,
                                borderRadius: '4px',
                                outline: 'none',
                                fontSize: '1rem',
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: primaryColor,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                        }}
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;