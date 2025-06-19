import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';
import { LocaleProvider } from '../contexts/locale-context';

export function LocalizedLayout() {
  return (
    <LocaleProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}