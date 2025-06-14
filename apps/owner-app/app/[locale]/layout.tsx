import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type React from 'react';
import { AuthProvider } from '@/lib/auth-context';

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
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <AuthProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </AuthProvider>
  );
}
