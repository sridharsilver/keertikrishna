import React from "react";
import { useScrollProgress } from "../../hooks/useScrollProgress";

export function ReadingProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-[#A44A3F] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(164,74,63,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
