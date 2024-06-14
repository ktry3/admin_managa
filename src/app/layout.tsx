import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.scss';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Provider from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RGIS',
  description: 'NGO Organization',
};

export default function RootLayout({ children, session }: { children: ReactNode; session: any }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider session={session}>
          <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
