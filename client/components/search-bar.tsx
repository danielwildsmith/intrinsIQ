import React, { useState, useRef, useEffect } from 'react';
import { Box, InputGroup, Input, Stack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export const companies = ["MMM","AOS","ABT","ABBV","ACN","ATVI","ADM","ADBE","ADP","AES","AFL","A","APD","AKAM","ALK","ALB","ARE","ALGN","ALLE","LNT","ALL","GOOGL","GOOG","MO","AMZN","AMCR","AMD","AEE","AAL","AEP","AXP","AIG","AMT","AWK","AMP","AME","AMGN","APH","ADI","ANSS","AON","APA","AAPL","AMAT","APTV","ACGL","ANET","AJG","AIZ","T","ATO","ADSK","AZO","AVB","AVY","AXON","BKR","BALL","BAC","BBWI","BAX","BDX","WRB","BRK-B","BBY","BIO","TECH","BIIB","BLK","BK","BA","BKNG","BWA","BXP","BSX","BMY","AVGO","BR","BRO","BF-B","BG","CHRW","CDNS","CZR","CPT","CPB","COF","CAH","KMX","CCL","CARR","CTLT","CAT","CBOE","CBRE","CDW","CE","COR","CNC","CNP","CDAY","CF","CRL","SCHW","CHTR","CVX","CMG","CB","CHD","CI","CINF","CTAS","CSCO","C","CFG","CLX","CME","CMS","KO","CTSH","CL","CMCSA","CMA","CAG","COP","ED","STZ","CEG","COO","CPRT","GLW","CTVA","CSGP","COST","CTRA","CCI","CSX","CMI","CVS","DHI","DHR","DRI","DVA","DE","DAL","XRAY","DVN","DXCM","FANG","DLR","DFS","DIS","DG","DLTR","D","DPZ","DOV","DOW","DTE","DUK","DD","DXC","EMN","ETN","EBAY","ECL","EIX","EW","EA","ELV","LLY","EMR","ENPH","ETR","EOG","EPAM","EQT","EFX","EQIX","EQR","ESS","EL","ETSY","EG","EVRG","ES","EXC","EXPE","EXPD","EXR","XOM","FFIV","FDS","FICO","FAST","FRT","FDX","FITB","FSLR","FE","FIS","FI","FLT","FMC","F","FTNT","FTV","FOXA","FOX","BEN","FCX","GRMN","IT","GEHC","GEN","GNRC","GD","GE","GIS","GM","GPC","GILD","GL","GPN","GS","HAL","HIG","HAS","HCA","PEAK","HSIC","HSY","HES","HPE","HLT","HOLX","HD","HON","HRL","HST","HWM","HPQ","HUM","HBAN","HII","IBM","IEX","IDXX","ITW","ILMN","INCY","IR","PODD","INTC","ICE","IFF","IP","IPG","INTU","IVZ","INVH","IQV","IRM","JBHT","JKHY","J","JNJ","JCI","JPM","JNPR","K","KVUE","KDP","KEY","KEYS","KMB","KIM","KMI","KLAC","KHC","KR","LHX","LH","LRCX","LW","LVS","LDOS","LEN","LNC","LIN","LYV","LKQ","LMT","L","LOW","LYB","MTB","MRO","MPC","MKTX","MAR","MMC","MLM","MAS","MA","MTCH","MKC","MCD","MCK","MDT","MRK","META","MET","MTD","MGM","MCHP","MU","MSFT","MAA","MRNA","MHK","MOH","TAP","MDLZ","MCO","MS","MOS","MSI","MSCI","NDAQ","NTAP","NFLX","NWL","NEM","NWSA","NWS","NEE","NKE","NI","NDSN","NSC","NTRS","NOC","NCLH","NRG","NUE","NVDA","NVR","NXPI","ORLY","OXY","ODFL","OMC","ON","OKE","ORCL","OGN","OTIS","PCAR","PKG","PANW","PARA","PH","PAYX","PYPL","PNR","PEP","PFE","PCG","PM","PSX","PNW","PXD","PNC","POOL","PPG","PPL","PFG","PG","PGR","PLD","PRU","PEG","PTC","PSA","PHM","QRVO","PWR","QCOM","DGX","RL","RJF","RTX","O","REG","REGN","RF","RSG","RMD","RVTY","RHI","ROK","ROL","ROP","ROST","RCL","SPGI","CRM","SBAC","SLB","STX","SEE","SRE","NOW","SHW","SPG","SWKS","SJM","SNA","SEDG","SO","LUV","SWK","SBUX","STT","STLD","STE","SYK","SYF","SNPS","SYY","TMUS","TROW","TTWO","TPR","TRGP","TGT","TEL","TDY","TFX","TER","TSLA","TXN","TXT","TMO","TJX","TSCO","TT","TDG","TRV","TRMB","TFC","TYL","TSN","USB","UDR","ULTA","UNP","UAL","UPS","URI","UNH","UHS","VLO","VTR","VRSN","VRSK","VZ","VRTX","VFC","VTRS","VICI","V","VMC","WAB","WBA","WMT","WBD","WM","WAT","WEC","WFC","WELL","WST","WDC","WRK","WY","WHR","WMB","WTW","GWW","WYNN","XEL","XYL","YUM","ZBRA","ZBH","ZION","ZTS"]
const companiesSet: Set<string> = new Set(companies);

const SearchComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [matches, setMatches] = useState<string[]>([]);
  const [showMatches, setShowMatches] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (companiesSet.has(query.toUpperCase())) router.push(`/${query}`);
    else router.push("/not-found");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase();
    setQuery(input);

    if (input.trim() === "") {
      setMatches([]);
      setShowMatches(false);
      return;
    }

    const filteredMatches = companies.filter(company =>
      company.includes(input)
    ).slice(0, 1);

    setMatches(filteredMatches);
    setShowMatches(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowMatches(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} style={{width: '55%'}}>
      <InputGroup w="100%">
        <Box w="100%">
          <form onSubmit={handleSubmit}>
            <Input
              value={query}
              onChange={handleInputChange}
              placeholder="Search AAPL"
              bg="#FFFFFF"
              color="#28282B"
              borderRadius={16}
              onFocus={() => matches.length > 0 && setShowMatches(true)}
            />
          </form>
          {showMatches && (
            <Stack mt={2} bg="white" boxShadow="md" borderRadius={8} position="absolute" zIndex="1" width="full">
              {matches.length === 0 ? (
              <Button isDisabled={true} variant="ghost" justifyContent="flex-start" _disabled={{ opacity: 1, color: "gray.400" }}>
                No results
              </Button>
              ) : (
              matches.map((match, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() => {
                    setQuery(match);
                    setShowMatches(false);
                    router.push(`/${match}`);
                  }}
                >
                  {match}
                </Button>
              )))}
            </Stack>
          )}
        </Box>
      </InputGroup>
    </div>
  );
}

export default SearchComponent;