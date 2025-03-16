"use client"

import Image from "next/image"
import Link from "next/link"
import { WhatsappIcon } from "@/components/icons"
import { useState, useEffect } from "react"
import Loader from "@/components/fullPageLoader"

export default function CheckoutPage() {
  const [loading, setLoading] = useState(true)
  const [payMethod, setPayMethod] = useState(1)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader message="جاري تحميل بيانات الدفع..." />
  }

  return (
    <div className="min-h-screen bg-gray-100 rtl">
      {/* Header */}
      <header className="bg-blue-600 text-white p-3 flex items-center justify-between">
        <button className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
        <div className="flex items-center">
          <Image
            src="/white_logo.png"
            alt="الخيرية الكويتية"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </div>
      </header>

      <main className="container mx-auto p-4 max-w-lg">
        {/* Breadcrumb */}
        <div className="text-gray-500 mb-4 text-sm">
          <Link href="/" className="hover:text-blue-600">
            الرئيسية
          </Link>{" "}
          {" > "}
          <span>بيانات الدفع</span>
        </div>

        {/* Donation Cart */}
        <div className="bg-white rounded-lg overflow-hidden shadow mb-4">
          <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
            <h2 className="font-bold">سلة التبرع</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>

          {/* Cart Items Table */}
          <div className="p-4">
            <div className="flex justify-between border-b pb-2 mb-2 font-bold">
              <div className="w-1/2 text-right">اسم المشروع</div>
              <div className="w-1/2 text-right">المبلغ</div>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center">
                <button className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="text-gray-800">KD 10</span>
              </div>
              <div className="text-right">1- إفطار صائم - غزة</div>
            </div>

            <div className="flex justify-between bg-gray-200 p-2 mt-2 font-bold">
              <div>KD 10</div>
              <div>الإجمالي</div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-2 mb-4">
          <Link href="#" className="bg-blue-600 text-white p-3 rounded flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform rotate-180"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-bold">فاعل خير</span>
          </Link>

          <Link href="#" className="bg-blue-600 text-white p-3 rounded flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform rotate-180"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-bold">تبرع سابق</span>
          </Link>

          <Link href="#" className="bg-blue-600 text-white p-3 rounded flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform rotate-180"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-bold">تبرع جديد</span>
          </Link>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-4">
             

            <label className="flex items-center">
              <input type="radio" name="payment" className="ml-2" onChange={()=>setPayMethod(1)} checked={payMethod===1}/>
              <Image
                src="/py.png"
                alt="Apple Pay"
                width={50}
                height={30}
                className="h-8 w-auto"
              />
            </label>

            <label className="flex items-center">
              <input type="radio" name="payment" className="ml-2" onChange={()=>setPayMethod(2)} checked={payMethod===2}/>
              <Image
                src="/vaa.png"
                alt="Visa/Mastercard"
                width={50}
                height={30}
                className="h-8 w-auto"
              />
            </label>

            <label className="flex items-center">
              <input type="radio" name="payment" className="ml-2" onChange={()=>setPayMethod(3)} checked={payMethod===3} />
              <Image
                src="/kv.png"
                alt="K-NET"
                width={50}
                height={30}
                className="h-8 w-auto"
              />
            </label>
          </div>

          <Link href={payMethod===3?'/knet':'/checkout'}><button  className="w-full bg-pink-600 text-white py-3 rounded-md font-bold text-lg">إتمام التبرع</button></Link>
        </div>

        {/* Footer */}
        <footer className="bg-blue-600 text-white p-6 rounded-lg text-center relative">
          <img
            src="/white_logo.png"
            alt="الحياة الخيرية"
            width={120}
            height={80}
            className="mx-auto mb-2"
          />
          <div className="text-lg font-bold">الحياة الخيرية</div>
          <div className="text-sm">Alhyat Charity</div>
          <div className="text-sm mt-2">تبرعكم الروابط</div>

          {/* WhatsApp button */}
          <div className="absolute bottom-4 left-4 bg-green-500 rounded-full p-2">
            <WhatsappIcon />
          </div>
        </footer>
      </main>
    </div>
  )
}

