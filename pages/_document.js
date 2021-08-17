import Document, { Html, Head, Main, NextScript } from 'next/document'
const APP_NAME = 'APP_NAME'

class MyDocument extends Document {

    render() {


        return (
            <Html lang="zxx">
                <Head>
                    <link rel="icon" type="image/png" href="/images/favicon.png"></link>
                    <meta name='application-name' content={APP_NAME} />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content={APP_NAME} />
                    <meta name='theme-color' content='#FFFFFF' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='shortcut icon' href='/images/favicon.png' />
                </Head>
                <body>
                    <Main />
                    <NextScript />

                </body>
            </Html>
        )
    }
}

export default MyDocument;