"use client"

import { InputGroup, InputLeftElement, Input } from "@chakra-ui/input"
import { SearchIcon} from '@chakra-ui/icons'
import { Box, Flex, Stack } from "@chakra-ui/layout"
import Link from "next/link"
import { Image } from "@chakra-ui/react"
import { useState, FormEvent } from "react"

import { useRouter } from 'next/navigation';

export const NavHeader = ({path}: {path: string}) => {
    const [query, setQuery] = useState<string>('');
    const router = useRouter();
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        router.push(`/${query}`);
    }

    return (
        <>
            <Flex w={'100%'} flexDir={'column'}>
                <Flex fontSize={'40px'} fontWeight={'bold'} mb={3} pt={10} justifyContent={'center'}>
                    <Link href={'/'}>
                        <span style={{color: '#00CC00'}}>Intrins</span>
                        <span style={{color: '#FFFFFF'}}>IQ</span>
                    </Link>
                </Flex>
                
                <Flex w={'100%'} gap={3} justifyContent={'center'}>
                    <InputGroup maxW={{base: '100%', md: '40%'}}>
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='#28282B' />
                        </InputLeftElement>
                        <Box w={'100%'}>
                            <form onSubmit={handleSubmit}>
                                <Input value={query} onChange={(e) => setQuery(e.target.value)} ml={5} placeholder='Search APPL or Apple' bg={'#FFFFFF'} color={'#28282B'} borderRadius={16}/>
                            </form>
                        </Box>
                        
                    </InputGroup>
                    <Stack ml={6}>
                        <Box boxSize='30px' _hover={{cursor: 'pointer'}} >
                            <Link href={'/rankings'}>
                                <Image src='/leaderBoardIcon.png' alt='Leaderboard icon' />
                            </Link>
                        </Box>
                        <Box h={'1px'} borderBottom={path == '/rankings' ? '2px solid #FFD700' : ''}/>
                    </Stack>
                </Flex>
            </Flex>
        </>
    )
    
}