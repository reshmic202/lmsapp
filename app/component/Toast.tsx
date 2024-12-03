"use client"
import { useEffect, useState } from "react";

const Toast = ({
  message,
  position,
  type,
  onClose,
}: {
  message: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); 
    return () => clearTimeout(timer); 
  }, [onClose]);




  return (
    <div
      className={`fixed p-4 rounded-lg shadow-lg text-white transition-opacity duration-500 ${position === "top-left" ? "top-4 left-4" : ""
        } ${position === "top-right" ? "top-4 right-4" : ""} ${position === "bottom-left" ? "bottom-4 left-4" : ""
        } ${position === "bottom-right" ? "bottom-4 right-4" : ""}
      ${type === "success"
          ? "bg-green-500"
          : type === "error"
            ? "bg-red-500"
            : type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
        }`}
    >
      <div className=" flex items-center justify-between">
        <p>{message}</p>
       <button onClick={onClose}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg></button>

      </div>
      <div
  className="bg-white h-1 rounded-2xl"
  style={{
    animation: "shrinkWidth 3s linear forwards",
  }}
></div>
    </div>
  );
};

export default Toast;