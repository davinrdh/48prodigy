/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

export default function AgentContact() {
    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-5 mt-5'>
            {nomorTelp.map((item, index) => (
                <Link href={item.link} target='_blank' className="rounded-3xl bg-[#F5FFFD] shadow-2xl hover:scale-[1.04] transition-all ease-in-out" key={index}>
                    <div className="px-6 py-9 flex justify-center items-center flex-col">
                        <img src={item?.gender === "female" ? '/femaleAvatar.svg' : '/maleAvatar.svg'} alt="" className='mb-5' />
                        <p className='text-xl font-semibold text-center'>Agent {item?.nama}</p>
                        <p className='text-center'>{item?.nomor}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

const nomorTelp = [
    {
        nama: 'Eka',
        nomor: '0812 3866 2627',
        gender: 'female',
        link: 'https://api.whatsapp.com/send/?phone=6281238662627'
    },
    {
        nama: 'Anna',
        nomor: '0813 3915 8836',
        gender: 'female',
        link: 'https://api.whatsapp.com/send/?phone=6281339158836'
    },
    {
        nama: 'Theo',
        nomor: '0812 5918 1815',
        gender: 'male',
        link: 'https://api.whatsapp.com/send/?phone=6281259181815'
    },
    {
        nama: 'Ribka',
        nomor: '0812 8070 0776',
        gender: 'female',
        link: 'https://api.whatsapp.com/send/?phone=6281280700776'
    },
    {
        nama: 'Joseph',
        nomor: '0819 1700 2126',
        gender: 'male',
        link: 'https://api.whatsapp.com/send/?phone=6281917002126'
    },
]