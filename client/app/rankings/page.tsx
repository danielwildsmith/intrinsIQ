"use client"

import Header from "@/components/nav-header"
import {useState, useEffect} from "react";
import axios from "axios";
import { Box, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import PageWrapper from "@/components/animations";
import { Footer } from "@/components/footer";
import { CompanyStockData } from "@/types/CompanyStockData";

export default function RankingsPage() {
    const [rankingsData, setRankingsData] = useState<CompanyStockData[] | null>(null)

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
                <TableContainer mt={10} color={'white'} px={'400px'} pb={12}>
                    <Table variant='simple' border={'2px solid white'} >
                        <TableCaption color={'#D9D9D9'}>Top Sustainable Companies</TableCaption>
                        <Thead>
                            <Tr >
                                <Th color={'#FFD700'}>Rank</Th>
                                <Th color={'#FFD700'}>Ticker</Th>
                                <Th color={'#FFD700'} isNumeric>Current Price</Th>
                                <Th color={'#FFD700'} isNumeric>Intrinsic Value</Th>
                                <Th color={'#FFD700'} isNumeric>Potential Gain</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rankingsData.slice(0, 20).map((item, index) => (
                                <Tr key={index}>
                                    <Td>{item.rank}</Td>
                                    <Td>{item.company}</Td>
                                    <Td isNumeric>${item.price.toFixed(2)}</Td>
                                    <Td isNumeric>${item.intrinsicValue!.toFixed(2)}</Td>
                                    <Td isNumeric>${(item.intrinsicValue! - item.price).toFixed(2)}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Footer />
            </PageWrapper>
            </>
        )
    }
}
