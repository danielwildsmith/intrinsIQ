import { InputGroup, InputLeftElement, Input } from "@chakra-ui/input"
import { SearchIcon} from '@chakra-ui/icons'
import { Flex } from "@chakra-ui/layout"
import Link from "next/link"

export const NavHeader = () => {
    return (
        <>
            <Flex fontSize={'40px'} mb={3} pt={10}>
                <Link href={'/'}>
                    <span style={{color: '#00CC00'}}>Intrins</span>
                    <span style={{color: '#FFFFFF'}}>IQ</span>
                </Link>
            </Flex>
            <InputGroup maxW={{base: '100%', md: '40%'}}>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='#28282B' />
                </InputLeftElement>
                <Input ml={5} placeholder='Search APPL or Apple' bg={'#FFFFFF'} color={'#28282B'} borderRadius={16}/>
            </InputGroup>
        </>
    )
    
}