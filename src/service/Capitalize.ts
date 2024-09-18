export let capitalize = (s: string): string => {
    let res = s
    let divider = res.includes('-') ? '-' : ' '
    let resArray: string[] = res.split(/[-\s]/)

    resArray = resArray.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    res = resArray.join(divider)
    return res
}
