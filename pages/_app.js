import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import OrderState from '../context/OrderState'
import '../styles/index.css'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  )
}

export default MyApp;
