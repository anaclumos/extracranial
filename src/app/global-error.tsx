"use client"

import type { Metadata } from "next"
import NextError from "next/error"

export const metadata: Metadata = {
  title: "Error",
}

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <html lang="en">
      <body>
        <NextError statusCode={undefined as never} />
      </body>
    </html>
  )
}
