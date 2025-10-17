import React from 'react'
import { notFound } from 'next/navigation'
import Logo from '../components/logo'
import FoodDealCard from '@/components/FoodDealCard'
import { getUniversityBySlug } from './action'

interface UniversityPageProps {
  params: {
    slug: string
  }
}

export default async function UniversityPage({ params }: UniversityPageProps) {
  const { slug } = await params

  // Fetch university and its food deals using server action
  const university = await getUniversityBySlug(slug)

  if (!university) {
    // For now, show a placeholder page instead of 404
    // This allows the dynamic route to work even without database
    return (
      <main className="bg-theme-back text-theme-fore flex min-h-screen flex-col items-center p-8 gap-8">
        {/* OFM Logo */}
        <div className="flex flex-row w-full">
          <Logo position="left" maxSize={150} />
        </div>
        
        {/* Placeholder Content */}
        <div className="flex flex-col w-full items-center gap-4">
          <h1 className="head text-3xl">University: {slug}</h1>
          <p className="text-center text-lg">Database not connected. Please set up your database to view food deals.</p>
          <div className="text-center text-gray-500">
            <p>No food deals available - database connection required.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-theme-back text-theme-fore flex min-h-screen flex-col items-center p-8 gap-8">
      {/* OFM Logo + University Logo */}
      <div className="flex flex-row w-full">
        <Logo position="left" maxSize={150} />
        {/* You can add university logo here if you have one */}
      </div>
      
      {/* University Header */}
      <div className="flex flex-col w-full items-center gap-4">
        <h1 className="head text-3xl">{university.name}</h1>
        <p className="text-center text-lg">Welcome to {university.name}'s food map!</p>
      </div>
      
      {/* Food Deals Cards */}
      <div className="flex flex-col w-full items-center gap-4">
        {university.foodDeals.length > 0 ? (
          university.foodDeals.map((deal: any) => (
            <FoodDealCard key={deal.id} deal={deal} />
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No food deals available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  )
}

// Generate static params for known universities
export async function generateStaticParams() {
  try {
    const { getAllUniversitySlugs } = await import('./action')
    return await getAllUniversitySlugs()
  } catch (error) {
    console.warn('Database not available during build time, falling back to empty params:', error)
    // Return empty array to allow dynamic rendering
    return []
  }
}
