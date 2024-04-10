import { Flex, Text } from "@chakra-ui/react"
import Link from "next/link"

export const Footer = () => {
    return (
        <>
            <Flex width="full" justifyContent={'center'} mt="auto">
                <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Link href={'https://github.com/danielwildsmith/shellhacks-2023'} target="_blank" >
                        <Text color="#33d778" borderBottom="1px solid transparent" _hover={{borderBottom: '1px solid #33d778'}}>
                            Source Code
                        </Text>
                    </Link>
                    <Text color={'#D9D9D9'}>Not Financial Advice</Text>
                </Flex>
            </Flex>
        </>
    )
}