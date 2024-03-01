import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  // Check if MONGODB_URI is present
    if (process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI is missing in the environment variables or has an invalid value.');
      
    }

  return <Component {...pageProps} />
}
