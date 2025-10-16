import { MapPin } from 'lucide-react';
import { Clock4 } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';

interface CardProps {
  photo?: string
  title: string
  body?: string
  time: string
  location: string
  price: string
  className?: string
}

export default function Card({ 
  photo,
  title,
  body,
  time,
  location,
  price,
  className = ""
}: CardProps) {
  return (
    <div className={`flex flex-row theme-color bg-theme-back-sec rounded-3xl p-4 gap-4 ${className}`}>
    
      {/* Photo or Map placeholder */}
       <div className="w-24 h-40 bg-theme-back rounded-xl flex items-center justify-center flex-shrink-0">
        {photo ? (
          <img src={photo} alt={title} className="w-full h-full object-cover rounded-lg"/>
        ) : (
          <div className="theme-fore w-fit h-fit object-cover rounded-lg ">Map</div>
        )}
      </div>
      
      <div className="flex flex-col gap-2 min-w-0">

         {/* Title */}
         <h3 className="text-lg font-semibold overflow-hidden mobile-line-clamp" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{title}</h3>

        {/* Map */}
        <a className="text-sm flex items-center gap-1 text-theme-fore-75 w-full min-w-0" href={`https://www.google.com/maps/search/?api=1&query=${location.replace(/\s+/g, '+')}`} target="_blank" rel="noopener noreferrer">
            <MapPin size={16} className="flex-shrink-0"/>
            <span className="truncate min-w-0">{location}</span>
        </a>

        <div className="flex flex-col mobile mobile-gap gap-4 text-theme-fore-50 items-center w-full min-w-0">
            {/* Time */}
            <a className="flex flex-row gap-1 items-center text-sm">
                <Clock4 size={16}/>
                {time}
            </a>

             {/* Price */}
             <a className="flex flex-row gap-1 items-center text-sm">
                 <CircleDollarSign size={16}/>
                 {price || "FREE"}
             </a>
        </div>

         {/* Body (optional) */}
         {body && (
             <p className="text-theme-fore text-sm mt-2 mobile-no-mt overflow-hidden mobile-line-clamp" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>{body}</p>
         )}
      </div>
    </div>
  )
}
