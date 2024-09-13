export function getEnumKeys<
    T extends string,
    TEnumValue extends string | number,
>(enumVariable: { [value in T]: TEnumValue }) {
    return Object.values(enumVariable) as Array<T>
}
