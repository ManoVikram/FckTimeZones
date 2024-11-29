import React from 'react'
import { Roboto } from '@next/font/google'

export const metadata = {
    title: "Fck Time Zones",
    description: "Sync the World, Skip the Math. Convert time zones in a jiffy!"
}

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--font-roboto",
})

function RootLayout({ children }) {
    return (
        <html lang="en" className={roboto.className}>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout