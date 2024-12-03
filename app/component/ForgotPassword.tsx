import React, { useState } from "react";

const ForgotPasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        setError("");
        console.log("Reset password link sent to:", email);
        // Close the modal after submitting
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 px-6 ">
            <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          ✕
        </button>
                <h2 className="text-xl font-semibold text-center mb-4 mt-4">Forgot Password</h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your email address, and we’ll send you a link to reset your password.
                </p>
                <input required name='email' className='w-full p-2 rounded-md bg-slate-100  focus:outline-none text-sm' type="email" placeholder='Email' />
                <div className=" mb-4">
                    <button className='w-full mt-2 px-4 py-2 text-white bg-slate-600 rounded-xl hover:bg-slate-700'>Login</button>
                </div>
            </div>
        </div>
    );
};


export default ForgotPasswordModal;