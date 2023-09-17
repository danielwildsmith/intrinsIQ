"use client"

import PageWrapper from "@/components/animations";
import { IntrinsicValueStat, RangeChart } from "@/components/graph";
import { PageHeader } from "@/components/nav-header";
import { RankCard } from "@/components/rank";
import { Flex, Heading } from "@chakra-ui/react";

export default function DynamicCompanyPage({ params }: { params: { company: string } }) {
    return (
      <PageWrapper>
        <main className="flex min-h-screen flex-col items-center">
          <PageHeader path={params.company} />
          <Flex mt={10} mb={10}>
            <Heading fontSize={'32px'} color={'#FFFFFF'} mr={2}>{params.company}</Heading>
            <RankCard company={params.company}/>
          </Flex>
          <RangeChart company={params.company}/>
          <IntrinsicValueStat company={params.company}/>
        </main>
      </PageWrapper>
      
    )
  }
  