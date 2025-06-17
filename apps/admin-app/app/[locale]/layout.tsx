import React, {useMemo} from "react"
import {notFound} from "next/navigation"
import {AuthProvider} from "@/lib/auth"
import {NextIntlClientProvider} from "next-intl";
import {ProtectedLayout} from "@/app/[locale]/protectedLayout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default async function AdminLayout({
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
    <AuthProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <ProtectedLayout>{children}</ProtectedLayout>
        </QueryClientProvider>
      </NextIntlClientProvider>
    </AuthProvider>
  )
}
