import Link from 'next/link'
import { t } from '@/lib/messages'

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params

  return (
    <main className="mx-auto flex w-full max-w-fd-container flex-1 flex-col justify-center px-4 py-12 text-center">
      <h1 className="mb-4 text-2xl font-bold">{t(lang, 'home.title')}</h1>
      <p className="text-fd-muted-foreground">
        {t(lang, 'home.cta.before')}
        <Link href="/r/000000" className="text-fd-foreground font-semibold underline">
          /r/000000
        </Link>{' '}
        {t(lang, 'home.cta.after')}
      </p>
    </main>
  )
}
