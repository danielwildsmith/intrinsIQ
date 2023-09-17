"use client"

import { HomeHeader } from "@/components/nav-header"
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Box h={'100%'} w={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} pb={5}>
        <HomeHeader path="/"/>
      </Box>
      {/* Spacer will take up all available space, pushing the footer to the bottom */}
      {/* This Flex will act like a footer */}
      <Flex width="full" padding={4} justifyContent={'space-between'} position="absolute" bottom={0}>
        <Text color={'#D9D9D9'} fontSize={'xl'}>Not Financial Advice</Text>
        <Box boxSize='30px' _hover={{cursor: 'pointer'}} >
          <Link href={'/about'}>
              <Image src='/function.png' alt='Function icon' />
          </Link>
        </Box>
      </Flex>
    </main>
  )
}
