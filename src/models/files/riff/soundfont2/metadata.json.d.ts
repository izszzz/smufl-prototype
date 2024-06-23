interface Metadata {
  id: ['phdr', 'pbag', 'pmod', 'pgen', 'inst', 'ibag', 'imod', 'igen', 'shdr', 'smpl'],
  metadataId: ['ifil', 'isng', 'INAM', 'ICRD', 'IENG', 'IPRD', 'ICOP', 'ICMT', 'ISFT'],
  bag: ['ibag', 'pbag'],
  mod: ['imod', 'pmod'],
  gen: ['igen', 'pgen'],
  generator: [
    'startAddrsOffset',
    'endAddrsOffset',
    'startloopAddrsOffset',
    'endloopAddrsOffset',
    'startAddrsCoarseOffset',
    'modLfoToPitch',
    'vibLfoToPitch',
    'modEnvToPitch',
    'initialFilterFc',
    'initialFilterQ',
    'modLfoToFilterFc',
    'modEnvToFilterFc',
    'endAddrsCoarseOffset',
    'modLfoToVolume',
    null,
    'chorusEffectsSend',
    'reverbEffectsSend',
    'pan',
    null,
    null,
    null,
    'delayModLFO',
    'freqModLFO',
    'delayVibLFO',
    'freqVibLFO',
    'delayModEnv',
    'attackModEnv',
    'holdModEnv',
    'decayModEnv',
    'sustainModEnv',
    'releaseModEnv',
    'keynumToModEnvHold',
    'keynumToModEnvDecay',
    'delayVolEnv',
    'attackVolEnv',
    'holdVolEnv',
    'decayVolEnv',
    'sustainVolEnv',
    'releaseVolEnv',
    'keynumToVolEnvHold',
    'keynumToVolEnvDecay',
    'instrument',
    null,
    'keyRange',
    'velRange',
    'startloopAddrsCoarseOffset',
    'keynum',
    'velocity',
    'initialAttenuation',
    null,
    'endloopAddrsCoarseOffset',
    'coarseTune',
    'fineTune',
    'sampleID',
    'sampleModes',
    null,
    'scaleTuning',
    'exclusiveClass',
    'overridingRootKey'
  ],
  genDefault: [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    13500,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    -12000,
    0,
    -12000,
    0,
    -12000,
    -12000,
    -12000,
    -12000,
    0,
    -12000,
    0,
    0,
    -12000,
    -12000,
    -12000,
    -12000,
    0,
    -12000,
    0,
    0,
    null,
    0,
    32512,
    32512,
    0,
    null,
    null,
    0,
    0,
    0,
    0,
    0,
    null,
    0,
    0,
    100,
    0,
    null,
    0,
    0
  ]
}

declare const Metadata: Metadata;

export = Metadata;