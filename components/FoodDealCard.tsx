import React from 'react'
import Card from '../app/components/card'
import { Decimal } from '@prisma/client/runtime/library'

interface FoodDeal {
  id: string
  createdAt: Date
  title: string
  place: string
  timeStart: Date
  timeEnd: Date
  priceStart: Decimal | null
  priceEnd: Decimal | null
  description: string | null
  reports: number
  universityId: string
}

interface FoodDealCardProps {
  deal: FoodDeal
  className?: string
}

export default function FoodDealCard({ deal, className = "" }: FoodDealCardProps) {
  const formatPrice = () => {
    if (deal.priceStart && deal.priceEnd) {
      return `$${deal.priceStart.toString()} - $${deal.priceEnd.toString()}`
    } else if (deal.priceStart) {
      return `$${deal.priceStart.toString()}`
    }
    return 'Price varies'
  }

  const formatTime = () => {
    return `${deal.timeStart.toLocaleTimeString()} - ${deal.timeEnd.toLocaleTimeString()}`
  }

  return (
    <div className={`w-full max-w-lg ${className}`}>
      <Card
        title={deal.title}
        body={deal.description || ''}
        time={formatTime()}
        location={deal.place}
        price={formatPrice()}
      />
    </div>
  )
}
