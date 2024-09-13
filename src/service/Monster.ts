export class Monster {
    private name: string
    private description: string
    private xp: number
    private qty: number

    constructor(name: string, description: string, xp: number, qty: number) {
        this.name = name
        this.description = description
        this.xp = xp
        this.qty = qty
    }

    public get_name = (): string => {
        return this.name
    }

    public get_description = (): string => {
        return this.description
    }

    public get_xp = (): number => {
        return this.xp
    }

    public get_total_xp = (): number => {
        return this.xp * this.qty
    }

    public get_qty = () => {
        return this.qty
    }
}
