import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Header } from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20">
        <Component {...pageProps} />
      </div>
    </div>
  )
}
export default MyApp
