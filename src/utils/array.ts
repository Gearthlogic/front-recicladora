export function getMostFrequentElement(arr: any[]) {
    const hashmap = arr.reduce((map, val) => {
        map[val] = (map[val] || 0) + 1

        return map
    }, {})
 
    return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
}