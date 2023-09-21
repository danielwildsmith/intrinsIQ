"use client"

import PageWrapper from "@/components/animations"
import { Footer } from "@/components/footer"
import { HomeHeader } from "@/components/nav-header"
import { Box, Text } from "@chakra-ui/react"

// Development URL: http://127.0.0.1:5000
// Production URL: https://shellhacks-2023-server.onrender.com
export const serverHost = 'https://shellhacks-2023-server.onrender.com'

export default function Home() {
  return (
    <PageWrapper>
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Box h={'100%'} w={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} pb={5}>
        <HomeHeader path="/"/>
      </Box>
      {/* Spacer will take up all available space, pushing the footer to the bottom */}
      {/* This Flex will act like a footer */}
      <Footer />
    </main>
    </PageWrapper>
  )
}
