export function sortCompare(key: string, order: string = "ascending") {
    return function sortObj(a: any, b: any) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const aVal = a[key];
        const bVal = b[key];

        let comparison = 0;
        if (aVal > bVal) {
            comparison = 1;
        } else if (aVal < bVal) {
            comparison = -1;
        }

        if (order === 'descending') {
            return comparison * -1;
        } else if (order === 'ascending') {
            return comparison;
        } else {
            return 0;
        }
    };
}