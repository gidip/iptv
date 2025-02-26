export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">IPTV App Setup</h1>
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xl mb-4">Database connection status can be checked at:</p>
        <code className="bg-gray-100 p-2 rounded">/api/test-db</code>
      </div>
    </main>
  )
}

