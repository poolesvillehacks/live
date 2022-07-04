import { FormEvent, useEffect, useState, Dispatch, SetStateAction } from "react";


import { User } from "firebase/auth";

import { doc, setDoc, Firestore} from "firebase/firestore";

interface Props {
    user: User;
    status: Array<Boolean>;
    setStatus: Dispatch<SetStateAction<boolean[]>>;
    db: Firestore;
}

const Home = ({ user, status, setStatus, db }: Props) => {

    return (
        <div className="h-[100%] flex-grow flex justify-center relative">
            {status[3] ? (
                <div className="flex flex-col gap-10 mt-8">
                    <div className="flex justify-left items-center gap-8 columns-2">
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
                                Submit contact information
                            </h1>
                            <h1 className="text-white text-4xl font-bold">
                                Submit documents
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
                                        min="10"
                                        max="100"
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
