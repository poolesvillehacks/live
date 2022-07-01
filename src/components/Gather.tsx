import { Dispatch, SetStateAction } from "react";
import sendLoginLink from "../functions/sendLoginLink";

interface Props {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    setSent: Dispatch<SetStateAction<boolean>>;
}

const Gather = (props: Props) => (
    <form
        className="flex flex-col items-center w-[80%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        onSubmit={(e) => {
            e.preventDefault();
            props.setSent(true);
            sendLoginLink(props.email)
        }}
    >
        <label className="text-white font-light self-start">EMAIL</label>
        <input
            onChange={(e) => props.setEmail(e.target.value)}
            type="email"
            name="email"
            value={props.email}
            className="w-[100%] h-12 text-white bg-transparent border-2 focus:rounded-none focus:outline-none p-2"
            required
        ></input>
        <input
            className="btn text-white border-2 h-12 px-10 mt-8 cursor-pointer"
            type="submit"
        ></input>
    </form>
);

export default Gather;
