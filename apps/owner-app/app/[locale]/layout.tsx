import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React, {useMemo} from 'react';
import { AuthProvider } from '@/lib/auth-context';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }, { locale: 'uz' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const queryClient = useMemo(() => new QueryClient(), []);
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <AuthProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
      </NextIntlClientProvider>
    </AuthProvider>
  );
}
