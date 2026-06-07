export const metadata = {
  title: 'BuildersMarket Portal',
  description: 'Global Procurement Matrix',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f9fafb' }}>
        {children}
      </body>
    </html>
  )
}
