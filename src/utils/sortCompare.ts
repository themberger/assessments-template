export function sortCompare(key: string, order: string = "ascending") {
    return function sortObj(a: any, b: any) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') 
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }

        if (order === 'descending') {
            return comparison;
        } else if (order === 'ascending') {
            return comparison * -1;
        } else {
            return 0;
        }
    };
}