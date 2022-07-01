import React, { useEffect, useState } from "react";

import Gather from "../components/Gather";
import Resend from "../components/Resend";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const auth = getAuth();
function Dashboard() {
    let [user, setUser] = useState<User>()
    let navigate = useNavigate()
    useEffect(() => {
      onAuthStateChanged(auth, (chec) => {
          if (chec) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUser(chec);
              // ...
          } else {
              navigate("/", { replace: true });
          }
      });
    })
    
    return (
        <div className="text-white">
            {user ? user.uid : undefined}
        </div>
    );
}

export default Dashboard;
