import { NPC } from './Character'
import { Denomination } from './Denomination'
import { Determiner } from './Determiner'
import { Monster } from './Monster'
import { Party } from './Party'
import { Coin_Treasure, Treasure } from './Treasure'

export let ToClipboard = (party: Party): string => {
    let text = ''

    // Characters
    if (party.get_characters().length > 0) {
        text += `### Characters:\n\n`
        text += `${party.getNumPC()} PCs: (`
        let i = 0
        for (let c of party.get_pcs()) {
            text += `${c.get_name()}`
            if (i !== party.get_pcs().length - 1) {
                text += `, `
            }
            i++
        }
        i = 0
        text += `), ${party.getNumNPC()} NPCs: (`
        for (let c of party.get_npcs()) {
            text += `${c.get_name()} [share: ${c instanceof NPC ? c.get_share() : ''}]`
            if (i !== party.get_npcs().length - 1) {
                text += `, `
            }
            i++
        }
        text += `)\n\n`
    }

    // Monsters

    const monsters: Array<Monster> = party.get_monsters()
    if (monsters.length > 0) {
        text += `### Monsters\n\n`

        for (let m of monsters) {
            text += `- ${m.get_qty() > 1 ? m.get_qty() : ''} ${m.get_name()} (XP: ${m.get_xp()}${m.get_qty() > 1 ? ` each, ${m.get_total_xp()} total` : ''})\n`
        }

        text += `\nTotal: ${party.get_monster_xp()} XP\n\n`
    }

    // Treasure

    const treasure: Array<Treasure> = party.get_treasure()
    if (treasure.length > 0) {
        text += `### Treasure\n\n`

        for (let t of treasure) {
            let worth: string
            if (!(t instanceof Coin_Treasure)) {
                worth = `worth ${t.getWorth()}${t.getWorth_coin()}${
                    t.getQty() > 1
                        ? ` ${t.getWorth_determiner() === Determiner.each ? `${t.getWorth_determiner()},${t.getWorth() * t.getQty()}${t.getWorth_coin()}total` : ''}`
                        : ''
                }`

                text += `- ${t.getQty() > 1 ? `${t.getQty()} ` : ''}${t.getName()}${t.getDescription().length > 0 ? `(${t.getDescription()})` : ''}${t.getWorth() > 0 ? `, (${worth})` : ''}\n`
            } else {
                text += `- ${t.to_string()}${t.getWorth_coin() !== Denomination.gp ? ` (${t.to_gp(t.getQty(), t.getWorth_coin())}gp)` : ''}\n`
            }
        }

        text += `\nTotal: ${party.get_treasure_xp()} XP/gp worth of treasure\n\n`
    }

    // Feats

    text += `### Feats of Exploration\n\n`
    text += `Party TXP: ${party.get_party_txp()}\n\n`

    let feats = party.get_feats()
    for (let f of feats) {
        text += `- ${f.getName()} (${f.getFeatLevel()})${f.getDescription().length > 1 ? ` - ${f.getDescription()}` : ''} - ${f.getXP(party.get_party_txp())} XP \n`
    }

    text += `\nTotal: ${party.get_feat_xp()} XP\n\n`

    // Totals

    text += `### Total\n\n`
    text += `Total XP: ${party.get_total_xp()}\n\n`
    text += `XP per PC: ${Math.round(party.get_xp_per_pc_share())}\n\n`
    text += `XP per NPC: ${Math.round(party.get_xp_per_npc_share())}\n\n`

    return text
}
