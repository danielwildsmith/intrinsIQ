"use client"

import { PageHeader } from "@/components/nav-header";
import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <>
            <PageHeader path="/about" />
            <Box px={'250px'} mt={10} color={'white'}>
                    <Text fontSize={'2xl'}  borderBottom={'1px solid white'} w={'fit-content'} mb={2}>
                        About This Project
                    </Text>
                    <Text ml={4} fontSize={'lg'} mb={3.5}>
                        IntrinsIQ calculates the intrinsic value of stocks within the S&P500 using a discounted cash flow model. Essentially, we are projecting the company’s future cash flows and discounting them to the present value.
                    </Text>
                    <Box display={'flex'} ml={4} fontSize={'lg'} mb={3.5}>
                        <span>Formula:  </span>
                        <Text ml={2} px={2} border={'1px solid'}>
                            Intrinsic Value = (DCF + cash and short term investments - total debt) / shares outstanding
                        </Text>
                    </Box>
                    
                    <Text ml={4} fontSize={'lg'} mb={3.5}>
                        This calculation is useful for finding potentially undervalued stocks that will perform well in the future in the face of temporary market conditions. That said, it is paramount to recognize that this valuation method has its limitations due to its sensitivity to a large number of assumptions and forecasts. Some of them include:
                    </Text>
                    <Text ml={12} fontSize={'lg'} mb={1}>
                        - A 20 year time horizon
                    </Text>
                    <Text ml={12} fontSize={'lg'} mb={1}>
                        - Growth rate years 1-5 calculation from Finviz (“EPS next 5Y”)
                    </Text>
                    <Text ml={12} fontSize={'lg'} mb={1}>
                        - Growth rate years 6-10 being half of years 1-5 (conservative)
                    </Text>
                    <Text ml={12} fontSize={'lg'} mb={1}>
                        - Growth rate years 11-20 being following inflation
                    </Text>
                    <Text ml={12} fontSize={'lg'} mb={2.5}>
                        - An average long term US inflation rate of 3.28%
                    </Text>

                    <Text ml={4} fontSize={'lg'} mb={3.5}>
                        We also suffered from other limitations, including the occasional occurrence of incomplete or uncleanable data. In these few cases, we developed conservative approximations or simply omitted the data point.
                    </Text>

                    <Text ml={4} fontWeight={'thin'} fontStyle={'italic'} mb={6}>
                        Disclaimer: IntrinsIQ is not a financial advisor, nor is this meant to resemble any form of financial advice. Please consult a certified financial advisor before making any investment decisions and carry out your own due diligence.
                    </Text>

                    <Box h={'1px'} borderBottom={'1px solid white'} mb={6}>

                    </Box>

                    <Text fontSize={'2xl'}  borderBottom={'1px solid white'} w={'fit-content'} mb={2}>
                        About The Team
                    </Text>
                    <Text ml={4} fontSize={'lg'} mb={3.5}>
                        ShellHacks 2023 is the first ever hackathon for all of our members! We wanted to build something that is both useful and something that we'd be proud of.
                    </Text>
                    <Link href={'https://www.linkedin.com/in/danielwildsmith/'} target="_blank" > 
                        <Text ml={12} fontSize={'lg'} mb={1} color="#33d778" _hover={{borderBottom: '1px solid #33d778'}} w={'fit-content'}>
                            - Daniel Wildsmith
                        </Text>
                    </Link>
                    <Link href={'https://www.linkedin.com/in/josephcabezas/'} target="_blank" > 
                        <Text ml={12} fontSize={'lg'} mb={1} color="#33d778" _hover={{borderBottom: '1px solid #33d778'}} w={'fit-content'}>
                            - Joseph Cabezas
                        </Text>
                    </Link>
                    <Link href={'https://www.linkedin.com/in/antoncsalvador/'} target="_blank" > 
                        <Text ml={12} fontSize={'lg'} mb={1} color="#33d778" _hover={{borderBottom: '1px solid #33d778'}} w={'fit-content'}>
                            - Anton Salvador
                        </Text>
                    </Link>
                    <Link href={'https://www.linkedin.com/in/mathew-alangadan-38228727a/'} target="_blank" > 
                        <Text ml={12} fontSize={'lg'} mb={3.5} color="#33d778" _hover={{borderBottom: '1px solid #33d778'}} w={'fit-content'}>
                            - Mathew Alangadan
                        </Text>
                    </Link>
                    
            </Box>
        </>
    )
}