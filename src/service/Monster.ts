import { v4 as uuidv4 } from 'uuid'

export class Monster {
    private name: string
    private uuid: string
    private description: string
    private xp: number
    private qty: number

    constructor(
        name: string,
        description: string,
        xp: number,
        qty: number,
        uuid: string = uuidv4()
    ) {
        this.name = name
        this.uuid = uuid
        this.description = description
        this.xp = xp
        this.qty = qty
    }

    public getName = (): string => {
        return this.name
    }

    public getUuid = (): string => {
        return this.uuid
    }

    public getDescription = (): string => {
        return this.description
    }

    public getXp = (): number => {
        return this.xp
    }

    public getTotalXp = (): number => {
        return this.xp * this.qty
    }

    public getQty = () => {
        return this.qty
    }
}
