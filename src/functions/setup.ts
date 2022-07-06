import { User } from "firebase/auth";
import { doc, Firestore, setDoc} from "firebase/firestore"

const setup = async (user: User, db: Firestore) => {
        await setDoc(doc(db, "users", user.uid), {
            name: "",
            code: "",
            email: user.email,
            school: "",
            dietaryRestrictions: "",
            grade: "",
            status: {
                confirmation: false,
                contact: false,
                documents: false,
                rejected: false
            },
            tShirtSize: ""
        });
        
}
export default setup;