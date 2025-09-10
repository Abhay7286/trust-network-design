import React from 'react';
import { ViteSSG } from 'vite-ssg';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import App from './App';

export const createApp = ViteSSG(
  () => (
    <HelmetProvider>
      <Helmet>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="./favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Primary Meta Tags */}
        <title>CyberDirectory | Explore Top Cybersecurity Tools & Resources</title>
        <meta
          name="description"
          content="CyberDirectory is the ultimate hub to discover and compare leading cybersecurity tools, resources, and services. Stay secure with expertly curated infosec solutions."
        />
        <meta
          name="keywords"
          content="CyberDirectory, cybersecurity tools, infosec directory, penetration testing tools, ethical hacking, cyber defense, OSINT, Google dorks, security resources"
        />
        <meta name="author" content="CyberDirectory Team" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.cyberdirectory.app/" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="CyberDirectory | Explore Top Cybersecurity Tools & Resources" />
        <meta
          property="og:description"
          content="Discover, explore, and compare the best cybersecurity tools on CyberDirectory. Your trusted source for infosec solutions and resources."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.cyberdirectory.app/" />
        <meta property="og:image" content="https://www.cyberdirectory.app/og-image.png" />
        <meta property="og:image:alt" content="CyberDirectory logo and tool showcase" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CyberDirectory" />
        <meta name="twitter:creator" content="@CyberDirectory" />
        <meta name="twitter:title" content="CyberDirectory | Explore Top Cybersecurity Tools & Resources" />
        <meta
          name="twitter:description"
          content="Stay ahead of cyber threats with CyberDirectory. Explore curated cybersecurity tools, ethical hacking resources, and more."
        />
        <meta name="twitter:image" content="https://www.cyberdirectory.app/twitter-image.png" />
        <meta name="twitter:image:alt" content="CyberDirectory logo and cybersecurity tools" />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CyberDirectory",
            "url": "https://www.cyberdirectory.app",
            "description": "CyberDirectory is a curated directory of the best cybersecurity tools, resources, and services.",
            "publisher": {
              "@type": "Organization",
              "name": "CyberDirectory",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.cyberdirectory.app/favicon.png"
              }
            }
          }
        `}</script>

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HX0V83HYTT"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HX0V83HYTT');
        `}</script>
      </Helmet>
      <App />
    </HelmetProvider>
  ),
  {} // Add empty router options as the second argument
);
