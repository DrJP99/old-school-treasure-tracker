import { CharClass } from './CharClass'

export const CharacterLevelLimit = (charClass: CharClass): number => {
    let limit = 0

    switch (charClass) {
        case CharClass.normalHuman:
            limit = 0
            break
        case CharClass.mycelian:
            limit = 6
            break
        case CharClass.gnome:
        case CharClass.goblin:
        case CharClass.halfling:
        case CharClass.half_orc:
        case CharClass.mutoid:
        case CharClass.svirfneblin:
            limit = 8
            break
        case CharClass.dragonborn:
        case CharClass.drow:
        case CharClass.duergar:
        case CharClass.elf:
        case CharClass.gargantua:
        case CharClass.hephaestan:
        case CharClass.phase_elf:
        case CharClass.tiefling:
        case CharClass.wood_elf:
            limit = 10
            break
        case CharClass.dwarf:
        case CharClass.half_elf:
            limit = 12
            break
        default:
            limit = 14
            break
    }

    return limit
}
