'use client'

import { Input } from '@/components/ui/input'
import type { ShippingInfo } from '@/types/checkout'

interface ShippingFormProps {
  shippingInfo: ShippingInfo
  setShippingInfo: (info: ShippingInfo) => void
  errors: Partial<ShippingInfo>
}

export default function ShippingForm({
  shippingInfo,
  setShippingInfo,
  errors,
}: ShippingFormProps) {
  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo({ ...shippingInfo, [field]: value })
  }

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-lg font-medium uppercase tracking-wide mb-6">
        Shipping Information
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <Input
            id="fullName"
            type="text"
            value={shippingInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <Input
              id="email"
              type="email"
              value={shippingInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone *
            </label>
            <Input
              id="phone"
              type="tel"
              value={shippingInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Address *
          </label>
          <Input
            id="address"
            type="text"
            value={shippingInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className={errors.address ? 'border-red-500' : ''}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              City *
            </label>
            <Input
              id="city"
              type="text"
              value={shippingInfo.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-2">
              State / Province *
            </label>
            <Input
              id="state"
              type="text"
              value={shippingInfo.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className={errors.state ? 'border-red-500' : ''}
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
              ZIP / Postal Code *
            </label>
            <Input
              id="zipCode"
              type="text"
              value={shippingInfo.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              className={errors.zipCode ? 'border-red-500' : ''}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
            )}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              Country *
            </label>
            <Input
              id="country"
              type="text"
              value={shippingInfo.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className={errors.country ? 'border-red-500' : ''}
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
