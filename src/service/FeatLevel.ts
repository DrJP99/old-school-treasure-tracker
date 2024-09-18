export enum FeatLevel {
    minor = 'minor',
    major = 'major',
    extraordinary = 'extraordinary',
    campaign = 'campaign',
}

export const featLevelPercent = new Map<FeatLevel, number>([
    [FeatLevel.minor, 2],
    [FeatLevel.major, 5],
    [FeatLevel.extraordinary, 10],
    [FeatLevel.campaign, 15],
])
