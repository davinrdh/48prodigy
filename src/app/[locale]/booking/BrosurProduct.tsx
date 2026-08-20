/* eslint-disable @typescript-eslint/no-explicit-any */
import DownloadDocIcon from '@/icons/DownloadDocIcon'
import EyeIcon from '@/icons/EyeIcon'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function BrosurProduct({ title, linkSee, linkDownload }: any) {
    const locale = useLocale()
    return (
        <div className='md:w-96'>
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-5">
                    <div className='flex justify-start items-start mb-4 gap-3'>
                        <Image src='/pdfIcon.svg' width={70} height={0} alt='' />
                        <a href="#">
                            <h1 className='font-semibold text-2xl mb-3'>{title}</h1>
                        </a>
                    </div>
                    <div className='flex justify-between gap-3 border-t-2 pt-4'>
                        <Link href={linkDownload} download className="py-2 px-3 w-full text-sm font-medium text-center text-white bg-[var(--primary)] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-current flex justify-center items-center gap-3" target="_blank"
                            rel="noopener noreferrer">
                            <DownloadDocIcon />{locale == 'en' ? "Download" : "Unduh"}
                        </Link>
                        
                        {linkSee == null ? "" : <Link target='_blank' href={linkSee} className="py-2 px-3 w-full text-sm font-medium text-center text-white bg-[var(--primary)] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-current flex justify-center items-center gap-3">
                            <EyeIcon />{locale == 'en' ? "See Online" : "Pertinjau"}
                        </Link>}

                    </div>
                </div>
            </div>
        </div>
    )
}
