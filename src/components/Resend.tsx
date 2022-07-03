import { useState, useEffect } from "react";
import sendLoginLink from "../functions/sendLoginLink";

const Resend = ({ email }: { email: string }) => {
    const [timer, setTimer] = useState(0);
    const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
    useEffect(() => {
        const interval = setTimeout(function() {
            if (timer > 0) {
                setTimer((ti) => ti - 1);
            }
            if (timer === 0) {
                clearInterval(interval);
            }
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [timer]);

    return (
        <div className="flex flex-col items-center gap-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <p className="text-white font-light text-xl">
                A login link has been sent to your email. The email may be in
                your spam folder.
            </p>
            <button
                onClick={(e) => {
                    if (timer === 0) {
                        sendLoginLink(
                            window.localStorage.getItem("emailForSignIn") || ""
                        );
                        setTimer(10);
                    }
                }}
                className="btn text-white border-2 h-12 px-10 mt-4 cursor-pointer"
            >
                Resend{timer === 0 ? "" : `(${timer}s)`}
            </button>
        </div>
    );
};

export default Resend;
