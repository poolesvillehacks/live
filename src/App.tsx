import React, { useState } from "react";

import "./App.css";

function App() {
    let [email, setEmail] = useState("");
    let [sent, setSent] = useState(false);
    return (
        <div className="App overflow-hidden">
            <div className="background flex flex-col align-center justify-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <p className="bg">POOLESVILLE</p>
                <p className="bg">POOLESVILLE</p>
                <p className="bg">POOLESVILLE</p>
                <p className="bg">POOLESVILLE</p>
                <p className="bg">POOLESVILLE</p>
            </div>
            <div className="box fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-base-blue w-[50%] h-[400px] border-2 flex flex-col items-center py-5 px-20 ">
                <h1 className="text-white font-bold text-3xl ">
                    poolesville_hacks
                </h1>
                {!sent ? (
                    <form
                        className="flex flex-col items-center w-[80%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSent(true);
                        }}
                    >
                        <label className="text-white font-light self-start">
                            EMAIL
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            value={email}
                            className="w-[100%] h-12 text-white bg-transparent border-2 focus:rounded-none focus:outline-none p-2"
                            required
                        ></input>
                        <input
                            className="btn text-white border-2 h-12 px-10 mt-8 cursor-pointer"
                            type="submit"
                        ></input>
                    </form>
                ) : (
                    <div className="flex flex-col items-center gap-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <p className="text-white font-light text-xl">
                            A login link has been sent to your email.
                        </p>
                        <button className="btn text-white border-2 h-12 px-10 mt-4 cursor-pointer">
                            Resend
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
