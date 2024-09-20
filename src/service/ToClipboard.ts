import { NPC } from './Character'
import { Denomination } from './Denomination'
import { Determiner } from './Determiner'
import { Monster } from './Monster'
import { Party } from './Party'
import { CoinTreasure, Treasure } from './Treasure'

export let ToClipboard = (party: Party): string => {
    let text = ''

    // Characters
    if (party.getCharacters().length > 0) {
        text += `### Characters:\n\n`
        text += `${party.getNumPC()} PCs: (`
        let i = 0
        for (let c of party.getPcs()) {
            text += `${c.getName()}`
            if (i !== party.getPcs().length - 1) {
                text += `, `
            }
            i++
        }
        i = 0
        text += `), ${party.getNumNPC()} NPCs: (`
        for (let c of party.getNpcs()) {
            text += `${c.getName()} [share: ${c instanceof NPC ? c.getShare() : ''}]`
            if (i !== party.getNpcs().length - 1) {
                text += `, `
            }
            i++
        }
        text += `)\n\n`
    }

    // Monsters

    const monsters: Array<Monster> = party.getMonsters()
    if (monsters.length > 0) {
        text += `### Monsters\n\n`

        for (let m of monsters) {
            text += `- ${m.getQty() > 1 ? m.getQty() : ''} ${m.getName()} (XP: ${m.getXp()}${m.getQty() > 1 ? ` each, ${m.getTotalXp()} total` : ''})\n`
        }

        text += `\nTotal: ${party.getMonsterXp()} XP\n\n`
    }

    // Treasure

    const treasure: Array<Treasure> = party.getTreasure()
    if (treasure.length > 0) {
        text += `### Treasure\n\n`

        for (let t of treasure) {
            let worth: string
            if (!(t instanceof CoinTreasure)) {
                worth = `worth ${t.getWorth()}${t.getWorthCoin()}${
                    t.getQty() > 1
                        ? ` ${t.getWorthDeterminer() === Determiner.each ? `${t.getWorthDeterminer()},${t.getWorth() * t.getQty()}${t.getWorthCoin()}total` : ''}`
                        : ''
                }`

                text += `- ${t.getQty() > 1 ? `${t.getQty()} ` : ''}${t.getName()}${t.getDescription().length > 0 ? `(${t.getDescription()})` : ''}${t.getWorth() > 0 ? `, (${worth})` : ''}\n`
            } else {
                text += `- ${t.toString()}${t.getWorthCoin() !== Denomination.gp ? ` (${t.toGp(t.getQty(), t.getWorthCoin())}gp)` : ''}\n`
            }
        }

        text += `\nTotal: ${party.getTreasureXp()} XP/gp worth of treasure\n\n`
    }

    // Feats

    text += `### Feats of Exploration\n\n`
    text += `Party TXP: ${party.getPartyTxp()}\n\n`

    let feats = party.getFeats()
    for (let f of feats) {
        text += `- ${f.getName()} (${f.getFeatLevel()})${f.getDescription().length > 1 ? ` - ${f.getDescription()}` : ''} - ${f.getXP(party.getPartyTxp())} XP \n`
    }

    text += `\nTotal: ${party.getFeatXp()} XP\n\n`

    // Totals

    text += `### Total\n\n`
    text += `Total XP: ${party.getTotalXp()}\n\n`
    text += `XP per PC: ${Math.round(party.getXpPerPcShare())}\n\n`
    text += `Share of treasure per PC: ${party.getGpPerPCShare()}gp\n\n`
    text += `XP per NPC: ${Math.round(party.getXpPerNpcShare())}\n\n`
    if (party.getNumNPC() > 0) {
        text += `Share of treasure per NPC:\n\n`

        Object.entries(party.getGpPerFractionalShare()).forEach(
            ([k, v]) => (text += `- (${k}): ${v}gp\n`)
        )
    }

    return text
}
