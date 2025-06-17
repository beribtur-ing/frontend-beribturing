import React from "react"
import {notFound} from "next/navigation"
import {NextIntlClientProvider} from "next-intl";
import {ProtectedLayout} from "@/app/[locale]/protectedLayout";
import {Providers} from "@/components/providers";

export default async function AdminLayout({
                                            children,
                                            params,
                                          }: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {

  const {locale} = await params;
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
  return (
    <Providers>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ProtectedLayout>{children}</ProtectedLayout>
      </NextIntlClientProvider>
    </Providers>
  )
}
