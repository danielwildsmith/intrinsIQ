"use client"

import { PageHeader } from "@/components/nav-header"
import {useState, useEffect} from "react";
import axios from "axios";
import { Box, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import PageWrapper from "@/components/animations";

export interface TableData {
    rank: string;
    company: string;
    intrinsicValue: Number;
    stockPrice: Number;
    rankValue: Number;
}

export default function RankingsPage() {
    const [rankData, setRankData] = useState<TableData[] | null>(null)

    const getRankData = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:5000/rankingList`);
          setRankData(res.data);
        } catch (error) {
          console.error(error);
        }
    }

      useEffect(() => {
        getRankData();
      }, []);



    if(rankData) {
        return (
            <>
            <PageWrapper>
                <PageHeader path="/rankings" />
                <Flex mt={10} gap={0.25} align={'flex-end'} textAlign={'center'} justifyContent={'center'}>
                    {rankData[1] && (
                        <Box h={`100px`} w={'100px'} bg={'#D9D9D9'} borderRadius={'10px'} display={'flex'} flexDir={'column'} justifyContent={'center'} gap={0.5}>
                            <Text>2</Text> {/* This is hardcoded as 2 since we are directly accessing the second index */}
                            <Text>{rankData[1].company}</Text>
                            <Text color={'#33d778'}>+${rankData[1].rankValue.toFixed(2)}</Text>
                        </Box>
                    )}
                    {rankData[0] && (
                        <Box h={`140px`} w={'100px'} bg={'white'} borderRadius={'10px'} display={'flex'} flexDir={'column'} justifyContent={'center'} gap={0.5}>
                            <Text>1</Text> {/* This is hardcoded as 2 since we are directly accessing the second index */}
                            <Text>{rankData[0].company}</Text>
                            <Text color={'#33d778'}>+${rankData[0].rankValue.toFixed(2)}</Text>
                        </Box>
                    )}
                    {rankData[2] && (
                        <Box h={`120px`} w={'100px'} bg={'#D9D9D9'} borderRadius={'10px'} display={'flex'} flexDir={'column'} justifyContent={'center'} gap={0.5}>
                            <Text>3</Text> {/* This is hardcoded as 2 since we are directly accessing the second index */}
                            <Text>{rankData[2].company}</Text>
                            <Text color={'#33d778'}>+${rankData[2].rankValue.toFixed(2)}</Text>
                        </Box>
                    )}

                </Flex>
                <TableContainer mt={10} color={'white'} px={'400px'} >
                    <Table variant='simple' border={'2px solid white'} >
                        <TableCaption>Top 20 Sustainable Companies</TableCaption>
                        <Thead>
                            <Tr >
                                <Th color={'#FFD700'}>Rank</Th>
                                <Th color={'#FFD700'}>Ticker</Th>
                                <Th color={'#FFD700'} isNumeric>Intrinsic Value</Th>
                                <Th color={'#FFD700'} isNumeric>Current Price</Th>
                                <Th color={'#FFD700'} isNumeric>Rank Value</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rankData.slice(0, 20).map((item, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td> {/* Assuming you want to use the index as rank */}
                                    <Td>{item.company}</Td>
                                    <Td isNumeric>${item.intrinsicValue.toFixed(2)}</Td>
                                    <Td isNumeric>${item.stockPrice.toFixed(2)}</Td>
                                    <Td isNumeric style={{color: '#33d778'}}>+${item.rankValue.toFixed(2)}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </PageWrapper>
            </>
        )
    }
}
