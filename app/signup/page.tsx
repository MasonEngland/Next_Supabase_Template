'use client';

import React, { useState } from 'react';
import signup from './signup';
import { redirect } from 'next/navigation';

const SignupPage = () => {
    // Customizable variables
    const primaryColor = '#4F46E5'; // Change this to update the primary color
    const secondaryColor = '#E5E7EB'; // Change this to update the secondary color
    const logoUrl = '/logo.png'; // Update this to change the logo

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const result = await signup(email, password, firstName, lastName);
        if (result.error) {
            console.error('Signup failed:', result.error);
            alert('Signup failed: ' + result.error.message);
        } else {
            console.log('Signup successful:', result.data);
            alert('Signup successful!');
            redirect('/dashboard');
        }
        // Add signup logic here
    };

    return (
        <div style={{ backgroundColor: secondaryColor, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    {/*<Image src={logoUrl} alt="Logo" width={100} height={100} style={{ margin: '0 auto' }} />*/}
                </div>
                <form onSubmit={handleSubmit}>
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
                    <div style={{ marginBottom: '1rem' }}>
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
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `1px solid ${secondaryColor}`,
                                borderRadius: '4px',
                                outline: 'none',
                                fontSize: '1rem',
                            }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                   {/* add input field for first and last name */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `1px solid ${secondaryColor}`,
                                borderRadius: '4px',
                                outline: 'none',
                                fontSize: '1rem',
                            }}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Enter your last name"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: `1px solid ${secondaryColor}`,
                                borderRadius: '4px',
                                outline: 'none',
                                fontSize: '1rem',
                            }}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;