import { Box, Flex, Text } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
    return (
        <>
              <Flex width="full" padding={4} justifyContent={'space-between'} position="absolute" bottom={0}>
        <Text color={'#D9D9D9'} fontSize={'xl'}>Not Financial Advice</Text>
        <Link href={'https://github.com/danielwildsmith/shellhacks-2023'} target="_blank" >
            <Text color="#33d778" _hover={{borderBottom: '1px solid #33d778'}} mr={'175px'}>
                Source Code
            </Text>
        </Link>
        <Box boxSize='30px' _hover={{cursor: 'pointer'}} >
          <Link href={'/about'}>
              <Image src='/function.png' alt='Function icon' width={30} height={30}/>
          </Link>
        </Box>
        
      </Flex>
        </>
    )
}