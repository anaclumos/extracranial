"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

type HwaljaMap = Record<string, Record<string, string>>

const HWALJA_RAW_URL =
  "https://raw.githubusercontent.com/anaclumos/hwalja/refs/heads/main/%ED%95%9C%EA%B8%80.min.json"

function typeNext(
  prev: string,
  map: HwaljaMap,
  key: string,
  editing: boolean,
): string {
  const lastOne = prev.slice(-1)
  const lastTwo = prev.slice(-2)
  const bucket = map[key]
  if (!bucket) return prev
  if (editing && lastTwo in bucket) return prev.slice(0, -2) + bucket[lastTwo]
  if (editing && lastOne in bucket) return prev.slice(0, -1) + bucket[lastOne]
  return prev + (bucket[""] ?? "")
}

function ipsum(): string {
  const ipsums = [
    "하늘을 우러러",
    "한 점 부끄럼이 없기를",
    "잎새에 이는 바람에도",
    "별을 노래하는 마음으로",
    "별이 바람에 스치운다",
  ]
  return ipsums[Math.floor(Math.random() * ipsums.length)]
}

export default function HwaljaDemo() {
  const [map, setMap] = useState<HwaljaMap | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [value, setValue] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setValue(ipsum())
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch(HWALJA_RAW_URL, { cache: "force-cache" })
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const parsed = await res.json()
        if (!cancelled) setMap(parsed)
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Unknown error")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const disabled = loading || !!error || !map

  const onKey = (key: string) => {
    if (!map) return
    setValue((prev) => typeNext(prev, map, key, editing))
    setEditing(true)
  }

  const keys = useMemo(
    () => [
      { label: "ㅣ", key: "인" },
      { label: "ᆞ", key: "천" },
      { label: "ㅡ", key: "지" },
      { label: "ㄱㅋ", key: "ㄱㅋ" },
      { label: "ㄴㄹ", key: "ㄴㄹ" },
      { label: "ㄷㅌ", key: "ㄷㅌ" },
      { label: "ㅂㅍ", key: "ㅂㅍ" },
      { label: "ㅅㅎ", key: "ㅅㅎ" },
      { label: "ㅈㅊ", key: "ㅈㅊ" },
    ],
    [],
  )

  return (
    <div className="w-full">
      <div className="mx-auto max-w-xl space-y-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          {loading && <p className="text-sm text-muted-foreground">활자 맵을 불러오는 중…</p>}
          {error && (
            <p className="text-sm text-destructive">불러오기 실패: {error}</p>
          )}
          {!loading && !error && <p className="whitespace-pre-wrap break-words text-lg">{value}</p>}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {keys.map((k) => (
            <Button
              key={k.key}
              variant="outline"
              disabled={disabled}
              onClick={() => onKey(k.key)}
              className="py-6 text-lg"
            >
              {k.label}
            </Button>
          ))}

          <Button
            variant="outline"
            disabled={disabled}
            onClick={() => {
              setValue((s) => s.slice(0, -1))
              setEditing(false)
            }}
            className="py-6 text-lg"
            aria-label="지우기"
          >
            ← 지우기
          </Button>


          <Button
              variant="outline"
              disabled={disabled}
              onClick={() => onKey("ㅇㅁ")}
              className="py-6 text-lg"
            >
             ㅇㅁ
            </Button>

          <Button
            variant="outline"
            disabled={loading || !!error}
            onClick={() => {
              if (editing) setEditing(false)
              else setValue((s) => s + " ")
            }}
            className="py-6 text-lg"
            aria-label="띄어쓰기/확정"
          >
            띄어쓰기/확정
          </Button>
        </div>
      </div>
    </div>
  )
}

