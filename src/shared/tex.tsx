/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseIcon from "@/icons/CloseIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ISidebar {
    isOpen: any;
    setIsOpen: any;
    navLink: any;
    pathname: any;
}
export default function Sidebar({
    isOpen,
    setIsOpen,
    navLink,
    pathname,
}: ISidebar) {
    return (
        <div>
            {isOpen && (
                <div>
                    <div className={`sidebar fixed w-full h-full left-0 z-20 top-0 md:hidden -translate-x-full ${isOpen && "translate-x-0"} transition-all ease-in-out`}>
                        <div
                            className={`fixed top-0 left-0 h-full bg-white backdrop-sepia-50 w-80 z-40 md:hidden`}
                        //   style={{backgroundColor: 'var(--primary'}}
                        >
                            <div className="flex justify-between p-3 mb-3 border">
                                <div className="flex">
                                    <Link href="/" className="brand" onClick={() => setIsOpen(false)}>
                                        <Image
                                            src="/logo.svg"
                                            alt="IndoexpatsInsurance"
                                            width={50}
                                            height={45}
                                        />
                                    </Link>
                                    <Link
                                        href="/"
                                        className="flex items-center ms-2 text-brand md:hidden"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div>
                                            <p className="m-0 font-semibold text-sm">
                                                IndoexpatsInsurance
                                            </p>
                                            <p
                                                style={{
                                                    fontSize: "8px",
                                                    color: "var(--primary)",
                                                }}
                                            >
                                                by msiglifeindonesia
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        className="p-4 text-right w-full text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                            <p className="text-xl p-5 text-gray-500">Menu</p>
                            <div>
                                {navLink.map((link: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`p-4 m-3 text-xl ${pathname === link.href ? "active" : ""
                                            }`}
                                    // style={{borderLeft: '0.3rem solid transparent'}}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="nav-link"
                                        >
                                            {link.label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isOpen && (
                            <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
