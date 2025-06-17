import {NextIntlClientProvider} from "next-intl"
import {notFound} from "next/navigation"
import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import { useMemo } from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

export function generateStaticParams() {
  return [{locale: "en"}, {locale: "ru"}, {locale: "uz"}]
}

export default async function LocaleLayout({
                                             children,
                                             params,
                                           }: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const {locale} = await params;
  const queryClient = useMemo(() => new QueryClient(), []);

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow">
            {children}
          </main>
          <Footer/>
        </div>
      </QueryClientProvider>
    </NextIntlClientProvider>
  )
}
