"use client"

import { ChakraProvider } from '@chakra-ui/react'

export const Chakra = ({ 
    children 
    }: { 
    children: React.ReactNode 
    }) => {
    return (
        <>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </>
    )
}