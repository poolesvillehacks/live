import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import NavLeft from "../components/NavLeft";
import Home from "../components/Home";
import Gather from "../components/Gather";
import Resend from "../components/Resend";
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc } from "firebase/firestore";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = require("../firebase.json");
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

function Dashboard() {
    let [user, setUser] = useState<User>();
    let [page, setPage] = useState("Home");
    let navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (chec) => {
            if (chec) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(chec);
                fetch("/api/", {
                    method: "GET",
                    headers: {
                        Authorization: "",
                    },
                });
            } else {
                navigate("/", { replace: true });
            }
        });
        if (user) {
            getStatus(user.uid);
        }
    }, [navigate, user]);
    const [status, setStatus] = useState([false, false, false, false]);

    const getStatus = async (uid: string) => {
        let snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) {
            const data = snap.data();
            setStatus([
                data.status.contact,
                data.status.documents,
                data.status.confirmation,
                true,
            ]);
        } else {
            console.log("Error");
        }
    };

    return (
        <>
            <div className="h-[100vh] w-[100vw] overflow-hidden flex">
                <NavLeft page={page} setPage={setPage} />

                {user
                    ? page === "Home" && (
                          <Home
                              status={status}
                              user={user}
                              setStatus={setStatus}
                              db={db}
                          />
                      )
                    : undefined}
            </div>
        </>
    );
}

export default Dashboard;
