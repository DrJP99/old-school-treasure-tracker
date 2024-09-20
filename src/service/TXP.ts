import { CharClass } from './CharClass'

export let getTpxByClassLevel = (
    charClass: CharClass,
    level: number
): number => {
    let result: number = 0

    // const classCube: number[][] = [[0, 1_500, 1_500, 3_000, 12_000, 13_000, 25_000, 50_000, 100_000, 100_000,], []]
    if (charClass === CharClass.cleric || charClass === CharClass.acolyte) {
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
    } else if (charClass === CharClass.elf || charClass === CharClass.drow) {
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
    } else if (
        charClass === CharClass.fighter ||
        charClass === CharClass.halfling ||
        charClass === CharClass.bard ||
        charClass === CharClass.goblin ||
        charClass === CharClass.kineticist
    ) {
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
    } else if (
        charClass === CharClass.magicUser ||
        charClass === CharClass.illusionist ||
        charClass === CharClass.phase_elf
    ) {
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
    } else if (
        charClass === CharClass.thief ||
        charClass === CharClass.acrobat
    ) {
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
    } else if (charClass === CharClass.assassin) {
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
                result = 6_000
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
                result = 125_000
                break
            case 11:
                result = 150_000
                break
            case 12:
                result = 125_000
                break
            case 13:
                result = 150_000
                break
        }
    } else if (charClass === CharClass.barbarian) {
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
                result = 8_500
                break
            case 5:
                result = 8_500
                break
            case 6:
                result = 48_000
                break
            case 7:
                result = 55_000
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
            case 12:
                result = 130_000
                break
            case 13:
                result = 130_000
                break
        }
    } else if (charClass === CharClass.druid) {
        switch (level) {
            case 1:
                result = 2_000
                break
            case 2:
                result = 2_000
                break
            case 3:
                result = 3_500
                break
            case 4:
                result = 5_000
                break
            case 5:
                result = 7_500
                break
            case 6:
                result = 15_000
                break
            case 7:
                result = 25_000
                break
            case 8:
                result = 30_000
                break
            case 9:
                result = 35_000
                break
            case 10:
                result = 75_000
                break
            case 11:
                result = 100_000
                break
            case 12:
                result = 450_000
                break
            case 13:
                result = 750_000
                break
        }
    } else if (charClass === CharClass.duergar) {
        switch (level) {
            case 1:
                result = 2_800
                break
            case 2:
                result = 2_800
                break
            case 3:
                result = 5_600
                break
            case 4:
                result = 11_800
                break
            case 5:
                result = 23_000
                break
            case 6:
                result = 54_000
                break
            case 7:
                result = 100_000
                break
            case 8:
                result = 100_000
                break
            case 9:
                result = 100_000
                break
        }
    } else if (charClass === CharClass.gnome) {
        switch (level) {
            case 1:
                result = 3_000
                break
            case 2:
                result = 3_000
                break
            case 3:
                result = 6_000
                break
            case 4:
                result = 18_000
                break
            case 5:
                result = 30_000
                break
            case 6:
                result = 60_000
                break
            case 7:
                result = 120_000
                break
        }
    } else if (charClass === CharClass.half_elf) {
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
        }
    } else if (
        charClass === CharClass.half_orc ||
        charClass === CharClass.beast_master
    ) {
        switch (level) {
            case 1:
                result = 1_800
                break
            case 2:
                result = 1_800
                break
            case 3:
                result = 3_400
                break
            case 4:
                result = 7_000
                break
            case 5:
                result = 14_000
                break
            case 6:
                result = 32_000
                break
            case 7:
                result = 60_000
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
    } else if (charClass === CharClass.knight) {
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
                result = 8_500
                break
            case 5:
                result = 18_500
                break
            case 6:
                result = 48_000
                break
            case 7:
                result = 65_000
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
            case 12:
                result = 130_000
                break
            case 13:
                result = 130_000
                break
        }
    } else if (charClass === CharClass.paladin) {
        switch (level) {
            case 1:
                result = 2_750
                break
            case 2:
                result = 2_750
                break
            case 3:
                result = 6_500
                break
            case 4:
                result = 12_000
                break
            case 5:
                result = 21_000
                break
            case 6:
                result = 50_000
                break
            case 7:
                result = 80_000
                break
            case 8:
                result = 165_000
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
    } else if (charClass === CharClass.ranger) {
        switch (level) {
            case 1:
                result = 2_250
                break
            case 2:
                result = 2_250
                break
            case 3:
                result = 5_500
                break
            case 4:
                result = 10_000
                break
            case 5:
                result = 20_000
                break
            case 6:
                result = 50_000
                break
            case 7:
                result = 60_000
                break
            case 8:
                result = 150_000
                break
            case 9:
                result = 125_000
                break
            case 10:
                result = 125_000
                break
            case 11:
                result = 125_000
                break
            case 12:
                result = 125_000
                break
            case 13:
                result = 125_000
                break
        }
    } else if (charClass === CharClass.svirfneblin) {
        switch (level) {
            case 1:
                result = 2_400
                break
            case 2:
                result = 2_400
                break
            case 3:
                result = 5_200
                break
            case 4:
                result = 10_000
                break
            case 5:
                result = 10_000
                break
            case 6:
                result = 20_000
                break
            case 7:
                result = 80_000
                break
        }
    } else if (charClass === CharClass.gargantua) {
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
                result = 80_000
                break
            case 8:
                result = 140_000
                break
            case 9:
                result = 200_000
                break
        }
    } else if (charClass === CharClass.hephaestan) {
        switch (level) {
            case 1:
                result = 3_000
                break
            case 2:
                result = 3_000
                break
            case 3:
                result = 6_000
                break
            case 4:
                result = 13_000
                break
            case 5:
                result = 25_000
                break
            case 6:
                result = 50_000
                break
            case 7:
                result = 100_000
                break
            case 8:
                result = 100_000
                break
            case 9:
                result = 100_000
                break
        }
    } else if (charClass === CharClass.mage) {
        switch (level) {
            case 1:
                result = 2_800
                break
            case 2:
                result = 2_800
                break
            case 3:
                result = 6_400
                break
            case 4:
                result = 12_000
                break
            case 5:
                result = 24_000
                break
            case 6:
                result = 52_000
                break
            case 7:
                result = 100_000
                break
            case 8:
                result = 200_000
                break
            case 9:
                result = 160_000
                break
            case 10:
                result = 160_000
                break
            case 11:
                result = 160_000
                break
            case 12:
                result = 160_000
                break
            case 13:
                result = 160_000
                break
        }
    } else if (charClass === CharClass.wood_elf) {
        switch (level) {
            case 1:
                result = 3_000
                break
            case 2:
                result = 3_000
                break
            case 3:
                result = 6_000
                break
            case 4:
                result = 12_000
                break
            case 5:
                result = 24_000
                break
            case 6:
                result = 52_000
                break
            case 7:
                result = 100_000
                break
            case 8:
                result = 150_000
                break
            case 9:
                result = 150_000
                break
        }
    } else if (
        charClass === CharClass.dragonborn ||
        charClass === CharClass.mycelian
    ) {
        switch (level) {
            case 1:
                result = 3_000
                break
            case 2:
                result = 3_000
                break
            case 3:
                result = 6_000
                break
            case 4:
                result = 12_000
                break
            case 5:
                result = 21_000
                break
            case 6:
                result = 50_000
                break
            case 7:
                result = 80_000
                break
            case 8:
                result = 175_000
                break
            case 9:
                result = 150_000
                break
        }
    } else if (charClass === CharClass.mutoid) {
        switch (level) {
            case 1:
                result = 1_750
                break
            case 2:
                result = 1_750
                break
            case 3:
                result = 2_500
                break
            case 4:
                result = 7_000
                break
            case 5:
                result = 16_000
                break
            case 6:
                result = 30_000
                break
            case 7:
                result = 60_000
                break
        }
    } else if (charClass === CharClass.tiefling) {
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
                result = 10_000
                break
            case 6:
                result = 30_000
                break
            case 7:
                result = 60_000
                break
            case 8:
                result = 120_000
                break
            case 9:
                result = 120_000
                break
        }
    }
    return result
}
