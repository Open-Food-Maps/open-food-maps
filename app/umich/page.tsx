import React from 'react'
import Logo from '../components/logo'
import Card from '../components/card'

export default function UMichPage() {
  return (
    <main className="bg-theme-back text-theme-fore flex min-h-screen flex-col items-center p-8 gap-8">

        {/* OFM Logo + UMich Logo */}
        <div className="flex flex-row w-full">
            <Logo position="left" maxSize={150} />
            <img src="/unis/umich-white.svg" alt="University of Michigan" className="max-w-[50px] h-auto" />
        </div>
        
        {/* Cards */}
        <div className="flex flex-col w-full items-center gap-4">
        
            {/* Test Card */}
            <div className="w-full max-w-lg">
                <Card
                    title="South Quad Dining Hall"
                    body="A popular dining hall with diverse food options including international cuisine, vegetarian choices, and traditional American meals."
                    time="7:00 - 22:00"
                    location="South Quad, 600 E University Ave"
                    price="$12.50"
                />
            </div>
        </div>
    </main>
  )
}
