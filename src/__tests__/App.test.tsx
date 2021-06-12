import { http } from '../utils/requestHandler';
import { sortCompare } from '../utils/sortCompare';

test("testing sort ascending", async () => {
    
    let responseData: any = await http<[]>(
        'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;capital;population;languages;currencies'
    );
    
    let usedPopVal = undefined;
    if (responseData.length > 0) {
        for (var i=0; i < responseData.length; i++) {
            if (responseData[i].population < usedPopVal || usedPopVal === undefined) {
                usedPopVal = responseData[i].population;
            }
        }
    }

    let sortedData = responseData.sort(sortCompare('population', 'ascending'));

    expect(usedPopVal).toBe(sortedData[0].population);
});

test("testing sort descending", async () => {
    
    let responseData: any = await http<[]>(
        'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;capital;population;languages;currencies'
    );
    
    let usedPopVal = undefined;
    if (responseData.length > 0) {
        for (var i=0; i < responseData.length; i++) {
            if (responseData[i].population > usedPopVal || usedPopVal === undefined) {
                usedPopVal = responseData[i].population;
            }
        }
    }

    let sortedData = responseData.sort(sortCompare('population', 'descending'));

    expect(usedPopVal).toBe(sortedData[0].population);
});