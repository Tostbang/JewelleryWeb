"use client"
import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutFormHtml: string | null;
}

export function PaymentModal({ open, onOpenChange, checkoutFormHtml }: PaymentModalProps) {
  // useEffect(() => {
  //   if (checkoutFormHtml && open) {
  //     // Inject the checkout form HTML
  //     const container = document.getElementById('iyzipay-checkout-form')
  //     if (container) {
  //       container.innerHTML = checkoutFormHtml

  //       // Execute any scripts in the HTML
  //       const scripts = container.getElementsByTagName('script')
  //       for (let i = 0; i < scripts.length; i++) {
  //         const script = scripts[i]
  //         const newScript = document.createElement('script')
  //         if (script.src) {
  //           newScript.src = script.src
  //         } else {
  //           newScript.textContent = script.textContent
  //         }
  //         document.body.appendChild(newScript)
  //       }
  //     }
  //   }
  // }, [checkoutFormHtml, open])
  useEffect(() => {
    if (checkoutFormHtml && open) {
      const iziycoScript = checkoutFormHtml.replace(/<script[^>]*>|<\/script>/gi, '');

      const runScript = `
          ${iziycoScript}
          setTimeout(() => {
            iyziInit = undefined;
          }, 1001);
          `;

      const script = document.createElement('script');
      script.id = 'iziyco-script' + Math.random().toString(36).substring(7);
      script.type = 'text/javascript';
      script.innerHTML = runScript;
      document.body.appendChild(script);
    }
  }, [checkoutFormHtml, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ödeme İşlemi</DialogTitle>
          <DialogDescription>
            Güvenli ödeme sayfasında işleminizi tamamlayın
          </DialogDescription>
        </DialogHeader>

        {checkoutFormHtml ? (
          <div id="iyzipay-checkout-form" className="min-h-[500px]" />
        ) : (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-mainColor" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}