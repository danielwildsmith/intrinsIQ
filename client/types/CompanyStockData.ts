export type CompanyStockData = {
    company: string;
    date: string;
    price: number; 
    intrinsicValue: number | null;
    rank: string | null;
    rankValue: number | null;
};