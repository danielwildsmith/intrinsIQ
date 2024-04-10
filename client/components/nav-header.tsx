import { Flex, Box, Image, Link, Stack } from "@chakra-ui/react";
import SearchComponent from "./search-bar";

const Header = ({path}: {path: string}) => {
    const isHomePage = path === "/";

    return (
    <>
      <Flex flexDir={{base: "column", lg: isHomePage ? "column" : "row"}} align={"center"} justify="center" w={"100%"} mt={5} h={isHomePage ? "80vh" : "auto"}>
        <Flex fontSize={"40px"} fontWeight={"bold"} mb={3} justifyContent={"center"} ml={{base: 0, lg: "20px"}}>
            <Link href={'/'}>
                <span style={{color: '#33d778'}}>Intrins</span>
                <span style={{color: '#FFFFFF'}}>IQ</span>
            </Link>
        </Flex>
        <Flex w="100%" justify="center" mr={{base: 0, lg: isHomePage ? 0 : "90px"}}>
            <Flex w={{base: "90%", md: "90%"}} gap={3} justify="center">
                <SearchComponent />
                <Stack>
                    <Box boxSize='30px' _hover={{cursor: 'pointer'}} >
                        <Link href={'/rankings'}>
                            <Image src='/leaderBoardIcon.png' alt='Leaderboard icon' width={30} height={30} />
                        </Link>
                    </Box>
                    <Box h={'1px'} borderBottom={path == '/rankings' ? '2px solid #FFD700' : ''}/>
                </Stack>
                <Stack>
                    <Box boxSize='30px' _hover={{cursor: 'pointer'}} >
                        <Link href={'/about'}>
                            <Image src='/function.png' alt='Function icon' width={30} height={30}/>
                        </Link>
                    </Box>
                    <Box h={'1px'} borderBottom={path == '/about' ? '2px solid white' : ''}/>
                </Stack>
            </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;