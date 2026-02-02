import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import appCss from '@/styles/global.scss?url';
import NotFound from '@/components/base/Notfound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ABOUT } from '@/const/about';
import ogp from '@/assets/opengraph-image.png';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: "SatooRu's Profile" },
      { name: 'description', content: ABOUT.join('') },
      // Open Graph
      { property: 'og:title', content: "SatooRu's Profile" },
      { property: 'og:description', content: ABOUT.join('') },
      { property: 'og:image', content: ogp },
      { property: 'og:type', content: 'website' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: "SatooRu's Profile" },
      { name: 'twitter:description', content: ABOUT.join('') },
      { name: 'twitter:image', content: ogp },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => <NotFound />,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}
