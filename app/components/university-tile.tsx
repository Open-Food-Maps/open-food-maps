import Link from 'next/link'

interface ImageBoxProps {
  src: string
  alt: string
  className?: string
}

export default function UniversityTile({ src, className = "" }: ImageBoxProps) {
  return (
    <div className={`theme-color bg-theme-back-sec aspect-square w-full p-4 rounded-2xl flex items-center justify-center ${className}`}>
      <img
        src={src}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
