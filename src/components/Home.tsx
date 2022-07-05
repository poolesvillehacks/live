import {
    FormEvent,
    useEffect,
    useState,
    Dispatch,
    SetStateAction,
    DragEvent,
    useRef,
} from "react";

import { User } from "firebase/auth";

import { doc, setDoc, Firestore } from "firebase/firestore";

interface Props {
    user: User;
    status: Array<Boolean>;
    setStatus: Dispatch<SetStateAction<boolean[]>>;
    db: Firestore;
}

interface Files {
    release?: File;
    rules?: File;
}

const Home = ({ user, status, setStatus, db }: Props) => {
    const ref = useRef<HTMLLabelElement>(null);
    const ref2 = useRef<HTMLLabelElement>(null);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const store: Files = {};

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        let pdfRef;

        if (e.dataTransfer.items) {
            pdfRef = e.dataTransfer.items[0];
            if (pdfRef.kind === "file") {
                let file = pdfRef.getAsFile();
                console.log(file?.name);
                if (file) {
                    if (e.currentTarget.id === "release") {
                        setFileNames((fil) => {
                            let arr = [...fil];

                            arr[0] = file ? file.name : "";
                            return arr;
                        });
                        store.release = file;
                    } else if (e.currentTarget.id === "rules") {
                        setFileNames((fil) => {
                            let arr = [...fil];
                            arr[1] = file ? file.name : "";
                            return arr;
                        });
                        store.rules = file;
                    }
                }
            }
        }
    };

    return (
        <div className="flex-grow flex py-8 justify-center relative overflow-y-scroll">
            {status[3] ? (
                <div className="flex flex-col gap-10">
                    <div className="flex justify-left items-center gap-8 ">
                        <div className="flex flex-col gap-8">
                            <div
                                className={`w-20 h-20 rounded-full ${
                                    status[0] ? "bg-white" : "bg-base-blue"
                                } ${
                                    !status[0] && "border-4"
                                } flex justify-center items-center`}
                            >
                                <p
                                    className={`${
                                        status[0]
                                            ? "text-base-blue"
                                            : "text-white"
                                    } text-4xl font-bold`}
                                >
                                    1
                                </p>
                            </div>
                            <div
                                className={`w-20 h-20 rounded-full ${
                                    status[1] ? "bg-white" : "bg-base-blue"
                                } ${
                                    !status[1] && "border-4"
                                } flex justify-center items-center`}
                            >
                                <p
                                    className={`${
                                        status[1]
                                            ? "text-base-blue"
                                            : "text-white"
                                    } text-4xl font-bold`}
                                >
                                    2
                                </p>
                            </div>
                            <div
                                className={`w-20 h-20 rounded-full ${
                                    status[2] ? "bg-white" : "bg-base-blue"
                                } ${
                                    !status[2] && "border-4"
                                } flex justify-center items-center`}
                            >
                                <p
                                    className={`${
                                        status[2]
                                            ? "text-base-blue"
                                            : "text-white"
                                    } text-4xl font-bold`}
                                >
                                    3
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col h-[100%] justify-around gap-8">
                            <h1 className="text-white text-4xl font-bold">
                                Submit Contact Information
                            </h1>
                            <h1 className="text-white text-4xl font-bold">
                                Submit Documents
                            </h1>
                            <h1 className="text-white text-4xl font-bold">
                                Confirmation
                            </h1>
                        </div>
                    </div>
                    {!status[0] && (
                        <form
                            className="w-[100%] bg-dark-blue rounded p-6 flex flex-col"
                            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                                e.preventDefault();

                                await setDoc(
                                    doc(db, "users", user.uid),
                                    {
                                        name: e.currentTarget.fullname.value,
                                        grade: e.currentTarget.grade.value,
                                        school: e.currentTarget.school.value,
                                        status: {
                                            contact: true,
                                        },
                                    },
                                    { merge: true }
                                );
                                setStatus([true, false, false, true]);
                            }}
                        >
                            <div className="w-[100%] flex flex-row gap-6">
                                <div className="flex flex-col gap-3 flex-grow">
                                    <label className="text-white font-semibold text-xl">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="p-3 text-white focus:outline-none bg-base-purple rounded"
                                        name="fullname"
                                        required
                                    ></input>
                                </div>
                                <div className="flex flex-col gap-3 w-28">
                                    <label className="text-white font-semibold text-xl">
                                        Grade
                                    </label>
                                    <input
                                        type="number"
                                        min="6"
                                        max="12"
                                        className="p-3 text-white focus:outline-none bg-base-purple rounded"
                                        name="grade"
                                        required
                                    ></input>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 pt-3">
                                <label className="text-white font-semibold text-xl">
                                    School
                                </label>
                                <input
                                    className="p-3 text-white focus:outline-none bg-base-purple rounded"
                                    name="school"
                                    list="schools"
                                    required
                                ></input>
                                <datalist id="schools" data-id="schools">
                                    <option value="Poolesville High School"></option>
                                    <option value="Montgomery Blair High School"></option>
                                    <option value="Richard Montgomery High School"></option>
                                    <option value="Thomas Wootton High School"></option>
                                </datalist>
                            </div>
                            <input
                                className="bg-base-purple text-white font-semibold w-1/4 py-3 rounded mt-6 self-end cursor-pointer"
                                type="submit"
                            ></input>
                        </form>
                    )}
                    {!status[1] && status[0] && (
                        <div>
                            <form
                                className="w-[100%] bg-dark-blue rounded p-6 flex flex-col mb-8"
                                onSubmit={(e: FormEvent<HTMLFormElement>) =>
                                    e.preventDefault()
                                }
                            >
                                <label className="text-white text-2xl font-semibold underline pb-3 cursor-pointer">
                                    <a className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            version="1.1"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 24 24"
                                            fill="white"
                                        >
                                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                        </svg>
                                        Release of Liability
                                    </a>
                                </label>

                                {/* <div
                                    className="w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                                    id="dropbox"
                                ></div> */}
                                <label
                                    className="text-white relative w-full h-[300px] text-xl font-bold flex flex-col justify-center items-center border-dashed border-white border-8 rounded-lg"
                                    ref={ref}
                                >
                                    <div
                                        className="cursor-pointer w-full h-full absolute top-0 left-0"
                                        onDrop={dropHandler}
                                        onDragEnter={(e) => {
                                            ref.current?.classList.add(
                                                "bg-base-purple"
                                            );
                                        }}
                                        onDragLeave={(e) => {
                                            ref.current?.classList.remove(
                                                "bg-base-purple"
                                            );
                                        }}
                                        onDragOver={(e) => e.preventDefault()}
                                        id="release"
                                    ></div>
                                    <svg
                                        width="150"
                                        height="150"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"
                                        />
                                    </svg>
                                    <div className="flex">
                                        Drop or&nbsp;
                                        <span className="w-max underline">
                                            upload file
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            let curFiles =
                                                e.currentTarget.files;
                                            if (!curFiles) return;
                                            if (!curFiles[0]) return;
                                            setFileNames((fil) => {
                                                let arr = [...fil];
                                                arr[0] = curFiles
                                                    ? curFiles[0].name
                                                    : "";
                                                console.log(arr);
                                                return arr;
                                            });
                                            store.release = curFiles[0];
                                        }}
                                    ></input>
                                </label>

                                <label className="text-white text-2xl font-semibold underline p-3 cursor-pointer">
                                    <a className="flex items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            version="1.1"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 24 24"
                                            fill="white"
                                        >
                                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                        </svg>
                                        Rules and Regulations
                                    </a>
                                </label>
                                <label
                                    className="text-white relative w-full h-[300px] text-xl font-bold flex flex-col justify-center items-center border-dashed border-white border-8 rounded-lg"
                                    ref={ref2}
                                >
                                    <div
                                        className="cursor-pointer w-full h-full absolute top-0 left-0"
                                        onDrop={dropHandler}
                                        onDragEnter={(e) => {
                                            ref2.current?.classList.add(
                                                "bg-base-purple"
                                            );
                                        }}
                                        onDragLeave={(e) => {
                                            ref2.current?.classList.remove(
                                                "bg-base-purple"
                                            );
                                        }}
                                        onDragOver={(e) => e.preventDefault()}
                                        id="rules"
                                    ></div>
                                    <svg
                                        width="150"
                                        height="150"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"
                                        />
                                    </svg>
                                    <div className="flex">
                                        Drop or&nbsp;
                                        <span className="w-max underline">
                                            upload file
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            let curFiles =
                                                e.currentTarget.files;
                                            if (!curFiles) return;
                                            if (!curFiles[0]) return;
                                            setFileNames((fil) => {
                                                let arr = [...fil];
                                                arr[1] = curFiles
                                                    ? curFiles[0].name
                                                    : "";
                                                console.log(arr);
                                                return arr;
                                            });
                                            store.rules = curFiles[0];
                                        }}
                                    ></input>
                                </label>

                                <p className="text-white whitespace-pre-wrap pt-3 text-left">
                                    <span className="font-bold">
                                        Release of Liability:{" "}
                                    </span>
                                    {fileNames[0] || ""} {"\n"}
                                    <span className="font-bold">
                                        Rules and Regulations:
                                    </span>{" "}
                                    {fileNames[1] || ""}
                                </p>
                                <input
                                    className="bg-base-purple text-white font-semibold w-1/4 py-3 rounded mt-6 self-end cursor-pointer"
                                    type="submit"
                                ></input>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    width="100px"
                    height="100px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <g transform="rotate(0 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="2s"
                                begin="-0.9166666666666666s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(30 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.8333333333333334s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(60 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.75s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(90 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.6666666666666666s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(120 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.5833333333333334s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(150 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.5s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(180 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.4166666666666667s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(210 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.3333333333333333s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(240 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.25s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(270 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.16666666666666666s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(300 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="-0.08333333333333333s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                    <g transform="rotate(330 50 50)">
                        <rect
                            x="47"
                            y="24"
                            rx="3"
                            ry="6"
                            width="6"
                            height="12"
                            fill="#ffffff"
                        >
                            <animate
                                attributeName="opacity"
                                values="1;0"
                                keyTimes="0;1"
                                dur="1s"
                                begin="0s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </g>
                </svg>
            )}
        </div>
    );
};
export default Home;
