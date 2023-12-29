import '@/styles/globals.css'
import '@mantine/core/styles.css';

import type { AppProps } from 'next/app'
import 'modern-css-reset/dist/reset.min.css'
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}