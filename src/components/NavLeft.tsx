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

    const navigate = useNavigate();
    const statusHandler = () => {
        if (!status[0] && stats.rejected) {
            return "Rejected";
        } else {
            if (status[0]) {
                if (!status[1]) {
                    return "Missing Information";
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
                                    (result === "Registered") ? "text-green-400" : ""
    };
    return (
        <div className="h-[100vh] w-[400px] bg-base-purple flex justify-center items-center">
            <ul className="h-full flex flex-col justify-between items-center p-10">
                <div></div>
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
                <li className="text-2xl text-white flex flex-col gap-2 justify-center items-center">
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
    );
};

export default NavLeft;
