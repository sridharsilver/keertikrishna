import React from "react";

export function OrnamentDivider({ className = "", text = "❦" }) {
  return (
    <div className={`flex items-center justify-center my-10 ${className}`}>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D5CCC0] to-transparent"></div>
      <span className="mx-4 text-[#A44A3F] text-lg select-none opacity-80">{text}</span>
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D5CCC0] to-transparent"></div>
    </div>
  );
}

export function EditorialRule({ className = "" }) {
  return (
    <div className={`w-full border-t border-[#E8E2D8] my-8 ${className}`} />
  );
}
