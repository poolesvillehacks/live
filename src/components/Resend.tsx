const Resend = ({ email }: {email: string}) => (
    <div className="flex flex-col items-center gap-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <p className="text-white font-light text-xl">
            A login link has been sent to your email.
        </p>
        <button className="btn text-white border-2 h-12 px-10 mt-4 cursor-pointer">
            Resend
        </button>
    </div>
);

export default Resend;
