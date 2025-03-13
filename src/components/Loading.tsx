import React from "react";

export default function Loading() {
  return (
    <div className="flex space-x-1">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <style jsx>{`
        .dot {
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          animation: loadingDots 1.5s infinite ease-in-out;
        }

        /* Urutan dari kanan ke kiri */
        .dot:nth-child(1) {
          animation-delay: 0.4s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0s;
        }

        @keyframes loadingDots {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
