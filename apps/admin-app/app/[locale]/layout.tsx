import type React from "react"
import {notFound} from "next/navigation"
import {AuthProvider} from "@/lib/auth"
import {NextIntlClientProvider} from "next-intl";
import {ProtectedLayout} from "@/app/[locale]/protectedLayout";

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
    <AuthProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ProtectedLayout>{children}</ProtectedLayout>
      </NextIntlClientProvider>
    </AuthProvider>
  )
}
