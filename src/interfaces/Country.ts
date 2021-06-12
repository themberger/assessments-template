export interface Country {
    name: string; 
    alpha3Code: string;
    capital: string;
    population: number | null;
    languages: [{
        name: string
    }];
    currencies: [{
        code: string
    }];
}