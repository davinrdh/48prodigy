import PhoneIcon from "@/icons/PhoneIcon";
import Link from "next/link";
import React from "react";

export default function ButtonCall() {
  return (
    <Link href="https://api.whatsapp.com/send/?phone=6281238662627" target='_blank'>
      <button type="button" className="btn-call">
        <div className="md:me-4 md:mt-2 flex items-center">
          <div>
            <PhoneIcon />
          </div>
        </div>
        <div className="hidden md:block">
          <h6 className="text-end fw-semibold">Call</h6>
          <p>+62 8123 8662 627</p>
        </div>
      </button>
    </Link>
  );
}
