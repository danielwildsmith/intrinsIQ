"use client"

import PageWrapper from "@/components/animations";
import { Footer } from "@/components/footer";
import Header from "@/components/nav-header";
import { Text } from "@chakra-ui/react";

export default function Custom404() {
    return (
      <>
        <PageWrapper>
          <main className="flex min-h-screen flex-col items-center">
            <Header path="/not-found" />
            <Text color={'white'} fontWeight={'bold'} textAlign={'center'} fontSize={'3xl'} mt={10} maxW={'60%'}>Not Found. Use company ticker symbol (ex. AAPL for Apple). Only S&P500 companies are included.</Text>
            <Footer />
          </main>
        </PageWrapper>
      </>
    )
  }
  