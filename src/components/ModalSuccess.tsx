/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

interface IModalSuccess {
  setSuccess: any;
}

export default function ModalSuccess({ setSuccess }: IModalSuccess) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96 max-w-full">
        <div className="text-center">
          <Image src="/emailSent.png" alt="emailSent" width="320" height="207"/>
          <h2 className="text-xl font-semibold mb-2">Success!</h2>
          <p className="text-gray-600 mb-4">
            Registration has been successful! Please check your WhatsApp
          </p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring focus:ring-green-300"
            onClick={() => setSuccess(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
