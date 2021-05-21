# Building a single page application with Next.js and React Router

```tsx
// pages/_app.tsx

import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning> // <- ADD THIS
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}

export default App;
```

3. Rewrite all routes to the homepage

```tsx
// next.config.js

module.exports = {
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: "/app/:path*",
        destination: "/app",
      },
    ];
  },
};
```
