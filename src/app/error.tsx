"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Something went wrong</h1>
      <p style={{ color: '#666' }}>{error?.message ?? 'Unknown error'}</p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: 12,
          padding: '6px 12px',
          border: '1px solid #ddd',
          borderRadius: 6,
          background: '#fafafa',
        }}
      >
        Try again
      </button>
    </div>
  )
}

