import { AppProps } from "next/app";
import Script from "next/script";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Script
				strategy="afterInteractive"
				src="https://www.googletagmanager.com/gtag/js?id=G-1YZTCS0KYX"
			/>

			<Script
				id="google-analytics"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1YZTCS0KYX', {
          page_path: window.location.pathname,
          });
          `,
				}}
			/>
			<Component {...pageProps} />
		</>
	);
}
