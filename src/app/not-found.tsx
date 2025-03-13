'use client';

import Image from "next/image";

export default function NotFound() {
  return (
    <html>
      <body className='text-center' style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{marginTop: '10rem'}}>
        <Image src='/notFound.png' alt="notFound" width={320} height={250}/>
        <h1 style={{textAlign: 'center', fontFamily: ''}}>Page Not Found!</h1>
        </div>
      </body>
    </html>
  );
}