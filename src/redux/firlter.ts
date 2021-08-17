export const contactsFilter = (arr: any) => {
    return arr.filter((item: any, index:any, array:any) => {
        // @ts-ignore
        return index===array.findIndex(a => a.id === item.id)
    })
}