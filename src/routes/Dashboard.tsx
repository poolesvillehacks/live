import React, { useEffect, useState } from "react";

import Gather from "../components/Gather";
import Resend from "../components/Resend";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavLeft from "../components/NavLeft";
const auth = getAuth();
function Dashboard() {
    let [user, setUser] = useState<User>()
    let [page, setPage] = useState("Home");
    let navigate = useNavigate()
    useEffect(() => {
      onAuthStateChanged(auth, (chec) => {
          if (chec) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUser(chec);
              fetch("/api/", {method: "GET", headers: {
                "Authorization": ""
              }})

          } else {
              navigate("/", { replace: true });
          }
      });
    })

    return (
        <>
            <div className="container h-[100vh] w-[100vw] overflow-hidden flex">
                <NavLeft page={page} setPage={setPage}/>
                <div className="text-white flex-grow">
                    {user ? user.uid + "" : undefined}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
