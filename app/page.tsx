import Logo from './components/logo'
import UniversityTile from './components/university-tile'

export default function Home() {
  return (
    <main className="theme-color bg-theme-back text-theme-fore flex min-h-screen flex-col items-center p-8 gap-8">
      <Logo position="center" maxSize={150} />
      <div className="flex flex-col w-full items-center gap-2">
        <h1 className="self-start head text-2xl">select a campus:</h1>
        <div className="grid grid-cols-2 gap-6 w-full">
          <UniversityTile src="/unis/umich-white.svg" alt="University of Michigan" href="/umich" />
          <UniversityTile src="/unis/mcgill.svg" alt="McGill University" href="/mcgill" />
        </div>
      </div>
    </main>
  )
}
