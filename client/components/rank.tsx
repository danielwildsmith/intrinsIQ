import {useState, useEffect} from "react";
import axios from "axios";
import { Heading } from "@chakra-ui/react";
import { serverHost } from "@/app/page";

export interface RankData {
    company: string;
    rankValue: Number;
}

export const RankCard = ({company}: {company: string}) => {
    const [rankData, setRankData] = useState<RankData[] | null>(null)

    const getRankData = async () => {
        try {
          const res = await axios.get(`${serverHost}/rankingList`);
          setRankData(res.data);
        } catch (error) {
          console.error(error);
        }
    }

      useEffect(() => {
        getRankData();
      }, []);

    const determineRank = () => {
        if(rankData)
            return rankData.findIndex(item => item.company === company) + 1;
    }
    
    if(rankData) {
        return(
            <Heading fontSize={'32px'} color={'#FFFFFF'}>- Rank {determineRank()} / 500</Heading>
        )
    }
    return <></>
}