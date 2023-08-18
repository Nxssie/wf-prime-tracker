'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation'

import {useAuth, VIEWS} from '@/components/authProvider';
import supabase from 'src/lib/supabase-browser';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setView} = useAuth();
    const [errorMsg, setErrorMsg] = useState(null);
    const router = useRouter();

    const signIn = async (e) => {
        e.preventDefault();
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMsg(error.message);
        }

        router.push('/')
        router.refresh();
    }

    const signInWithDiscord = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'discord',
        });

        if (error) {
            setErrorMsg(error.message);
        }
    }

    const signInWithTwitch = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'twitch',
        })

        if (error) {
            setErrorMsg(error.message);
        }
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form
                className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                onSubmit={signIn}
            >
                <div className="grid grid-flow-col auto-cols-max gap-2 place-content-center pb-12">
                    <svg className="h-40 w-40 fill-violet-400" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 330.51 150.7">
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
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="••••••••"
                />
                <button className="bg-violet-400 rounded-2xl px-4 py-2 text-white mb-1 hover:bg-violet-700">
                    Sign In
                </button>

                <div className="flex flex-row space-x-6">
                    <button type="button"
                            className="basis-1/2 bg-indigo-600 rounded-2xl px-4 py-2 text-white mb-6 grid grid-flow-col auto-cols-max gap-2 place-content-center"
                            onClick={signInWithDiscord}>
                        <img className="w-6 h-6" src="https://www.svgrepo.com/show/452188/discord.svg" loading="lazy"
                             alt="discord logo"/>
                        <p className="font-normal">Discord</p>
                    </button>
                    <button type="button"
                            className="basis-1/2 bg-white border-4 border-[#9146FF] rounded-2xl px-4 py-2 text-white mb-6 grid grid-flow-col auto-cols-max gap-2 place-content-center"
                            onClick={signInWithTwitch}>
                        <img className="w-12" src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Twitch_logo_(wordmark_only).svg" loading="lazy"
                             alt="twitch logo"/>
                    </button>
                </div>

                <p>
                    Don't have an account?
                </p>
                <button
                    className="bg-green-400 hover:bg-green-600 hover:text-white rounded-2xl basis-auto px-4 py-2"
                    onClick={() => setView(VIEWS.SIGN_UP)}
                >
                    Sign Up Now
                </button>
            </form>
        </div>
    );
};

export default SignIn;
