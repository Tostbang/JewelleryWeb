"use client"
import React, { useEffect, useState } from 'react'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useReturnCheckout } from '../_services/mutations'


export default function CallBackCard({ token }: { token: string | undefined }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const { data } = useReturnCheckout(token)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (data) {
      console.log('the data', data)
      if (data.code === '200') {
        setStatus('success')
        setMessage(data.message || 'Ödeme başarıyla tamamlandı!')
      } else {
        setStatus('error')
        setMessage(data.errors?.[0] || 'Ödeme işlemi başarısız')
      }
    }
  }, [data])

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <>
              <div className="mx-auto mb-4">
                <Loader2 className="size-16 animate-spin text-mainColor" />
              </div>
              <CardTitle>Ödeme Doğrulanıyor</CardTitle>
              <CardDescription>
                Lütfen bekleyin, ödemeniz kontrol ediliyor...
              </CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto mb-4">
                <CheckCircle2 className="size-16 text-green-600" />
              </div>
              <CardTitle className="text-green-700">Ödeme Başarılı!</CardTitle>
              <CardDescription className="text-gray-700">
                {message}
              </CardDescription>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto mb-4">
                <XCircle className="size-16 text-red-600" />
              </div>
              <CardTitle className="text-red-700">Ödeme Başarısız</CardTitle>
              <CardDescription className="text-gray-700">
                {message}
              </CardDescription>
            </>
          )}
        </CardHeader>

        {status !== 'loading' && (
          <CardContent className="space-y-3">
            <Link href="/dash/dashboard/manager" className="block">
              <Button className="w-full bg-mainColor hover:bg-mainColorLight">
                Dashboard&apos;a Dön
              </Button>
            </Link>
            {status === 'error' && (
              <Link href="/dash/packages" className="block">
                <Button variant="outline" className="w-full">
                  Paketlere Geri Dön
                </Button>
              </Link>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}