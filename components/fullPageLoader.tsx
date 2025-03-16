"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LoaderProps {
  showLogo?: boolean
  message?: string
}

export default function Loader({ showLogo = true, message = "جاري التحميل..." }: LoaderProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Optional: Auto-hide loader after a certain time (for demo purposes)
    // In a real app, you'd control this based on your data loading state
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center transition-opacity duration-300">
      <div className="flex flex-col items-center justify-center p-8 max-w-md">
        {showLogo && (
          <div className="mb-8 relative">
            <Image
              src="/placeholder.svg?height=80&width=120"
              alt="الحياة الخيرية"
              width={120}
              height={80}
              className="mx-auto"
            />
            <div className="absolute -bottom-4 w-full text-center text-blue-600 font-bold">الحياة الخيرية</div>
          </div>
        )}

        <div className="relative w-64 h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full animate-progress"></div>
        </div>

        <div className="flex items-center justify-center mb-2">
          <div className="loader-dots flex space-x-2 rtl:space-x-reverse">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-bounce1"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce2"></div>
            <div className="w-3 h-3 rounded-full bg-red-600 animate-bounce3"></div>
          </div>
        </div>

        <p className="text-gray-600 text-center font-medium">{message}</p>
      </div>
    </div>
  )
}

