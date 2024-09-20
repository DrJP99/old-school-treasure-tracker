import { CharClass } from './CharClass'

export let getTpxByClassLevel = (
    charClass: CharClass,
    level: number
): number => {
    let result: number = 0

    // const classCube: number[][] = [[0, 1_500, 1_500, 3_000, 12_000, 13_000, 25_000, 50_000, 100_000, 100_000,], []]
    if (charClass === CharClass.cleric) {
        switch (level) {
            case 1:
                result = 1_500
                break
            case 2:
                result = 1_500
                break
            case 3:
                result = 3_000
                break
            case 4:
                result = 12_000
                break
            case 5:
                result = 13_000
                break
            case 6:
                result = 25_000
                break
            case 7:
                result = 50_000
                break
            case 8:
                result = 100_000
                break
            case 9:
                result = 100_000
                break
            case 10:
                result = 100_000
                break
            case 11:
                result = 100_000
                break
            case 12:
                result = 100_000
                break
            case 13:
                result = 100_000
                break
        }
    } else if (charClass === CharClass.dwarf) {
        switch (level) {
            case 1:
                result = 2_200
                break
            case 2:
                result = 2_200
                break
            case 3:
                result = 4_400
                break
            case 4:
                result = 8_200
                break
            case 5:
                result = 18_000
                break
            case 6:
                result = 35_000
                break
            case 7:
                result = 70_000
                break
            case 8:
                result = 130_000
                break
            case 9:
                result = 130_000
                break
            case 10:
                result = 130_000
                break
            case 11:
                result = 130_000
                break
        }
    } else if (charClass === CharClass.elf) {
        switch (level) {
            case 1:
                result = 4_000
                break
            case 2:
                result = 4_000
                break
            case 3:
                result = 8_000
                break
            case 4:
                result = 16_000
                break
            case 5:
                result = 32_000
                break
            case 6:
                result = 56_000
                break
            case 7:
                result = 130_000
                break
            case 8:
                result = 150_000
                break
            case 9:
                result = 200_000
                break
        }
    } else if (charClass === CharClass.fighter) {
        switch (level) {
            case 1:
                result = 2_000
                break
            case 2:
                result = 2_000
                break
            case 3:
                result = 4_000
                break
            case 4:
                result = 8_000
                break
            case 5:
                result = 16_000
                break
            case 6:
                result = 32_000
                break
            case 7:
                result = 56_000
                break
            case 8:
                result = 120_000
                break
            case 9:
                result = 120_000
                break
            case 10:
                result = 120_000
                break
            case 11:
                result = 120_000
                break
            case 12:
                result = 120_000
                break
            case 13:
                result = 120_000
                break
        }
    } else if (charClass === CharClass.halfling) {
        switch (level) {
            case 1:
                result = 2_000
                break
            case 2:
                result = 2_000
                break
            case 3:
                result = 4_000
                break
            case 4:
                result = 8_000
                break
            case 5:
                result = 16_000
                break
            case 6:
                result = 32_000
                break
            case 7:
                result = 56_000
                break
        }
    } else if (charClass === CharClass.magicUser) {
        switch (level) {
            case 1:
                result = 2_500
                break
            case 2:
                result = 2_500
                break
            case 3:
                result = 5_000
                break
            case 4:
                result = 10_000
                break
            case 5:
                result = 20_000
                break
            case 6:
                result = 40_000
                break
            case 7:
                result = 70_000
                break
            case 8:
                result = 150_000
                break
            case 9:
                result = 150_000
                break
            case 10:
                result = 150_000
                break
            case 11:
                result = 150_000
                break
            case 12:
                result = 150_000
                break
            case 13:
                result = 150_000
                break
        }
    } else if (charClass === CharClass.thief) {
        switch (level) {
            case 1:
                result = 1_200
                break
            case 2:
                result = 1_200
                break
            case 3:
                result = 2_400
                break
            case 4:
                result = 4_800
                break
            case 5:
                result = 10_400
                break
            case 6:
                result = 20_000
                break
            case 7:
                result = 40_000
                break
            case 8:
                result = 80_000
                break
            case 9:
                result = 160_000
                break
            case 10:
                result = 120_000
                break
            case 11:
                result = 120_000
                break
            case 12:
                result = 120_000
                break
            case 13:
                result = 120_000
                break
        }
    }

    return result
}
