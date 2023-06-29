import { useEffect, useState } from "react";
import React from 'react';

const Header = (props) => {
    const [address, setAddress] = useState('');
    const [metamaskConnected, setMetamaskConnected] = useState(false);

    useEffect(() => {
        // Check if MetaMask is installed in the browser
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_accounts' })
                .then(accounts => {
                    if (accounts.length > 0) {
                        setAddress(accounts[0]);
                        setMetamaskConnected(true);
                    }
                })
                .catch(error => { });

            // update the address when changed
            window.ethereum.on('accountsChanged', accounts => {
                if (accounts.length > 0) {
                    setAddress(accounts[0]);
                    setMetamaskConnected(true);
                } else {
                    setAddress('');
                    setMetamaskConnected(false);
                }
            });
        }
    }, []);

    const connectToMetaMask = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(accounts => {
                    setAddress(accounts[0]);
                    setMetamaskConnected(true);
                })
                .catch(error => { });
        } else { }
    };

    return (
        <nav className="border-b-2 flex flex-col">
            <h1
                className={`py-4 font-bold text-3xl text-center my-32 ${props.darkMode ? 'text-blue-400' : 'text-blue-900'} `}
            >HealthChain
            </h1>
            <div
                className={`
                ${metamaskConnected
                        ? "flex flex-col justify-center items-center mb-5 gap-7"
                        : 'flex flex-row justify-between items-center mx-5 my-10 md:ml-24'}`}>
                {/* dark mode icon */}
                <div
                    className={`${metamaskConnected ? "" : ""}`}
                >
                    {props.darkMode ?
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-10 h-10 text-white hover:cursor-pointer hover:text-slate-300"
                            onClick={props.handleDarkMode}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-8 h-8 text-blue-950 hover:cursor-pointer hover:text-blue-500"
                            onClick={props.handleDarkMode}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>}
                </div>
                {/* end dark mode icon */}
                <button
                    className={`p-3 border rounded-md bg-gradient-to-b
                    ${props.darkMode
                            ? 'from-slate-500 to-slate-500 via-slate-700 text-white hover:from-slate-700 hover:to-slate-700 hover:via-slate-500 hover:text-black'
                            : 'from-indigo-300 to-indigo-300 via-indigo-500 text-slate-200 hover:from-indigo-500 hover:to-indigo-500 hover:via-indigo-300 hover:text-black'} 
                            ${metamaskConnected ? 'hidden' : ''}`}
                    onClick={!metamaskConnected ? connectToMetaMask : null}>
                    Connect with MetaMask
                </button>
                {address &&
                    <p className={`text-center ${props.darkMode
                        ? "text-white"
                        : "text-black"} 
                        ${!metamaskConnected ? 'hidden' : ''}`}
                    >{address}
                    </p>}
            </div>
        </nav>
    );
}
export default Header;