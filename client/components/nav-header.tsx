"use client"

import { useState, FormEvent } from "react";
import { Flex, InputGroup, Input, Box, Image, Link, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

const companies = ["MMM","AOS","ABT","ABBV","ACN","ATVI","ADM","ADBE","ADP","AES","AFL","A","APD","AKAM","ALK","ALB","ARE","ALGN","ALLE","LNT","ALL","GOOGL","GOOG","MO","AMZN","AMCR","AMD","AEE","AAL","AEP","AXP","AIG","AMT","AWK","AMP","AME","AMGN","APH","ADI","ANSS","AON","APA","AAPL","AMAT","APTV","ACGL","ANET","AJG","AIZ","T","ATO","ADSK","AZO","AVB","AVY","AXON","BKR","BALL","BAC","BBWI","BAX","BDX","WRB","BRK-B","BBY","BIO","TECH","BIIB","BLK","BK","BA","BKNG","BWA","BXP","BSX","BMY","AVGO","BR","BRO","BF-B","BG","CHRW","CDNS","CZR","CPT","CPB","COF","CAH","KMX","CCL","CARR","CTLT","CAT","CBOE","CBRE","CDW","CE","COR","CNC","CNP","CDAY","CF","CRL","SCHW","CHTR","CVX","CMG","CB","CHD","CI","CINF","CTAS","CSCO","C","CFG","CLX","CME","CMS","KO","CTSH","CL","CMCSA","CMA","CAG","COP","ED","STZ","CEG","COO","CPRT","GLW","CTVA","CSGP","COST","CTRA","CCI","CSX","CMI","CVS","DHI","DHR","DRI","DVA","DE","DAL","XRAY","DVN","DXCM","FANG","DLR","DFS","DIS","DG","DLTR","D","DPZ","DOV","DOW","DTE","DUK","DD","DXC","EMN","ETN","EBAY","ECL","EIX","EW","EA","ELV","LLY","EMR","ENPH","ETR","EOG","EPAM","EQT","EFX","EQIX","EQR","ESS","EL","ETSY","EG","EVRG","ES","EXC","EXPE","EXPD","EXR","XOM","FFIV","FDS","FICO","FAST","FRT","FDX","FITB","FSLR","FE","FIS","FI","FLT","FMC","F","FTNT","FTV","FOXA","FOX","BEN","FCX","GRMN","IT","GEHC","GEN","GNRC","GD","GE","GIS","GM","GPC","GILD","GL","GPN","GS","HAL","HIG","HAS","HCA","PEAK","HSIC","HSY","HES","HPE","HLT","HOLX","HD","HON","HRL","HST","HWM","HPQ","HUM","HBAN","HII","IBM","IEX","IDXX","ITW","ILMN","INCY","IR","PODD","INTC","ICE","IFF","IP","IPG","INTU","IVZ","INVH","IQV","IRM","JBHT","JKHY","J","JNJ","JCI","JPM","JNPR","K","KVUE","KDP","KEY","KEYS","KMB","KIM","KMI","KLAC","KHC","KR","LHX","LH","LRCX","LW","LVS","LDOS","LEN","LNC","LIN","LYV","LKQ","LMT","L","LOW","LYB","MTB","MRO","MPC","MKTX","MAR","MMC","MLM","MAS","MA","MTCH","MKC","MCD","MCK","MDT","MRK","META","MET","MTD","MGM","MCHP","MU","MSFT","MAA","MRNA","MHK","MOH","TAP","MDLZ","MCO","MS","MOS","MSI","MSCI","NDAQ","NTAP","NFLX","NWL","NEM","NWSA","NWS","NEE","NKE","NI","NDSN","NSC","NTRS","NOC","NCLH","NRG","NUE","NVDA","NVR","NXPI","ORLY","OXY","ODFL","OMC","ON","OKE","ORCL","OGN","OTIS","PCAR","PKG","PANW","PARA","PH","PAYX","PAYC","PYPL","PNR","PEP","PFE","PCG","PM","PSX","PNW","PXD","PNC","POOL","PPG","PPL","PFG","PG","PGR","PLD","PRU","PEG","PTC","PSA","PHM","QRVO","PWR","QCOM","DGX","RL","RJF","RTX","O","REG","REGN","RF","RSG","RMD","RVTY","RHI","ROK","ROL","ROP","ROST","RCL","SPGI","CRM","SBAC","SLB","STX","SEE","SRE","NOW","SHW","SPG","SWKS","SJM","SNA","SEDG","SO","LUV","SWK","SBUX","STT","STLD","STE","SYK","SYF","SNPS","SYY","TMUS","TROW","TTWO","TPR","TRGP","TGT","TEL","TDY","TFX","TER","TSLA","TXN","TXT","TMO","TJX","TSCO","TT","TDG","TRV","TRMB","TFC","TYL","TSN","USB","UDR","ULTA","UNP","UAL","UPS","URI","UNH","UHS","VLO","VTR","VRSN","VRSK","VZ","VRTX","VFC","VTRS","VICI","V","VMC","WAB","WBA","WMT","WBD","WM","WAT","WEC","WFC","WELL","WST","WDC","WRK","WY","WHR","WMB","WTW","GWW","WYNN","XEL","XYL","YUM","ZBRA","ZBH","ZION","ZTS"]
const companiesSet: Set<string> = new Set(companies);

export const Header = ({path}: {path: string}) => {
    const [query, setQuery] = useState<string>("");
    const router = useRouter();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (companiesSet.has(query.toUpperCase())) router.push(`/${query}`);
        else router.push("/not-found");
    };

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
        <Flex w="100%" justify="center" mr={{base: 0, lg: "90px"}}>
            <Flex w={{base: "90%", md: "90%"}} gap={3} justify="center">
            <InputGroup maxW={"60%"}>
                <Box w={"100%"}>
                    <form onSubmit={handleSubmit}>
                        <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value.toUpperCase())}
                        placeholder="Search AAPL"
                        bg={"#FFFFFF"}
                        color={"#28282B"}
                        borderRadius={16}
                        />
                    </form>
                </Box>
            </InputGroup>
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