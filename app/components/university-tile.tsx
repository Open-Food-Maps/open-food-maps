import Link from 'next/link'

interface ImageBoxProps {
  src: string
  alt: string
  href?: string
  className?: string
}

export default function UniversityTile({ src, alt, href, className = "" }: ImageBoxProps) {
  const content = (
    <div className={`theme-color bg-theme-back-sec aspect-square w-full p-4 rounded-2xl flex items-center justify-center hover:bg-theme-back-sec/80 transition-colors cursor-pointer ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
      />
    </div>
  )

  if (href) {
    return (
      <Link href={href}>
        {content}
      </Link>
    )
  }

  return content
}
