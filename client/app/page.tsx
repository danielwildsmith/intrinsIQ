"use client"

import PageWrapper from "@/components/animations"
import { Footer } from "@/components/footer"
import Header from "@/components/nav-header"
import { Box, Flex } from "@chakra-ui/react"
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
      <main className="flex flex-col min-h-screen">
        <Header path="/" />
        {/* This Flex grows to push the footer down */}
        <Flex flex="1" direction="column" justify="center" />
        <Footer />
      </main>
    </PageWrapper>
  )
}
