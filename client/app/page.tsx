"use client"

import PageWrapper from "@/components/animations"
import { Footer } from "@/components/footer"
import Header from "@/components/nav-header"
import { Box } from "@chakra-ui/react"
import { useEffect } from "react"

export default function Home() {
  // Cold start time is slow, so i wake up server ASAP
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
      } catch (error) {
        console.error('Error waking up server:', error);
      }
    };

    wakeUpServer();
}, []); 

  return (
    <PageWrapper>
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Box h={'100%'} w={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} pb={5}>
        <Header path="/"/>
      </Box>
      <Footer />
    </main>
    </PageWrapper>
  )
}
