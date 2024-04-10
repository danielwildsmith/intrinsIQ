"use client";

import PageWrapper from "@/components/animations";
import { Footer } from "@/components/footer";
import Header from "@/components/nav-header";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

const textStyle = {
    ml: { base: 0, md: 4 },
    fontSize: 'lg',
    mb: 3.5,
  };

const IndentedText = ({ children, ml = 12, mb = 1 }: { children: React.ReactNode, ml?: number, mb?: number }) => (
    <Text ml={ml} fontSize={'lg'} mb={mb}>
        {children}
    </Text>
);

const TeamMember = ({ name, link }: { name: string, link: string }) => (
    <Link href={link} target="_blank" rel="noopener noreferrer">
        <Text
            fontSize={'lg'}
            ml={4}
            mb={1}
            color="#33d778"
            borderBottom="1px solid transparent"
            _hover={{ borderBottom: '1px solid #33d778' }}
            w={'fit-content'}
        >
            - {name}
        </Text>
    </Link>
);

export default function AboutPage() {
    return (
        <>
            <PageWrapper>
                <Header path="/about" />
                <Box px={{base: "20px", lg: '250px'}} mt={6} color={'white'} pb={5}>
                    <Text fontSize={'2xl'} borderBottom={'1px solid white'} w={'fit-content'} mb={2}>
                        About This Project
                    </Text>
                    <Text {...textStyle}>
                        IntrinsIQ calculates the intrinsic value of stocks within the S&P500 using a discounted cash flow model. Essentially, we are projecting the future cash flows of the company and discounting them to the present value.
                    </Text>
                    <Box display={'flex'} {...textStyle}>
                        <span>Formula:  </span>
                        <Text ml={2} px={2} border={'1px solid'}>
                            Intrinsic Value = (DCF + cash and short-term investments - total debt) / shares outstanding
                        </Text>
                    </Box>
                    <Text {...textStyle}>
                        This calculation is useful for finding potentially undervalued stocks that will perform well in the future in the face of temporary market conditions. That said, it is paramount to recognize that this valuation method has its limitations due to its sensitivity to a large number of assumptions and forecasts.
                    </Text>
                    <IndentedText>
                        - A 20 year time horizon
                    </IndentedText>
                    <IndentedText>
                        - Growth rate years 1-5 calculation from Finviz (“EPS next 5Y”)
                    </IndentedText>
                    <IndentedText>
                        - Growth rate years 6-10 being half of years 1-5 (conservative)
                    </IndentedText>
                    <IndentedText>
                        - Growth rate years 11-20 being following inflation
                    </IndentedText>
                    <IndentedText mb={2.5}>
                        - An average long term US inflation rate of 3.28%
                    </IndentedText>
                    <Text {...textStyle}>
                        We also suffered from other limitations, including the occasional occurrence of incomplete or uncleanable data. In these few cases, we developed conservative approximations or simply omitted the data point.
                    </Text>
                    <Text ml={4} fontWeight={'thin'} fontStyle={'italic'} mb={6}>
                        Disclaimer: IntrinsIQ is not a financial advisor, nor is this meant to resemble any form of financial advice. Please consult a certified financial advisor before making any investment decisions and carry out your own due diligence.
                    </Text>
                    <Box h={'1px'} borderBottom={'1px solid white'} mb={6} />
                    <Text fontSize={'2xl'} borderBottom={'1px solid white'} w={'fit-content'} mb={2}>
                        About The Team
                    </Text>
                    <Text {...textStyle}>
                        ShellHacks 2023 is the first ever hackathon for all of our members! We wanted to build something that is both useful and something that we would be proud of.
                    </Text>
                    <TeamMember name="Daniel Wildsmith" link="https://www.linkedin.com/in/danielwildsmith/" />
                    <TeamMember name="Joseph Cabezas" link="https://www.linkedin.com/in/josephcabezas/" />
                    <TeamMember name="Anton Salvador" link="https://www.linkedin.com/in/antoncsalvador/" />
                    <TeamMember name="Mathew Alangadan" link="https://www.linkedin.com/in/mathew-alangadan-38228727a/" />
                </Box>
                <Footer />
            </PageWrapper>
        </>
    );
}
