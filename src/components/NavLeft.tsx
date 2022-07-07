import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";
import {
    doc,
    DocumentData,
    Firestore,
    getDoc,
    getFirestore,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
interface Props {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
    data?: DocumentData;
    stats: {
        inProg: boolean;
        finish: boolean;
        rejected: boolean;
    };
    setStat: Dispatch<SetStateAction<Props["stats"]>>;
    status: Array<boolean>;
}

const NavLeft = ({ page, setPage, data, stats, status }: Props) => {
    const auth = getAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const statusHandler = () => {
        if (!status[0] && stats.rejected) {
            return "Rejected";
        } else {
            if (status[0]) {
                if (!status[1]) {
                    // change to Missing Information after Pre-Registration period
                    return "Pre-Registered";
                } else {
                    if (!stats.finish) {
                        if (stats.rejected) {
                            return "Rejected";
                        } else {
                            return "Awaiting Confirmation";
                        }
                    } else {
                        return "Registered";
                    }
                }
            } else {
                return "Missing Information";
            }
        }
    };
    const colors = (result: string) => {
        // prettier-ignore
        return (result === "Rejected") ? "text-red-600" :
                            (result === "Awaiting Confirmation") ? "text-amber-300" : 
                                (result === "Missing Information") ? "text-amber-500" :
                                    (result === "Registered") ? "text-green-400" : 
                                        (result === "Pre-Registered") ? "text-green-400" : ""
    };
    return (
        <>
            <div
                className="h-[5vh] w-full absolute cursor-pointer top-0 left-0 md:hidden flex items-center pl-2 z-10"
                onClick={(e) => {
                    if (!open) setOpen(true);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div
                className={`h-[100vh] w-[70%] cursor-pointer md:!min-w-[400px] md:flex transition-all duration-500 bg-base-purple justify-center items-center md:static absolute z-20  overflow-hidden ${
                    open ? "w-[70%]" : "w-0"
                }`}
            >
                <ul
                    className={`h-full w-full flex-col  justify-between items-center pb-10 flex whitespace-nowrap`}
                >
                    <div
                        className="self-start h-[5vh] w-full flex items-center px-2 "
                        onClick={(e) => setOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8  md:hidden"
                            viewBox="0 0 20 20"
                            fill="white"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-5">
                        <li
                            className={`nav-item font-light text-white ${
                                page === "Home" ? "font-semibold" : ""
                            } text-3xl cursor-pointer`}
                            onClick={(e) => setPage("Home")}
                            id="Home"
                        >
                            Home
                        </li>
                        <li
                            className={`nav-item font-light text-white ${
                                page === "Resources" ? "font-semibold" : ""
                            } text-3xl  cursor-pointer before:content-['Resources'] before:block before:font-semibold before:h-0 before:invisible before:overflow-hidden`}
                            onClick={(e) => setPage("Resources")}
                            id="Resources"
                        >
                            Resources
                        </li>
                        <li
                            className={`nav-item  font-light text-white ${
                                page === "Code" ? "font-semibold" : ""
                            } text-3xl cursor-pointer`}
                            onClick={(e) => setPage("Code")}
                            id="Code"
                        >
                            Code
                        </li>
                    </div>
                    <li className="text-2xl text-white flex flex-col gap-2 justify-center items-center ">
                        <p className="font-semibold">Registration Status</p>
                        <p className={`font-light ${colors(statusHandler())} `}>
                            {statusHandler()}
                        </p>
                        <p
                            className="font-light text-lg underline text-blue-300 cursor-pointer"
                            onClick={(e) => {
                                signOut(auth);
                            }}
                        >
                            Sign Out
                        </p>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default NavLeft;
