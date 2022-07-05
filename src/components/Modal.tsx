import { Dispatch, SetStateAction, useRef } from "react";

interface Props {
    text: string;
    show: boolean;
    showState: Dispatch<SetStateAction<boolean>>;
}
const Modal = ({ text, show, showState }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const close = () => {
        if (ref.current) {
            showState(false);
        }
    };
    return (
        <div
            className={`modal h-screen w-screen ${
                show ? "" : "hidden"
            } cursor-pointer overflow-hidden fixed top-0 left-0 z-40 bg-black/40`}
            ref={ref}
            onClick={close}
        >
            <div className="h-[300px] w-1/4 bg-base-purple text-white flex flex-col justify-between items-center p-5 z-50 text-xl relative top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <div></div>
                <p>{text}</p>
                <p className="text-sm">Click anywhere to close</p>
            </div>
        </div>
    );
};

export default Modal;
