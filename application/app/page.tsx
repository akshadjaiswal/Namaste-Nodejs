export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-20 border-b border-black pb-12">
          <div className="mb-4">
            <span className="text-xs font-light tracking-widest uppercase text-gray-600">
              Generated with DevStart CLI
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-black mb-6">
            application
          </h1>
          <p className="text-xl font-light text-gray-600 max-w-2xl">
            Production-ready application scaffolded in 30 seconds
          </p>
        </header>

        {/* Tech Stack */}
        <section className="mb-20">
          <h2 className="text-xs font-medium tracking-widest uppercase text-black mb-8 border-b border-gray-200 pb-3">
            Your Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 p-6 hover:border-black transition-colors">
              <div className="text-xs font-light text-gray-500 mb-2">Styling</div>
              <div className="font-light text-black">Tailwind CSS</div>
            </div>
            <div className="border border-gray-200 p-6 hover:border-black transition-colors">
              <div className="text-xs font-light text-gray-500 mb-2">UI Components</div>
              <div className="font-light text-black">shadcn/ui</div>
            </div>
            <div className="border border-gray-200 p-6 hover:border-black transition-colors">
              <div className="text-xs font-light text-gray-500 mb-2">State</div>
              <div className="font-light text-black">Zustand</div>
            </div>
            <div className="border border-gray-200 p-6 hover:border-black transition-colors">
              <div className="text-xs font-light text-gray-500 mb-2">Data Fetching</div>
              <div className="font-light text-black">TanStack Query</div>
            </div>
            
            
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-20 border border-black p-8">
          <h2 className="text-xs font-medium tracking-widest uppercase text-black mb-6">
            Quick Start
          </h2>
          <div className="space-y-4 font-light text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-1">01</span>
              <p>Edit <code className="bg-gray-50 border border-gray-200 px-2 py-1 text-sm font-mono text-black">app/page.tsx</code> to customize this page</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-1">02</span>
              <p>Configure environment variables in <code className="bg-gray-50 border border-gray-200 px-2 py-1 text-sm font-mono text-black">.env.local.example</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-400 mt-1">03</span>
              <p>Your integrations are ready to use in the <code className="bg-gray-50 border border-gray-200 px-2 py-1 text-sm font-mono text-black">lib/</code> folder</p>
            </div>
          </div>
        </section>

        {/* Footer / DevStart Promo */}
        <footer className="border-t border-gray-200 pt-12">
          <div className="mb-8">
            <p className="text-sm font-light text-gray-600 mb-6">
              This project was scaffolded in 30 seconds, saving you 2-4 hours of manual configuration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/akshadjaiswal/devstart"
                className="inline-block border border-black px-6 py-3 text-sm font-light hover:bg-black hover:text-white transition-colors text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                ★ Star on GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/devstart-cli"
                className="inline-block border border-gray-300 px-6 py-3 text-sm font-light hover:border-black transition-colors text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on npm
              </a>
            </div>
          </div>
          <div className="text-xs font-light text-gray-500">
            <code className="bg-gray-50 border border-gray-200 px-2 py-1 font-mono">npx devstart-cli init</code>
          </div>
        </footer>
      </div>
    </main>
  )
}
