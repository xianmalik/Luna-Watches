'use client'

import type { LucideIcon } from 'lucide-react'
import { Banknote, Wallet } from 'lucide-react'
import { BANK_TRANSFER_DETAILS, PAYMENT_METHODS } from '@/lib/app.settings'
import type { PaymentMethodType } from '@/types/checkout'

const METHOD_ICONS: Record<string, LucideIcon> = { Wallet, Banknote }

interface PaymentMethodProps {
  selectedMethod: PaymentMethodType
  setSelectedMethod: (method: PaymentMethodType) => void
}

export default function PaymentMethod({
  selectedMethod,
  setSelectedMethod,
}: PaymentMethodProps) {
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-lg font-medium uppercase tracking-wide mb-6">
        Payment Method
      </h2>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const Icon = METHOD_ICONS[method.icon]
          const isSelected = selectedMethod === method.id

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full text-left border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-black bg-neutral-50'
                  : 'border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-black' : 'border-neutral-300'
                  }`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-black" />
                  )}
                </div>
                {Icon && <Icon className="h-5 w-5" />}
                <div className="flex-1">
                  <div className="font-medium">{method.label}</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {method.description}
                  </div>
                </div>
              </div>

              {isSelected && method.id === 'bank' && (
                <div className="mt-4 pt-4 border-t text-sm text-neutral-600 space-y-2">
                  <p className="font-medium">Bank Details:</p>
                  <div className="bg-neutral-50 p-3 rounded space-y-1 text-xs">
                    <p>
                      <span className="font-medium">Bank:</span>{' '}
                      {BANK_TRANSFER_DETAILS.bank}
                    </p>
                    <p>
                      <span className="font-medium">Account Name:</span>{' '}
                      {BANK_TRANSFER_DETAILS.accountName}
                    </p>
                    <p>
                      <span className="font-medium">Account Number:</span>{' '}
                      {BANK_TRANSFER_DETAILS.accountNumber}
                    </p>
                    <p>
                      <span className="font-medium">SWIFT Code:</span>{' '}
                      {BANK_TRANSFER_DETAILS.swiftCode}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    Please use your order number as reference when making the
                    transfer.
                  </p>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
