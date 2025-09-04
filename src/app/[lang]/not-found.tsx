import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { baseOptions } from '@/app/layout.config'
import { i18n } from '@/lib/i18n'

export default function NotFound() {
  // Wrap with the global HomeLayout so the navbar shows on 404 pages.
  // Using the default language for nav labels/links.
  const locale = i18n.defaultLanguage

  return (
    <HomeLayout {...baseOptions(locale)}>
      <section className="mx-auto w-full max-w-fd-container px-4 py-16 text-center">
        <h1 className="mb-2 text-2xl font-semibold">Page not found</h1>
        <p className="text-fd-muted-foreground">The page you are looking for does not exist.</p>
      </section>
    </HomeLayout>
  )
}
