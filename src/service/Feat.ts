import { v4 as uuid4 } from 'uuid'
import { FeatLevel, featLevelPercent } from './FeatLevel'

export class Feat {
    private name: string
    private uuid: string
    private featLevel: FeatLevel
    private description: string

    constructor(
        name: string,
        featLevel: string,
        description: string = '',
        uuid: string = uuid4()
    ) {
        this.name = name
        this.featLevel = featLevel as FeatLevel
        this.description = description
        this.uuid = uuid
    }

    public getName = (): string => {
        return this.name
    }

    public setName = (name: string): void => {
        this.name = name
    }

    public getUuid = (): string => {
        return this.uuid
    }

    public setUuid = (uuid: string): void => {
        this.uuid = uuid
    }

    public getFeatLevel = (): FeatLevel => {
        return this.featLevel
    }

    public setFeatLevel = (featLevel: FeatLevel): void => {
        this.featLevel = featLevel
    }

    public getDescription = (): string => {
        return this.description
    }

    public setDescription = (description: string): void => {
        this.description = description
    }

    public getXP = (txp: number) => {
        return ((featLevelPercent.get(this.featLevel) as number) / 100) * txp
    }
}
