import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full border border-gray-300 rounded-xl px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
