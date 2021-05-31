import Head from 'next/head';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';
import '../styles/nprogress.css';
import { toastOptions } from '../utils/toaster';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>DoneWithIt: The Morocco's Marketplace</title>
      </Head>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={toastOptions}
      />
      <Component {...pageProps} />
    </>
  );
}
