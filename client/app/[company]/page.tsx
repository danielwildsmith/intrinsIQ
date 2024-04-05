"use client"

import PageWrapper from "@/components/animations";
import { Footer } from "@/components/footer";
import { IntrinsicValueStat, RangeChart } from "@/components/graph";
import Header from "@/components/nav-header";
import { RankCard } from "@/components/rank";
import { CompanyStockData } from "@/types/CompanyStockData";
import { Flex, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DynamicCompanyPage({ params }: { params: { company: string } }) {
  const [companyData, setCompanyData] = useState<CompanyStockData[] | null>(null);

  const getCompanyData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/historical/${params.company}`);
      setCompanyData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  return (
    <PageWrapper>
      <main className="flex min-h-screen flex-col items-center">
        <Header path={params.company} />
        {companyData && (
          <>
            <Flex mt={5} mb={3}>
              <Heading fontSize={'32px'} color={'#FFFFFF'} mr={2}>{params.company}</Heading>
              <RankCard companyData={companyData[companyData.length - 1]}/>
            </Flex>
            <RangeChart companyData={companyData}/>
            <IntrinsicValueStat companyData={companyData[companyData.length - 1]}/>
          </>
        )}
        <Footer />
      </main>
    </PageWrapper>
  )
}
  