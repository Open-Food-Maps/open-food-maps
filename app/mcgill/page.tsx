import Logo from '../components/logo'

export default function McGillPage() {
  return (
    <main className="theme-color bg-theme-back text-theme-fore flex min-h-screen flex-col items-center p-8 gap-8">
      <Logo position="center" maxSize={150} />
      <div className="flex flex-col w-full items-center gap-4">
        <h1 className="head text-3xl">McGill University</h1>
        <p className="text-center text-lg">Welcome to McGill University's food map!</p>
        {/* Add more content here as needed */}
      </div>
    </main>
  )
}
