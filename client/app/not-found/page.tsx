"use client"

import PageWrapper from "@/components/animations";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/nav-header";
import { Text } from "@chakra-ui/react";

export default function Custom404() {
    return (
      <>
      <PageWrapper>
        <main className="flex min-h-screen flex-col items-center">

        <PageHeader path="/not-found" />
        <Text color={'white'} fontWeight={'bold'} textAlign={'center'} fontSize={'3xl'} mt={10}>Not Found. Use company's ticker symbol (ex. AAPL for Apple).</Text>
        <Footer />
        </main>
      </PageWrapper>
      </>
    )
  }
  