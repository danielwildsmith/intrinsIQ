"use client"

import Header from "@/components/nav-header"
import {useState, useEffect} from "react";
import axios from "axios";
import { Box, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, IconButton, Link } from "@chakra-ui/react";
import PageWrapper from "@/components/animations";
import { Footer } from "@/components/footer";
import { CompanyStockData } from "@/types/CompanyStockData";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function RankingsPage() {
    const [rankingsData, setRankingsData] = useState<CompanyStockData[] | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    const getRankData = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/rankings`);
          setRankingsData(res.data);
        } catch (error) {
          console.error(error);
        }
    }

    useEffect(() => {
        getRankData();
    }, []);

    if(rankingsData) {
        const itemsPerPage = 20;
        const totalItems = 497;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

        const currentRankings = rankingsData.slice(startIndex, endIndex);
    
        const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
        const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    
        return (
            <>
            <PageWrapper>
                <Header path="/rankings" />
                <Flex mt={10} gap={0.25} align={'flex-end'} textAlign={'center'} justifyContent={'center'}>
                    {rankingsData[1] && (
                        <Box h={`100px`} w={'100px'} bg={'#D9D9D9'} borderRadius={'10px'} display={'flex'} flexDir={'column'} justifyContent={'center'} gap={0.5}>
                            <Text>2</Text> {/* This is hardcoded as 2 since we are directly accessing the second index */}
                            <Text>{rankingsData[1].company}</Text>
                            <Text color={'#33d778'}>+${(rankingsData[1].intrinsicValue! - rankingsData[1].price).toFixed(2)}</Text>
                        </Box>
                    )}
                    {rankingsData[0] && (
                        <Box h={`140px`} w={'100px'} bg={'white'} borderRadius={'10px'} display={'flex'} flexDir={'column'} justifyContent={'center'} gap={0.5}>
                            <Text>1</Text> {/* This is hardcoded as 2 since we are directly accessing the second index */}
                            <Text>{rankingsData[0].company}</Text>
                            <Text color={'#33d778'}>+${(rankingsData[0].intrinsicValue! - rankingsData[0].price).toFixed(2)}</Text>
                        </Box>
                    )}
                    {rankingsData[2] && (
                        <Box h={`120px`} w={'100px'} bg={'#D9D9D9'} borderRadius={'10px'} display={'flex'} flexDir={'column'} justifyContent={'center'} gap={0.5}>
                            <Text>3</Text> {/* This is hardcoded as 2 since we are directly accessing the second index */}
                            <Text>{rankingsData[2].company}</Text>
                            <Text color={'#33d778'}>+${(rankingsData[2].intrinsicValue! - rankingsData[2].price).toFixed(2)}</Text>
                        </Box>
                    )}

                </Flex>
                <TableContainer mt={10} color={'white'}>
                    <Box
                        px={{base: 4, md: 20, xl: 60}} // Adjust padding for smaller screens if necessary
                        overflowX="auto"
                        maxWidth="100%" // Ensures the Box does not exceed the viewport width
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '0.5em',
                                height: '0.5em',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0,0,0,.2)',
                            },
                        }}
                    >
                        <Table variant='simple' border={'2px solid white'}>
                            <TableCaption color={'#D9D9D9'}>Top Sustainable Companies</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th color={'#FFD700'}>Rank</Th>
                                    <Th color={'#FFD700'}>Ticker</Th>
                                    <Th color={'#FFD700'} isNumeric>Current Price</Th>
                                    <Th color={'#FFD700'} isNumeric>Intrinsic Value</Th>
                                    <Th color={'#FFD700'} isNumeric>Potential Gain</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentRankings.filter(item => item.intrinsicValue !== undefined).map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{item.rank}</Td>
                                        <Td>
                                            <NextLink href={`/${encodeURIComponent(item.company)}`} passHref>
                                                <Link color="#33d778" isExternal={false}>{item.company}</Link>
                                            </NextLink>
                                        </Td>
                                        <Td isNumeric>${item.price.toFixed(2)}</Td>
                                        <Td isNumeric>${item.intrinsicValue!.toFixed(2)}</Td>
                                        <Td isNumeric>${(item.intrinsicValue! - item.price).toFixed(2)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </TableContainer>
                <Flex justifyContent="center" color={"white"} align={'center'} mb={2}>
                    <IconButton
                        aria-label="Previous page"
                        icon={<ChevronLeftIcon boxSize="6"/>}
                        onClick={prevPage}
                        disabled={currentPage <= 1}
                        colorScheme="white" 
                        variant="ghost" 
                    />                    
                    <Text mx={4}>{currentPage}</Text>
                    <IconButton
                        aria-label="Next page"
                        icon={<ChevronRightIcon boxSize="6"/>}
                        onClick={nextPage}
                        disabled={currentPage >= totalPages}
                        colorScheme="white" 
                        variant="ghost" 
                    />                      
                </Flex>
                <Footer />
            </PageWrapper>
            </>
        )
    }
}
