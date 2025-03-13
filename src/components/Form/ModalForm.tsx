import React, { useEffect } from "react";
import FormLanding from "./FormLanding";
import CloseIcon from "@/icons/CloseIcon";

interface IModalForm {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ModalForm({ isOpen, setIsOpen }: IModalForm) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>

      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-md max-h-[97vh] md:h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-3 border-b py-2">
            <h1 className="text-2xl font-semibold">Form Registration</h1>
            <button className="p-2 text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          {/* Form */}
          <FormLanding desc={false} />
        </div>
      </div>
    </>
  );
}
