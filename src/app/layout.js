export const metadata = {
  title: 'BuildersMarket',
  description: 'Cross-Border Procurement Portal',
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
