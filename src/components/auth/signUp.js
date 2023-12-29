'use client';

import { useState } from 'react';

import { useAuth, VIEWS } from '@/components/authProvider';
import supabase from 'src/lib/supabase-browser';

const SignUp = () => {
    const { setView } = useAuth();
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function signUp(formData) {
        const { error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Success! Please check your email for further instructions.');
        }
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 items-center justify-center gap-2">
            <form
                className="flex-1 flex flex-col w-full sm:max-w-md gap-2 text-foreground"
            >
                <div className="grid grid-flow-col auto-cols-max gap-2 place-content-center pb-12">
                    <svg className="h-40 w-40 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330.51 150.7">
                        <path
                            d="M103.9,6.57l-23.75,47.5c-4.38,8.77-16.89,8.77-21.28,0L35.12,6.57C33.11,2.55,28.99,0,24.48,0H11.91C3.06,0-2.69,9.32,1.28,17.23l57.57,114.57c4.4,8.75,16.89,8.73,21.26-.02L123.89,44.25c2.01-4.03,6.13-6.57,10.64-6.57h.75c6.57,0,11.89,5.32,11.89,11.89v89.24c0,6.57,5.32,11.89,11.89,11.89h13.89c6.57,0,11.89-5.32,11.89-11.89V49.57c0-6.57,5.32-11.89,11.89-11.89h0c4.49,0,8.6,2.53,10.62,6.55l43.71,86.84c4.4,8.74,16.88,8.72,21.26-.03l56.91-113.82c3.95-7.91-1.8-17.21-10.64-17.21h-11.11c-4.49,0-8.59,2.53-10.62,6.53l-24.53,48.57c-4.4,8.71-16.83,8.71-21.23,0L226.58,6.53c-2.02-4.01-6.13-6.53-10.62-6.53H114.53c-4.5,0-8.62,2.55-10.64,6.57Z"
                        />
                    </svg>
                </div>

                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="you@example.com"
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    placeholder="••••••••"
                />
                <button className="bg-emerald-600 rounded px-4 py-2 text-white mb-3" onClick={signUp}>
                    Sign Up
                </button>
                <p>
                    Already have an account?
                </p>
                <button className="border-4 border-cyan-600 hover:bg-cyan-900 rounded px-4 py-2 text-white mb-1" type="button"
                        onClick={() => setView(VIEWS.SIGN_IN)}>
                    Sign In
                </button>
            </form>

            {errorMsg && <div className="text-red-600">{errorMsg}</div>}
            {successMsg && <div className="text-white">{successMsg}</div>}
        </div>
    );
};

export default SignUp;
