import React from "react";
export function Button({ children, onClick, className = "", size = "", variant = "default", type = "button" }) {
    const base = "px-4 py-2 rounded-xl text-white font-medium transition-all";
    const variants = {
      default: "bg-blue-600 hover:bg-blue-700",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
    };
    const sizes = {
      icon: "p-2",
      default: "",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`}
      >
        {children}
      </button>
    );
  }
  