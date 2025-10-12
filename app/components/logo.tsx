interface LogoProps {
  src?: string
  alt?: string
  position?: 'left' | 'center' | 'right'
  maxSize?: number
  className?: string
}

export default function Logo({ 
  src = "logos/logo-light.svg", 
  alt = "Logo",
  position = 'center',
  maxSize = 200,
  className = ""
}: LogoProps) {
  const positionClasses = {
    left: 'justify-start',
    center: 'justify-center', 
    right: 'justify-end'
  }

  return (
    <div className={`flex w-full ${positionClasses[position]} ${className}`}>
      <img 
        src={src}
        alt={alt}
        className="object-contain"
        style={{ maxWidth: `${maxSize}px`, maxHeight: `${maxSize}px` }}
      />
    </div>
  )
}
