import { useState, Dispatch,SetStateAction } from "react";
import { signOut, getAuth } from "firebase/auth";

import { useNavigate } from "react-router-dom";
interface Props {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
}


const NavLeft = (props: Props) => {
    const auth = getAuth();
    const [page, setPage] = [props.page, props.setPage]
    const navigate = useNavigate()
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
                    <p className="font-light text-amber-300">
                        Missing Information
                    </p>
                    <p className="font-light text-lg underline text-blue-300 cursor-pointer" onClick={e => {
                        signOut(auth)
                    }}>
                        Sign Out
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default NavLeft;
