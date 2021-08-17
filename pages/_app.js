import '@/styles/globals.css'
import Layout from '@/Components/_App/Layout'
import axios from 'axios'
import { parseCookies, destroyCookie } from 'nookies'
import { redirectUser } from '@/utils/auth'
import baseUrl from '@/utils/baseUrl'
import { ReduxProvider } from 'store'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ReduxProvider>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  if (!token) {
    // if a user not logged in then user can't access those pages
    const isProtectedRoute = ctx.pathname === '/some-path'

    if (isProtectedRoute) {
      redirectUser(ctx, '/authentication');
    }
  } else {
    // if a user logged in then user can't access those pages
    const ifLoggedIn = ctx.pathname === '/authentication'
      || ctx.pathname === '/reset-password'
    if (ifLoggedIn) {
      redirectUser(ctx, '/')
    }
    try {
      const payload = { headers: { Authorization: token } }
      const url = `${baseUrl}/api/v1/auth/account`
      const response = await axios.get(url, payload)
      const user = response.data

      // If user status disabled then user autometically logged out
      if (!user || !user.active) {
        destroyCookie(ctx, "token")
      }

      pageProps.user = user
    } catch (error) {
      // console.error("Error getting current user", error);
      //invalid token
      // console.log(error)
      destroyCookie(ctx, "token");
    }
  }

  return {
    pageProps
  }
}
export default MyApp
