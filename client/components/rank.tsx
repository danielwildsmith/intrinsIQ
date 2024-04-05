import { Heading } from "@chakra-ui/react";
import { CompanyStockData } from "@/types/CompanyStockData";

export const RankCard = ({ companyData }: { companyData: CompanyStockData }) => {
  return (
    <Heading fontSize={'32px'} color={'#FFFFFF'}>
        - Rank {companyData.rank} / 500
    </Heading>
  );
}