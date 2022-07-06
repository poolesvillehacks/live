import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import NavLeft from "../components/NavLeft";
import Home from "../components/Home";
import Gather from "../components/Gather";
import Resend from "../components/Resend";
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, doc, DocumentData } from "firebase/firestore";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import setup from "../functions/setup";

const firebaseConfig = require("../firebase.json");
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

function Dashboard() {
    let [user, setUser] = useState<User>();
    let [d, setData] = useState<DocumentData>();
    let [page, setPage] = useState("Home");
    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (chec) => {
            if (chec) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(chec);

                // const token = await chec.getIdToken()
                // console.log(token)
                // fetch("http://localhost:3001/api/", {
                //     method: "POST",
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // });
            } else {
                navigate("/", { replace: true });
            }
        });
        if (user) {
            getStatus(user);
        }
    }, [navigate, user]);
    const [status, setStatus] = useState([false, false, false, false]);

    const getStatus = async (u: User) => {
        let uid = u.uid;
        let snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) {
            const data = snap.data();
            setData(data);
            setStatus([
                data.status.contact,
                data.status.documents,
                data.status.confirmation,
                true,
            ]);
            setStat({
                inProg: data.status.documents,
                finish: data.status.confirmation,
                rejected: data.status.rejected,
            });
        } else {
            console.log("Error");
            await setup(u, db);
            setStatus([false, false, false, true]);
      
            let snap2 = await getDoc(doc(db, "users", uid));
            if (snap2.exists()) {
                setData(snap2.data());
            }
        }
    };
    const [stat, setStat] = useState({
        inProg: false,
        finish: false,
        rejected: false,
    });


    return (
        <>
            <div className="h-[100vh] w-[100vw] flex">
                <NavLeft
                    page={page}
                    setPage={setPage}
                    data={d}
                    stats={stat}
                    setStat={setStat}
                    status={status}
                />

                {user
                    ? page === "Home" && (
                          <Home
                              status={status}
                              user={user}
                              setStatus={setStatus}
                              db={db}
                              stats={stat}
                              setStat={setStat}
                          />
                      )
                    : undefined}
            </div>
        </>
    );
}

export default Dashboard;
