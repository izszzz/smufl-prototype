export type anyURI = string;
export type decimal = string;
export type ID = string;
export type IDREF = string;
export type NMTOKEN = string;
export type integer = number;
export type nonNegativeInteger = number;
export type positiveInteger = number;
export type token = string;
export type date = string;
export module XML {
    export type lang = string;
    export type space = string;
}
export module XLink {
    export type href = string;
    export type type = string;
    export type role = string;
    export type title = string;
    export type show = string;
    export type actuate = string;
}
export module Type {
    export type AboveBelow = "above" | "below";
    export type BeamLevel = positiveInteger;
    export type Color = token;
    export type CommaSeparatedText = token;
    export type CssFontSize = "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large";
    export type Divisions = decimal;
    export type EnclosureShape = "rectangle" | "square" | "oval" | "circle" | "bracket" | "inverted-bracket" | "triangle" | "diamond" | "pentagon" | "hexagon" | "heptagon" | "octagon" | "nonagon" | "decagon" | "none";
    export type FermataShape = "normal" | "angled" | "square" | "double-angled" | "double-square" | "double-dot" | "half-curve" | "curlew" | "";
    export type FontFamily = CommaSeparatedText;
    export type FontSize = decimal | CssFontSize;
    export type FontStyle = "normal" | "italic";
    export type FontWeight = "normal" | "bold";
    export type LeftCenterRight = "left" | "center" | "right";
    export type LeftRight = "left" | "right";
    export type LineLength = "short" | "medium" | "long";
    export type LineShape = "straight" | "curved";
    export type LineType = "solid" | "dashed" | "dotted" | "wavy";
    export type Midi16 = positiveInteger;
    export type Midi128 = positiveInteger;
    export type Midi16384 = positiveInteger;
    export type Mute = "on" | "off" | "straight" | "cup" | "harmon-no-stem" | "harmon-stem" | "bucket" | "plunger" | "hat" | "solotone" | "practice" | "stop-mute" | "stop-hand" | "echo" | "palm";
    export type NonNegativeDecimal = decimal;
    export type NumberLevel = positiveInteger;
    export type NumberOfLines = nonNegativeInteger;
    export type NumberOrNormal = decimal;
    export type NumeralValue = positiveInteger;
    export type OverUnder = "over" | "under";
    export type Percent = decimal;
    export type PositiveDecimal = decimal;
    export type PositiveDivisions = Divisions;
    export type PositiveIntegerOrEmpty = positiveInteger;
    export type RotationDegrees = decimal;
    export type SemiPitched = "high" | "medium-high" | "medium" | "medium-low" | "low" | "very-low";
    export type SmuflGlyphName = NMTOKEN;
    export type SmuflAccidentalGlyphName = SmuflGlyphName;
    export type SmuflCodaGlyphName = SmuflGlyphName;
    export type SmuflLyricsGlyphName = SmuflGlyphName;
    export type SmuflPictogramGlyphName = SmuflGlyphName;
    export type SmuflSegnoGlyphName = SmuflGlyphName;
    export type SmuflWavyLineGlyphName = SmuflGlyphName;
    export type StartNote = "upper" | "main" | "below";
    export type StartStop = "start" | "stop";
    export type StartStopContinue = "start" | "stop" | "continue";
    export type StartStopSingle = "start" | "stop" | "single";
    export type StringNumber = positiveInteger;
    export type SymbolSize = "full" | "cue" | "grace-cue" | "large";
    export type Tenths = decimal;
    export type TextDirection = "ltr" | "rtl" | "lro" | "rlo";
    export type TiedType = "start" | "stop" | "continue" | "let-ring";
    export type TimeOnly = token;
    export type TopBottom = "top" | "bottom";
    export type TremoloType = "start" | "stop" | "single" | "unmeasured";
    export type TrillBeats = decimal;
    export type TrillStep = "whole" | "half" | "unison";
    export type TwoNoteTurn = "whole" | "half" | "none";
    export type UpDown = "up" | "down";
    export type UprightInverted = "upright" | "inverted";
    export type Valign = "top" | "middle" | "bottom" | "baseline";
    export type ValignImage = "top" | "middle" | "bottom";
    export type YesNo = "yes" | "no";
    export type YesNoNumber = YesNo | decimal;
    export type YyyyMmDd = date;
    export type CancelLocation = "left" | "right" | "before-barline";
    export type ClefSign = "G" | "F" | "C" | "percussion" | "TAB" | "jianpu" | "none";
    export type Fifths = integer;
    export type Mode = string;
    export type ShowFrets = "numbers" | "letters";
    export type StaffLine = positiveInteger;
    export type StaffLinePosition = integer;
    export type StaffNumber = positiveInteger;
    export type StaffType = "ossia" | "editorial" | "cue" | "alternate" | "regular";
    export type TimeRelation = "parentheses" | "bracket" | "equals" | "slash" | "space" | "hyphen";
    export type TimeSeparator = "none" | "horizontal" | "diagonal" | "vertical" | "adjacent";
    export type TimeSymbol = "common" | "cut" | "single-number" | "note" | "dotted-note" | "normal";
    export type BackwardForward = "backward" | "forward";
    export type BarStyle = "regular" | "dotted" | "dashed" | "heavy" | "light-light" | "light-heavy" | "heavy-light" | "heavy-heavy" | "tick" | "short" | "none";
    export type EndingNumber = token;
    export type RightLeftMiddle = "right" | "left" | "middle";
    export type StartStopDiscontinue = "start" | "stop" | "discontinue";
    export type Winged = "none" | "straight" | "curved" | "double-straight" | "double-curved";
    export type AccordionMiddle = positiveInteger;
    export type BeaterValue = "bow" | "chime hammer" | "coin" | "drum stick" | "finger" | "fingernail" | "fist" | "guiro scraper" | "hammer" | "hand" | "jazz stick" | "knitting needle" | "metal hammer" | "slide brush on gong" | "snare stick" | "spoon mallet" | "superball" | "triangle beater" | "triangle beater plain" | "wire brush";
    export type DegreeSymbolValue = "major" | "minor" | "augmented" | "diminished" | "half-diminished";
    export type DegreeTypeValue = "add" | "alter" | "subtract";
    export type EffectValue = "anvil" | "auto horn" | "bird whistle" | "cannon" | "duck call" | "gun shot" | "klaxon horn" | "lions roar" | "lotus flute" | "megaphone" | "police whistle" | "siren" | "slide whistle" | "thunder sheet" | "wind machine" | "wind whistle";
    export type GlassValue = "glass harmonica" | "glass harp" | "wind chimes";
    export type HarmonyArrangement = "vertical" | "horizontal" | "diagonal";
    export type HarmonyType = "explicit" | "implied" | "alternate";
    export type KindValue = "major" | "minor" | "augmented" | "diminished" | "dominant" | "major-seventh" | "minor-seventh" | "diminished-seventh" | "augmented-seventh" | "half-diminished" | "major-minor" | "major-sixth" | "minor-sixth" | "dominant-ninth" | "major-ninth" | "minor-ninth" | "dominant-11th" | "major-11th" | "minor-11th" | "dominant-13th" | "major-13th" | "minor-13th" | "suspended-second" | "suspended-fourth" | "Neapolitan" | "Italian" | "French" | "German" | "pedal" | "power" | "Tristan" | "other" | "none";
    export type LineEnd = "up" | "down" | "both" | "arrow" | "none";
    export type MeasureNumberingValue = "none" | "measure" | "system";
    export type MembraneValue = "bass drum" | "bass drum on side" | "bongos" | "Chinese tomtom" | "conga drum" | "cuica" | "goblet drum" | "Indo-American tomtom" | "Japanese tomtom" | "military drum" | "snare drum" | "snare drum snares off" | "tabla" | "tambourine" | "tenor drum" | "timbales" | "tomtom";
    export type MetalValue = "agogo" | "almglocken" | "bell" | "bell plate" | "bell tree" | "brake drum" | "cencerro" | "chain rattle" | "Chinese cymbal" | "cowbell" | "crash cymbals" | "crotale" | "cymbal tongs" | "domed gong" | "finger cymbals" | "flexatone" | "gong" | "hi-hat" | "high-hat cymbals" | "handbell" | "jaw harp" | "jingle bells" | "musical saw" | "shell bells" | "sistrum" | "sizzle cymbal" | "sleigh bells" | "suspended cymbal" | "tam tam" | "tam tam with beater" | "triangle" | "Vietnamese hat";
    export type Milliseconds = nonNegativeInteger;
    export type NumeralMode = "major" | "minor" | "natural minor" | "melodic minor" | "harmonic minor";
    export type OnOff = "on" | "off";
    export type PedalType = "start" | "stop" | "sostenuto" | "change" | "continue" | "discontinue" | "resume";
    export type PitchedValue = "celesta" | "chimes" | "glockenspiel" | "lithophone" | "mallet" | "marimba" | "steel drums" | "tubaphone" | "tubular chimes" | "vibraphone" | "xylophone";
    export type PrincipalVoiceSymbol = "Hauptstimme" | "Nebenstimme" | "plain" | "none";
    export type StaffDivideSymbol = "down" | "up" | "up-down";
    export type StartStopChangeContinue = "start" | "stop" | "change" | "continue";
    export type SyncType = "none" | "tempo" | "mostly-tempo" | "mostly-event" | "event" | "always-event";
    export type SystemRelationNumber = "only-top" | "only-bottom" | "also-top" | "also-bottom" | "none";
    export type SystemRelation = "only-top" | "also-top" | "none";
    export type TipDirection = "up" | "down" | "left" | "right" | "northwest" | "northeast" | "southeast" | "southwest";
    export type StickLocation = "center" | "rim" | "cymbal bell" | "cymbal edge";
    export type StickMaterial = "soft" | "medium" | "hard" | "shaded" | "x";
    export type StickType = "bass drum" | "double bass drum" | "glockenspiel" | "gum" | "hammer" | "superball" | "timpani" | "wound" | "xylophone" | "yarn";
    export type UpDownStopContinue = "up" | "down" | "stop" | "continue";
    export type WedgeType = "crescendo" | "diminuendo" | "stop" | "continue";
    export type WoodValue = "bamboo scraper" | "board clapper" | "cabasa" | "castanets" | "castanets with handle" | "claves" | "football rattle" | "guiro" | "log drum" | "maraca" | "maracas" | "quijada" | "rainstick" | "ratchet" | "reco-reco" | "sandpaper blocks" | "slit drum" | "temple block" | "vibraslap" | "whip" | "wood block";
    export type DistanceType = token;
    export type GlyphType = token;
    export type LineWidthType = token;
    export type MarginType = "odd" | "even" | "both";
    export type Millimeters = decimal;
    export type NoteSizeType = "cue" | "grace" | "grace-cue" | "large";
    export type AccidentalValue = "sharp" | "natural" | "flat" | "double-sharp" | "sharp-sharp" | "flat-flat" | "natural-sharp" | "natural-flat" | "quarter-flat" | "quarter-sharp" | "three-quarters-flat" | "three-quarters-sharp" | "sharp-down" | "sharp-up" | "natural-down" | "natural-up" | "flat-down" | "flat-up" | "double-sharp-down" | "double-sharp-up" | "flat-flat-down" | "flat-flat-up" | "arrow-down" | "arrow-up" | "triple-sharp" | "triple-flat" | "slash-quarter-sharp" | "slash-sharp" | "slash-flat" | "double-slash-flat" | "sharp-1" | "sharp-2" | "sharp-3" | "sharp-5" | "flat-1" | "flat-2" | "flat-3" | "flat-4" | "sori" | "koron" | "other";
    export type ArrowDirection = "left" | "up" | "right" | "down" | "northwest" | "northeast" | "southeast" | "southwest" | "left right" | "up down" | "northwest southeast" | "northeast southwest" | "other";
    export type ArrowStyle = "single" | "double" | "filled" | "hollow" | "paired" | "combined" | "other";
    export type BeamValue = "begin" | "continue" | "end" | "forward hook" | "backward hook";
    export type BendShape = "angled" | "curved";
    export type BreathMarkValue = "" | "comma" | "tick" | "upbow" | "salzedo";
    export type CaesuraValue = "normal" | "thick" | "short" | "curved" | "single" | "";
    export type CircularArrow = "clockwise" | "anticlockwise";
    export type Fan = "accel" | "rit" | "none";
    export type HandbellValue = "belltree" | "damp" | "echo" | "gyro" | "hand martellato" | "mallet lift" | "mallet table" | "martellato" | "martellato lift" | "muted martellato" | "pluck lift" | "swing";
    export type HarmonClosedLocation = "right" | "bottom" | "left" | "top";
    export type HarmonClosedValue = "yes" | "no" | "half";
    export type HoleClosedLocation = "right" | "bottom" | "left" | "top";
    export type HoleClosedValue = "yes" | "no" | "half";
    export type NoteTypeValue = "1024th" | "512th" | "256th" | "128th" | "64th" | "32nd" | "16th" | "eighth" | "quarter" | "half" | "whole" | "breve" | "long" | "maxima";
    export type NoteheadValue = "slash" | "triangle" | "diamond" | "square" | "cross" | "x" | "circle-x" | "inverted triangle" | "arrow down" | "arrow up" | "circled" | "slashed" | "back slashed" | "normal" | "cluster" | "circle dot" | "left triangle" | "rectangle" | "none" | "do" | "re" | "mi" | "fa" | "fa up" | "so" | "la" | "ti" | "other";
    export type Octave = integer;
    export type Semitones = decimal;
    export type ShowTuplet = "actual" | "both" | "none";
    export type StemValue = "down" | "up" | "double" | "none";
    export type Step = "A" | "B" | "C" | "D" | "E" | "F" | "G";
    export type Syllabic = "single" | "begin" | "end" | "middle";
    export type TapHand = "left" | "right";
    export type TremoloMarks = integer;
    export type GroupBarlineValue = "yes" | "no" | "Mensurstrich";
    export type GroupSymbolValue = "none" | "brace" | "line" | "bracket" | "square";
    export type MeasureText = token;
    export type SwingTypeValue = "16th" | "eighth";
    export class Directive {
        constructor(public children: string, public PrintStyle: AttributeGroup.PrintStyle, public xmlLang?: XML.lang) { }
    }
    export class AccidentalText {
        constructor(public children: Type.AccidentalValue, public TextFormatting: AttributeGroup.TextFormatting, public smufl?: Type.SmuflAccidentalGlyphName) { }
    }
    export class Coda {
        constructor(public children: [
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public smufl?: Type.SmuflCodaGlyphName) { }
    }
    export class Dynamics {
        constructor(public children: [
            {
                p: Type.Empty;
            } | {
                pp: Type.Empty;
            } | {
                ppp: Type.Empty;
            } | {
                pppp: Type.Empty;
            } | {
                ppppp: Type.Empty;
            } | {
                pppppp: Type.Empty;
            } | {
                f: Type.Empty;
            } | {
                ff: Type.Empty;
            } | {
                fff: Type.Empty;
            } | {
                ffff: Type.Empty;
            } | {
                fffff: Type.Empty;
            } | {
                ffffff: Type.Empty;
            } | {
                mp: Type.Empty;
            } | {
                mf: Type.Empty;
            } | {
                sf: Type.Empty;
            } | {
                sfp: Type.Empty;
            } | {
                sfpp: Type.Empty;
            } | {
                fp: Type.Empty;
            } | {
                rf: Type.Empty;
            } | {
                rfz: Type.Empty;
            } | {
                sfz: Type.Empty;
            } | {
                sffz: Type.Empty;
            } | {
                fz: Type.Empty;
            } | {
                n: Type.Empty;
            } | {
                pf: Type.Empty;
            } | {
                sfzp: Type.Empty;
            } | {
                otherDynamics: Type.OtherText;
            }
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public Placement: AttributeGroup.Placement, public TextDecoration: AttributeGroup.TextDecoration, public Enclosure: AttributeGroup.Enclosure, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Empty {
        constructor(public children: [
        ]) { }
    }
    export class EmptyPlacement {
        constructor(public children: [
        ], public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class EmptyPlacementSmufl {
        constructor(public children: [
        ], public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public Smufl: AttributeGroup.Smufl) { }
    }
    export class EmptyPrintStyle {
        constructor(public children: [
        ], public PrintStyle: AttributeGroup.PrintStyle) { }
    }
    export class EmptyPrintStyleAlign {
        constructor(public children: [
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign) { }
    }
    export class EmptyPrintStyleAlignId {
        constructor(public children: [
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class EmptyPrintObjectStyleAlign {
        constructor(public children: [
        ], public PrintObject: AttributeGroup.PrintObject, public PrintStyleAlign: AttributeGroup.PrintStyleAlign) { }
    }
    export class EmptyTrillSound {
        constructor(public children: [
        ], public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public TrillSound: AttributeGroup.TrillSound) { }
    }
    export class HorizontalTurn {
        constructor(public children: [
        ], public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public TrillSound: AttributeGroup.TrillSound, public slash?: Type.YesNo) { }
    }
    export class Fermata {
        constructor(public children: Type.FermataShape, public PrintStyle: AttributeGroup.PrintStyle, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_?: Type.UprightInverted) { }
    }
    export class Fingering {
        constructor(public children: string, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public substitution?: Type.YesNo, public alternate?: Type.YesNo) { }
    }
    export class FormattedSymbol {
        constructor(public children: Type.SmuflGlyphName, public SymbolFormatting: AttributeGroup.SymbolFormatting) { }
    }
    export class FormattedSymbolId {
        constructor(public children: Type.SmuflGlyphName, public SymbolFormatting: AttributeGroup.SymbolFormatting, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class FormattedText {
        constructor(public children: string, public TextFormatting: AttributeGroup.TextFormatting) { }
    }
    export class FormattedTextId {
        constructor(public children: string, public TextFormatting: AttributeGroup.TextFormatting, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Fret {
        constructor(public children: nonNegativeInteger, public Font: AttributeGroup.Font, public Color: AttributeGroup.Color) { }
    }
    export class Level {
        constructor(public children: string, public LevelDisplay: AttributeGroup.LevelDisplay, public reference?: Type.YesNo, public type_?: Type.StartStopSingle) { }
    }
    export class MidiDevice {
        constructor(public children: string, public port?: Type.Midi16, public id?: IDREF) { }
    }
    export class MidiInstrument {
        constructor(public children: [
            [
                {
                    midiChannel: Type.Midi16;
                },
                {
                    midiName: string;
                },
                {
                    midiBank: Type.Midi16384;
                },
                {
                    midiProgram: Type.Midi128;
                },
                {
                    midiUnpitched: Type.Midi128;
                },
                {
                    volume: Type.Percent;
                },
                {
                    pan: Type.RotationDegrees;
                },
                {
                    elevation: Type.RotationDegrees;
                }
            ]
        ], public id: IDREF) { }
    }
    export class NameDisplay {
        constructor(public children: [
            [
                {
                    displayText: Type.FormattedText;
                } | {
                    accidentalText: Type.AccidentalText;
                }
            ]
        ], public PrintObject: AttributeGroup.PrintObject) { }
    }
    export class OtherPlay {
        constructor(public children: string, public type_: token) { }
    }
    export class Play {
        constructor(public children: [
            [
                {
                    ipa: string;
                } | {
                    mute: Type.Mute;
                } | {
                    semiPitched: Type.SemiPitched;
                } | {
                    otherPlay: Type.OtherPlay;
                }
            ]
        ], public id?: IDREF) { }
    }
    export class Segno {
        constructor(public children: [
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public smufl?: Type.SmuflSegnoGlyphName) { }
    }
    export class String {
        constructor(public children: Type.StringNumber, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class TypedText {
        constructor(public children: string, public type_?: token) { }
    }
    export class WavyLine {
        constructor(public children: [
        ], public Position: AttributeGroup.Position, public Placement: AttributeGroup.Placement, public Color: AttributeGroup.Color, public TrillSound: AttributeGroup.TrillSound, public type_: Type.StartStopContinue, public number_?: Type.NumberLevel, public smufl?: Type.SmuflWavyLineGlyphName) { }
    }
    export class Attributes {
        constructor(public children: [
            [
                {
                    divisions: Type.PositiveDivisions;
                },
                {
                    key: Type.Key[];
                },
                {
                    time: Type.Time[];
                },
                {
                    staves: nonNegativeInteger;
                },
                {
                    partSymbol: Type.PartSymbol;
                },
                {
                    instruments: nonNegativeInteger;
                },
                {
                    clef: Type.Clef[];
                },
                {
                    staffDetails: Type.StaffDetails[];
                },
                {
                    directive: Type.Directive[];
                },
                {
                    measureStyle: Type.MeasureStyle[];
                },
                {
                    transpose: Type.Transpose[];
                } | {
                    forPart: Type.ForPart[];
                },
                Group.Editorial
            ]
        ]) { }
    }
    export class BeatRepeat {
        constructor(public children: [
            Group.Slash
        ], public type_: Type.StartStop, public slashes?: positiveInteger, public useDots?: Type.YesNo) { }
    }
    export class Cancel {
        constructor(public children: Type.Fifths, public location?: Type.CancelLocation) { }
    }
    export class Clef {
        constructor(public children: [
            Group.Clef
        ], public PrintStyle: AttributeGroup.PrintStyle, public PrintObject: AttributeGroup.PrintObject, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_?: Type.StaffNumber, public additional?: Type.YesNo, public size?: Type.SymbolSize, public afterBarline?: Type.YesNo) { }
    }
    export class Double {
        constructor(public children: [
        ], public above?: Type.YesNo) { }
    }
    export class ForPart {
        constructor(public children: [
            [
                {
                    partClef: Type.PartClef;
                },
                {
                    partTranspose: Type.PartTranspose;
                }
            ]
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_?: Type.StaffNumber) { }
    }
    export class Interchangeable {
        constructor(public children: [
            [
                {
                    timeRelation: Type.TimeRelation;
                },
                Group.TimeSignature[]
            ]
        ], public symbol_?: Type.TimeSymbol, public separator?: Type.TimeSeparator) { }
    }
    export class Key {
        constructor(public children: [
            [
                {
                    keyOctave: Type.KeyOctave[];
                },
                Group.TraditionalKey | Group.NonTraditionalKey[]
            ]
        ], public PrintStyle: AttributeGroup.PrintStyle, public PrintObject: AttributeGroup.PrintObject, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_?: Type.StaffNumber) { }
    }
    export class KeyAccidental {
        constructor(public children: Type.AccidentalValue, public smufl?: Type.SmuflAccidentalGlyphName) { }
    }
    export class KeyOctave {
        constructor(public children: Type.Octave, public number_: positiveInteger, public cancel?: Type.YesNo) { }
    }
    export class LineDetail {
        constructor(public children: [
        ], public Color: AttributeGroup.Color, public LineType: AttributeGroup.LineType, public PrintObject: AttributeGroup.PrintObject, public line: Type.StaffLine, public width?: Type.Tenths) { }
    }
    export class MeasureRepeat {
        constructor(public children: Type.PositiveIntegerOrEmpty, public type_: Type.StartStop, public slashes?: positiveInteger) { }
    }
    export class MeasureStyle {
        constructor(public children: [
            {
                multipleRest: Type.MultipleRest;
            } | {
                measureRepeat: Type.MeasureRepeat;
            } | {
                beatRepeat: Type.BeatRepeat;
            } | {
                slash: Type.Slash;
            }
        ], public Font: AttributeGroup.Font, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_?: Type.StaffNumber) { }
    }
    export class MultipleRest {
        constructor(public children: positiveInteger, public useSymbols?: Type.YesNo) { }
    }
    export class PartClef {
        constructor(public children: [
            Group.Clef
        ]) { }
    }
    export class PartSymbol {
        constructor(public children: Type.GroupSymbolValue, public Position: AttributeGroup.Position, public Color: AttributeGroup.Color, public topStaff?: Type.StaffNumber, public bottomStaff?: Type.StaffNumber) { }
    }
    export class PartTranspose {
        constructor(public children: [
            Group.Transpose
        ]) { }
    }
    export class Slash {
        constructor(public children: [
            Group.Slash
        ], public type_: Type.StartStop, public useDots?: Type.YesNo, public useStems?: Type.YesNo) { }
    }
    export class StaffDetails {
        constructor(public children: [
            [
                {
                    staffType: Type.StaffType;
                },
                {
                    staffTuning: Type.StaffTuning[];
                },
                {
                    capo: nonNegativeInteger;
                },
                {
                    staffSize: Type.StaffSize;
                },
                [
                    {
                        staffLines: nonNegativeInteger;
                    },
                    {
                        lineDetail: Type.LineDetail[];
                    }
                ]
            ]
        ], public PrintObject: AttributeGroup.PrintObject, public PrintSpacing: AttributeGroup.PrintSpacing, public number_?: Type.StaffNumber, public showFrets?: Type.ShowFrets) { }
    }
    export class StaffSize {
        constructor(public children: Type.NonNegativeDecimal, public scaling?: Type.NonNegativeDecimal) { }
    }
    export class StaffTuning {
        constructor(public children: [
            Group.Tuning
        ], public line: Type.StaffLine) { }
    }
    export class Time {
        constructor(public children: [
            {
                senzaMisura: string;
            } | [
                {
                    interchangeable: Type.Interchangeable;
                },
                Group.TimeSignature[]
            ]
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public PrintObject: AttributeGroup.PrintObject, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_?: Type.StaffNumber, public symbol_?: Type.TimeSymbol, public separator?: Type.TimeSeparator) { }
    }
    export class Transpose {
        constructor(public children: [
            Group.Transpose
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_?: Type.StaffNumber) { }
    }
    export class BarStyleColor {
        constructor(public children: Type.BarStyle, public Color: AttributeGroup.Color) { }
    }
    export class Barline {
        constructor(public children: [
            [
                {
                    barStyle: Type.BarStyleColor;
                },
                {
                    wavyLine: Type.WavyLine;
                },
                {
                    segno: Type.Segno;
                },
                {
                    coda: Type.Coda;
                },
                {
                    fermata: Type.Fermata[];
                },
                {
                    ending: Type.Ending;
                },
                {
                    repeat: Type.Repeat;
                },
                Group.Editorial
            ]
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public location: Type.RightLeftMiddle = "right", public segno?: token, public coda?: token, public divisions?: Type.Divisions) { }
    }
    export class Ending {
        constructor(public children: string, public PrintObject: AttributeGroup.PrintObject, public PrintStyle: AttributeGroup.PrintStyle, public SystemRelation: AttributeGroup.SystemRelation, public number_: Type.EndingNumber, public type_: Type.StartStopDiscontinue, public endLength?: Type.Tenths, public textX?: Type.Tenths, public textY?: Type.Tenths) { }
    }
    export class Repeat {
        constructor(public children: [
        ], public direction: Type.BackwardForward, public times?: nonNegativeInteger, public afterJump?: Type.YesNo, public winged?: Type.Winged) { }
    }
    export class Accord {
        constructor(public children: [
            Group.Tuning
        ], public string_?: Type.StringNumber) { }
    }
    export class AccordionRegistration {
        constructor(public children: [
            [
                {
                    accordionHigh: Type.Empty;
                },
                {
                    accordionMiddle: Type.AccordionMiddle;
                },
                {
                    accordionLow: Type.Empty;
                }
            ]
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Barre {
        constructor(public children: [
        ], public Color: AttributeGroup.Color, public type_: Type.StartStop) { }
    }
    export class Bass {
        constructor(public children: [
            [
                {
                    bassSeparator: Type.StyleText;
                },
                {
                    bassStep: Type.BassStep;
                },
                {
                    bassAlter: Type.HarmonyAlter;
                }
            ]
        ], public arrangement?: Type.HarmonyArrangement) { }
    }
    export class HarmonyAlter {
        constructor(public children: Type.Semitones, public PrintObject: AttributeGroup.PrintObject, public PrintStyle: AttributeGroup.PrintStyle, public location?: Type.LeftRight) { }
    }
    export class BassStep {
        constructor(public children: Type.Step, public PrintStyle: AttributeGroup.PrintStyle, public text?: token) { }
    }
    export class Beater {
        constructor(public children: Type.BeaterValue, public tip?: Type.TipDirection) { }
    }
    export class BeatUnitTied {
        constructor(public children: [
            Group.BeatUnit
        ]) { }
    }
    export class Bracket {
        constructor(public children: [
        ], public LineType: AttributeGroup.LineType, public DashedFormatting: AttributeGroup.DashedFormatting, public Position: AttributeGroup.Position, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStopContinue, public lineEnd: Type.LineEnd, public number_?: Type.NumberLevel, public endLength?: Type.Tenths) { }
    }
    export class Dashes {
        constructor(public children: [
        ], public DashedFormatting: AttributeGroup.DashedFormatting, public Position: AttributeGroup.Position, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStopContinue, public number_?: Type.NumberLevel) { }
    }
    export class Degree {
        constructor(public children: [
            [
                {
                    degreeValue: Type.DegreeValue;
                },
                {
                    degreeAlter: Type.DegreeAlter;
                },
                {
                    degreeType: Type.DegreeType;
                }
            ]
        ], public PrintObject: AttributeGroup.PrintObject) { }
    }
    export class DegreeAlter {
        constructor(public children: Type.Semitones, public PrintStyle: AttributeGroup.PrintStyle, public plusMinus?: Type.YesNo) { }
    }
    export class DegreeType {
        constructor(public children: Type.DegreeTypeValue, public PrintStyle: AttributeGroup.PrintStyle, public text?: token) { }
    }
    export class DegreeValue {
        constructor(public children: positiveInteger, public PrintStyle: AttributeGroup.PrintStyle, public symbol_?: Type.DegreeSymbolValue, public text?: token) { }
    }
    export class Direction {
        constructor(public children: [
            [
                {
                    directionType: Type.DirectionType[];
                },
                {
                    offset: Type.Offset;
                },
                {
                    sound: Type.Sound;
                },
                {
                    listening: Type.Listening;
                },
                Group.EditorialVoiceDirection,
                Group.Staff
            ]
        ], public Placement: AttributeGroup.Placement, public Directive: AttributeGroup.Directive, public SystemRelation: AttributeGroup.SystemRelation, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class DirectionType {
        constructor(public children: [
            {
                rehearsal: Type.FormattedTextId[];
            } | {
                segno: Type.Segno[];
            } | {
                coda: Type.Coda[];
            } | {
                wedge: Type.Wedge;
            } | {
                dynamics: Type.Dynamics[];
            } | {
                dashes: Type.Dashes;
            } | {
                bracket: Type.Bracket;
            } | {
                pedal: Type.Pedal;
            } | {
                metronome: Type.Metronome;
            } | {
                octaveShift: Type.OctaveShift;
            } | {
                harpPedals: Type.HarpPedals;
            } | {
                damp: Type.EmptyPrintStyleAlignId;
            } | {
                dampAll: Type.EmptyPrintStyleAlignId;
            } | {
                eyeglasses: Type.EmptyPrintStyleAlignId;
            } | {
                stringMute: Type.StringMute;
            } | {
                scordatura: Type.Scordatura;
            } | {
                image: Type.Image;
            } | {
                principalVoice: Type.PrincipalVoice;
            } | {
                percussion: Type.Percussion[];
            } | {
                accordionRegistration: Type.AccordionRegistration;
            } | {
                staffDivide: Type.StaffDivide;
            } | {
                otherDirection: Type.OtherDirection;
            }
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Effect {
        constructor(public children: Type.EffectValue, public smufl?: Type.SmuflPictogramGlyphName) { }
    }
    export class Feature {
        constructor(public children: string, public type_?: token) { }
    }
    export class FirstFret {
        constructor(public children: positiveInteger, public text?: token, public location?: Type.LeftRight) { }
    }
    export class Frame {
        constructor(public children: [
            [
                {
                    frameStrings: positiveInteger;
                },
                {
                    frameFrets: positiveInteger;
                },
                {
                    firstFret: Type.FirstFret;
                },
                {
                    frameNote: Type.FrameNote[];
                }
            ]
        ], public Position: AttributeGroup.Position, public Color: AttributeGroup.Color, public Halign: AttributeGroup.Halign, public ValignImage: AttributeGroup.ValignImage, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public height?: Type.Tenths, public width?: Type.Tenths, public unplayed?: token) { }
    }
    export class FrameNote {
        constructor(public children: [
            [
                {
                    string_: Type.String;
                },
                {
                    fret: Type.Fret;
                },
                {
                    fingering: Type.Fingering;
                },
                {
                    barre: Type.Barre;
                }
            ]
        ]) { }
    }
    export class Glass {
        constructor(public children: Type.GlassValue, public smufl?: Type.SmuflPictogramGlyphName) { }
    }
    export class Grouping {
        constructor(public children: [
            [
                {
                    feature: Type.Feature[];
                }
            ]
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStopSingle, public number_: token = "1", public memberOf?: token) { }
    }
    export class Harmony {
        constructor(public children: [
            [
                {
                    frame: Type.Frame;
                },
                {
                    offset: Type.Offset;
                },
                Group.HarmonyChord[],
                Group.Editorial,
                Group.Staff
            ]
        ], public PrintObject: AttributeGroup.PrintObject, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public SystemRelation: AttributeGroup.SystemRelation, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_?: Type.HarmonyType, public printFrame?: Type.YesNo, public arrangement?: Type.HarmonyArrangement) { }
    }
    export class HarpPedals {
        constructor(public children: [
            [
                {
                    pedalTuning: Type.PedalTuning[];
                }
            ]
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Image {
        constructor(public children: [
        ], public ImageAttributes: AttributeGroup.ImageAttributes, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class InstrumentChange {
        constructor(public children: [
            Group.VirtualInstrumentData
        ], public id: IDREF) { }
    }
    export class Inversion {
        constructor(public children: nonNegativeInteger, public PrintStyle: AttributeGroup.PrintStyle, public text?: token) { }
    }
    export class Kind {
        constructor(public children: Type.KindValue, public PrintStyle: AttributeGroup.PrintStyle, public Halign: AttributeGroup.Halign, public Valign: AttributeGroup.Valign, public useSymbols?: Type.YesNo, public text?: token, public stackDegrees?: Type.YesNo, public parenthesesDegrees?: Type.YesNo, public bracketDegrees?: Type.YesNo) { }
    }
    export class Listening {
        constructor(public children: [
            [
                {
                    offset: Type.Offset;
                },
                {
                    sync: Type.Sync;
                } | {
                    otherListening: Type.OtherListening;
                }
            ]
        ]) { }
    }
    export class MeasureNumbering {
        constructor(public children: Type.MeasureNumberingValue, public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public system?: Type.SystemRelationNumber, public staff?: Type.StaffNumber, public multipleRestAlways?: Type.YesNo, public multipleRestRange?: Type.YesNo) { }
    }
    export class Membrane {
        constructor(public children: Type.MembraneValue, public smufl?: Type.SmuflPictogramGlyphName) { }
    }
    export class Metal {
        constructor(public children: Type.MetalValue, public smufl?: Type.SmuflPictogramGlyphName) { }
    }
    export class Metronome {
        constructor(public children: [
            [
                {
                    beatUnitTied: Type.BeatUnitTied[];
                },
                {
                    perMinute: Type.PerMinute;
                } | [
                    {
                        beatUnitTied: Type.BeatUnitTied[];
                    },
                    Group.BeatUnit
                ],
                Group.BeatUnit
            ] | [
                {
                    metronomeArrows: Type.Empty;
                },
                {
                    metronomeNote: Type.MetronomeNote[];
                },
                [
                    {
                        metronomeRelation: string;
                    },
                    {
                        metronomeNote: Type.MetronomeNote[];
                    }
                ]
            ]
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public PrintObject: AttributeGroup.PrintObject, public Justify: AttributeGroup.Justify, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public parentheses?: Type.YesNo) { }
    }
    export class MetronomeBeam {
        constructor(public children: Type.BeamValue, public number_: Type.BeamLevel = 1) { }
    }
    export class MetronomeNote {
        constructor(public children: [
            [
                {
                    metronomeType: Type.NoteTypeValue;
                },
                {
                    metronomeDot: Type.Empty[];
                },
                {
                    metronomeBeam: Type.MetronomeBeam[];
                },
                {
                    metronomeTied: Type.MetronomeTied;
                },
                {
                    metronomeTuplet: Type.MetronomeTuplet;
                }
            ]
        ]) { }
    }
    export class MetronomeTied {
        constructor(public children: [
        ], public type_: Type.StartStop) { }
    }
    export class MetronomeTuplet {
        constructor(public children: [
        ]) { }
    }
    export class Numeral {
        constructor(public children: [
            [
                {
                    numeralRoot: Type.NumeralRoot;
                },
                {
                    numeralAlter: Type.HarmonyAlter;
                },
                {
                    numeralKey: Type.NumeralKey;
                }
            ]
        ]) { }
    }
    export class NumeralKey {
        constructor(public children: [
            [
                {
                    numeralFifths: Type.Fifths;
                },
                {
                    numeralMode: Type.NumeralMode;
                }
            ]
        ], public PrintObject: AttributeGroup.PrintObject) { }
    }
    export class NumeralRoot {
        constructor(public children: Type.NumeralValue, public PrintStyle: AttributeGroup.PrintStyle, public text?: token) { }
    }
    export class OctaveShift {
        constructor(public children: [
        ], public DashedFormatting: AttributeGroup.DashedFormatting, public PrintStyle: AttributeGroup.PrintStyle, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.UpDownStopContinue, public size: positiveInteger = 8, public number_?: Type.NumberLevel) { }
    }
    export class Offset {
        constructor(public children: Type.Divisions, public sound?: Type.YesNo) { }
    }
    export class OtherDirection {
        constructor(public children: string, public PrintObject: AttributeGroup.PrintObject, public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public Smufl: AttributeGroup.Smufl, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class OtherListening {
        constructor(public children: string, public type_: token, public player?: IDREF, public timeOnly?: Type.TimeOnly) { }
    }
    export class Pedal {
        constructor(public children: [
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.PedalType, public number_?: Type.NumberLevel, public line?: Type.YesNo, public sign?: Type.YesNo, public abbreviated?: Type.YesNo) { }
    }
    export class PedalTuning {
        constructor(public children: [
            [
                {
                    pedalStep: Type.Step;
                },
                {
                    pedalAlter: Type.Semitones;
                }
            ]
        ]) { }
    }
    export class PerMinute {
        constructor(public children: string, public Font: AttributeGroup.Font) { }
    }
    export class Percussion {
        constructor(public children: [
            {
                glass: Type.Glass;
            } | {
                metal: Type.Metal;
            } | {
                wood: Type.Wood;
            } | {
                pitched: Type.Pitched;
            } | {
                membrane: Type.Membrane;
            } | {
                effect: Type.Effect;
            } | {
                timpani: Type.Timpani;
            } | {
                beater: Type.Beater;
            } | {
                stick: Type.Stick;
            } | {
                stickLocation: Type.StickLocation;
            } | {
                otherPercussion: Type.OtherText;
            }
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public Enclosure: AttributeGroup.Enclosure, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Pitched {
        constructor(public children: Type.PitchedValue, public smufl?: Type.SmuflPictogramGlyphName) { }
    }
    export class PrincipalVoice {
        constructor(public children: string, public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStop, public symbol_: Type.PrincipalVoiceSymbol) { }
    }
    export class Print {
        constructor(public children: [
            [
                {
                    measureLayout: Type.MeasureLayout;
                },
                {
                    measureNumbering: Type.MeasureNumbering;
                },
                {
                    partNameDisplay: Type.NameDisplay;
                },
                {
                    partAbbreviationDisplay: Type.NameDisplay;
                },
                Group.Layout
            ]
        ], public PrintAttributes: AttributeGroup.PrintAttributes, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Root {
        constructor(public children: [
            [
                {
                    rootStep: Type.RootStep;
                },
                {
                    rootAlter: Type.HarmonyAlter;
                }
            ]
        ]) { }
    }
    export class RootStep {
        constructor(public children: Type.Step, public PrintStyle: AttributeGroup.PrintStyle, public text?: token) { }
    }
    export class Scordatura {
        constructor(public children: [
            [
                {
                    accord: Type.Accord[];
                }
            ]
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Sound {
        constructor(public children: [
            [
                {
                    swing: Type.Swing;
                },
                {
                    offset: Type.Offset;
                },
                [
                    {
                        instrumentChange: Type.InstrumentChange;
                    },
                    {
                        midiDevice: Type.MidiDevice;
                    },
                    {
                        midiInstrument: Type.MidiInstrument;
                    },
                    {
                        play: Type.Play;
                    }
                ]
            ]
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public tempo?: Type.NonNegativeDecimal, public dynamics?: Type.NonNegativeDecimal, public dacapo?: Type.YesNo, public segno?: token, public dalsegno?: token, public coda?: token, public tocoda?: token, public divisions?: Type.Divisions, public forwardRepeat?: Type.YesNo, public fine?: token, public timeOnly?: Type.TimeOnly, public pizzicato?: Type.YesNo, public pan?: Type.RotationDegrees, public elevation?: Type.RotationDegrees, public damperPedal?: Type.YesNoNumber, public softPedal?: Type.YesNoNumber, public sostenutoPedal?: Type.YesNoNumber) { }
    }
    export class StaffDivide {
        constructor(public children: [
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StaffDivideSymbol) { }
    }
    export class Stick {
        constructor(public children: [
            [
                {
                    stickType: Type.StickType;
                },
                {
                    stickMaterial: Type.StickMaterial;
                }
            ]
        ], public tip?: Type.TipDirection, public parentheses?: Type.YesNo, public dashedCircle?: Type.YesNo) { }
    }
    export class StringMute {
        constructor(public children: [
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.OnOff) { }
    }
    export class Swing {
        constructor(public children: [
            [
                {
                    swingStyle: string;
                },
                {
                    straight: Type.Empty;
                } | [
                    {
                        first: positiveInteger;
                    },
                    {
                        second: positiveInteger;
                    },
                    {
                        swingType: Type.SwingTypeValue;
                    }
                ]
            ]
        ]) { }
    }
    export class Sync {
        constructor(public children: [
        ], public type_: Type.SyncType, public latency?: Type.Milliseconds, public player?: IDREF, public timeOnly?: Type.TimeOnly) { }
    }
    export class Timpani {
        constructor(public children: [
        ], public smufl?: Type.SmuflPictogramGlyphName) { }
    }
    export class Wedge {
        constructor(public children: [
        ], public LineType: AttributeGroup.LineType, public DashedFormatting: AttributeGroup.DashedFormatting, public Position: AttributeGroup.Position, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.WedgeType, public number_?: Type.NumberLevel, public spread?: Type.Tenths, public niente?: Type.YesNo) { }
    }
    export class Wood {
        constructor(public children: Type.WoodValue, public smufl?: Type.SmuflPictogramGlyphName) { }
    }
    export class Encoding {
        constructor(public children: [
            {
                encodingDate: Type.YyyyMmDd;
            } | {
                encoder: Type.TypedText;
            } | {
                software: string;
            } | {
                encodingDescription: string;
            } | {
                supports: Type.Supports;
            }
        ]) { }
    }
    export class Identification {
        constructor(public children: [
            [
                {
                    creator: Type.TypedText[];
                },
                {
                    rights: Type.TypedText[];
                },
                {
                    encoding: Type.Encoding;
                },
                {
                    source: string;
                },
                {
                    relation: Type.TypedText[];
                },
                {
                    miscellaneous: Type.Miscellaneous;
                }
            ]
        ]) { }
    }
    export class Miscellaneous {
        constructor(public children: [
            [
                {
                    miscellaneousField: Type.MiscellaneousField[];
                }
            ]
        ]) { }
    }
    export class MiscellaneousField {
        constructor(public children: string, public name: token) { }
    }
    export class Supports {
        constructor(public children: [
        ], public type_: Type.YesNo, public element: NMTOKEN, public attribute?: NMTOKEN, public value?: token) { }
    }
    export class Appearance {
        constructor(public children: [
            [
                {
                    lineWidth: Type.LineWidth[];
                },
                {
                    noteSize: Type.NoteSize[];
                },
                {
                    distance: Type.Distance[];
                },
                {
                    glyph: Type.Glyph[];
                },
                {
                    otherAppearance: Type.OtherAppearance[];
                }
            ]
        ]) { }
    }
    export class Distance {
        constructor(public children: Type.Tenths, public type_: Type.DistanceType) { }
    }
    export class Glyph {
        constructor(public children: Type.SmuflGlyphName, public type_: Type.GlyphType) { }
    }
    export class LineWidth {
        constructor(public children: Type.Tenths, public type_: Type.LineWidthType) { }
    }
    export class MeasureLayout {
        constructor(public children: [
            [
                {
                    measureDistance: Type.Tenths;
                }
            ]
        ]) { }
    }
    export class NoteSize {
        constructor(public children: Type.NonNegativeDecimal, public type_: Type.NoteSizeType) { }
    }
    export class OtherAppearance {
        constructor(public children: string, public type_: token) { }
    }
    export class PageLayout {
        constructor(public children: [
            [
                {
                    pageMargins: Type.PageMargins[];
                },
                [
                    {
                        pageHeight: Type.Tenths;
                    },
                    {
                        pageWidth: Type.Tenths;
                    }
                ]
            ]
        ]) { }
    }
    export class PageMargins {
        constructor(public children: [
            Group.AllMargins
        ], public type_?: Type.MarginType) { }
    }
    export class Scaling {
        constructor(public children: [
            [
                {
                    millimeters: Type.Millimeters;
                },
                {
                    tenths: Type.Tenths;
                }
            ]
        ]) { }
    }
    export class StaffLayout {
        constructor(public children: [
            [
                {
                    staffDistance: Type.Tenths;
                }
            ]
        ], public number_?: Type.StaffNumber) { }
    }
    export class SystemDividers {
        constructor(public children: [
            [
                {
                    leftDivider: Type.EmptyPrintObjectStyleAlign;
                },
                {
                    rightDivider: Type.EmptyPrintObjectStyleAlign;
                }
            ]
        ]) { }
    }
    export class SystemLayout {
        constructor(public children: [
            [
                {
                    systemMargins: Type.SystemMargins;
                },
                {
                    systemDistance: Type.Tenths;
                },
                {
                    topSystemDistance: Type.Tenths;
                },
                {
                    systemDividers: Type.SystemDividers;
                }
            ]
        ]) { }
    }
    export class SystemMargins {
        constructor(public children: [
            Group.LeftRightMargins
        ]) { }
    }
    export class Bookmark {
        constructor(public children: [
        ], public ElementPosition: AttributeGroup.ElementPosition, public id: ID, public name?: token) { }
    }
    export class Link {
        constructor(public children: [
        ], public LinkAttributes: AttributeGroup.LinkAttributes, public ElementPosition: AttributeGroup.ElementPosition, public Position: AttributeGroup.Position, public name?: token) { }
    }
    export class Accidental {
        constructor(public children: Type.AccidentalValue, public LevelDisplay: AttributeGroup.LevelDisplay, public PrintStyle: AttributeGroup.PrintStyle, public cautionary?: Type.YesNo, public editorial?: Type.YesNo, public smufl?: Type.SmuflAccidentalGlyphName) { }
    }
    export class AccidentalMark {
        constructor(public children: Type.AccidentalValue, public LevelDisplay: AttributeGroup.LevelDisplay, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public smufl?: Type.SmuflAccidentalGlyphName) { }
    }
    export class Arpeggiate {
        constructor(public children: [
        ], public Position: AttributeGroup.Position, public Placement: AttributeGroup.Placement, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_?: Type.NumberLevel, public direction?: Type.UpDown, public unbroken?: Type.YesNo) { }
    }
    export class Articulations {
        constructor(public children: [
            {
                accent: Type.EmptyPlacement;
            } | {
                strongAccent: Type.StrongAccent;
            } | {
                staccato: Type.EmptyPlacement;
            } | {
                tenuto: Type.EmptyPlacement;
            } | {
                detachedLegato: Type.EmptyPlacement;
            } | {
                staccatissimo: Type.EmptyPlacement;
            } | {
                spiccato: Type.EmptyPlacement;
            } | {
                scoop: Type.EmptyLine;
            } | {
                plop: Type.EmptyLine;
            } | {
                doit: Type.EmptyLine;
            } | {
                falloff: Type.EmptyLine;
            } | {
                breathMark: Type.BreathMark;
            } | {
                caesura: Type.Caesura;
            } | {
                stress: Type.EmptyPlacement;
            } | {
                unstress: Type.EmptyPlacement;
            } | {
                softAccent: Type.EmptyPlacement;
            } | {
                otherArticulation: Type.OtherPlacementText;
            }
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Arrow {
        constructor(public children: [
            {
                circularArrow: Type.CircularArrow;
            } | [
                {
                    arrowDirection: Type.ArrowDirection;
                },
                {
                    arrowStyle: Type.ArrowStyle;
                },
                {
                    arrowhead: Type.Empty;
                }
            ]
        ], public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public Smufl: AttributeGroup.Smufl) { }
    }
    export class Assess {
        constructor(public children: [
        ], public type_: Type.YesNo, public player?: IDREF, public timeOnly?: Type.TimeOnly) { }
    }
    export class Backup {
        constructor(public children: [
            [
                Group.Duration,
                Group.Editorial
            ]
        ]) { }
    }
    export class Beam {
        constructor(public children: Type.BeamValue, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_: Type.BeamLevel = 1, public repeater?: Type.YesNo, public fan?: Type.Fan) { }
    }
    export class Bend {
        constructor(public children: [
            [
                {
                    bendAlter: Type.Semitones;
                },
                {
                    withBar: Type.PlacementText;
                },
                {
                    preBend: Type.Empty;
                } | {
                    release: Type.Release;
                }
            ]
        ], public PrintStyle: AttributeGroup.PrintStyle, public BendSound: AttributeGroup.BendSound, public shape?: Type.BendShape) { }
    }
    export class BreathMark {
        constructor(public children: Type.BreathMarkValue, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class Caesura {
        constructor(public children: Type.CaesuraValue, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class Elision {
        constructor(public children: string, public Font: AttributeGroup.Font, public Color: AttributeGroup.Color, public smufl?: Type.SmuflLyricsGlyphName) { }
    }
    export class EmptyLine {
        constructor(public children: [
        ], public LineShape: AttributeGroup.LineShape, public LineType: AttributeGroup.LineType, public LineLength: AttributeGroup.LineLength, public DashedFormatting: AttributeGroup.DashedFormatting, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class Extend {
        constructor(public children: [
        ], public Position: AttributeGroup.Position, public Color: AttributeGroup.Color, public type_?: Type.StartStopContinue) { }
    }
    export class Figure {
        constructor(public children: [
            [
                {
                    prefix: Type.StyleText;
                },
                {
                    figureNumber: Type.StyleText;
                },
                {
                    suffix: Type.StyleText;
                },
                {
                    extend: Type.Extend;
                },
                Group.Editorial
            ]
        ]) { }
    }
    export class FiguredBass {
        constructor(public children: [
            [
                {
                    figure: Type.Figure[];
                },
                Group.Duration,
                Group.Editorial
            ]
        ], public PrintStyleAlign: AttributeGroup.PrintStyleAlign, public Placement: AttributeGroup.Placement, public Printout: AttributeGroup.Printout, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public parentheses?: Type.YesNo) { }
    }
    export class Forward {
        constructor(public children: [
            [
                Group.Duration,
                Group.EditorialVoice,
                Group.Staff
            ]
        ]) { }
    }
    export class Glissando {
        constructor(public children: string, public LineType: AttributeGroup.LineType, public DashedFormatting: AttributeGroup.DashedFormatting, public PrintStyle: AttributeGroup.PrintStyle, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStop, public number_: Type.NumberLevel = 1) { }
    }
    export class Grace {
        constructor(public children: [
        ], public stealTimePrevious?: Type.Percent, public stealTimeFollowing?: Type.Percent, public makeTime?: Type.Divisions, public slash?: Type.YesNo) { }
    }
    export class HammerOnPullOff {
        constructor(public children: string, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public type_: Type.StartStop, public number_: Type.NumberLevel = 1) { }
    }
    export class Handbell {
        constructor(public children: Type.HandbellValue, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class HarmonClosed {
        constructor(public children: Type.HarmonClosedValue, public location?: Type.HarmonClosedLocation) { }
    }
    export class HarmonMute {
        constructor(public children: [
            [
                {
                    harmonClosed: Type.HarmonClosed;
                }
            ]
        ], public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class Harmonic {
        constructor(public children: [
            [
                {
                    natural: Type.Empty;
                } | {
                    artificial: Type.Empty;
                },
                {
                    basePitch: Type.Empty;
                } | {
                    touchingPitch: Type.Empty;
                } | {
                    soundingPitch: Type.Empty;
                }
            ]
        ], public PrintObject: AttributeGroup.PrintObject, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class HeelToe {
        constructor(public children: [
        ]) { }
    }
    export class Hole {
        constructor(public children: [
            [
                {
                    holeType: string;
                },
                {
                    holeClosed: Type.HoleClosed;
                },
                {
                    holeShape: string;
                }
            ]
        ], public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class HoleClosed {
        constructor(public children: Type.HoleClosedValue, public location?: Type.HoleClosedLocation) { }
    }
    export class Instrument {
        constructor(public children: [
        ], public id: IDREF) { }
    }
    export class Listen {
        constructor(public children: [
            {
                assess: Type.Assess;
            } | {
                wait: Type.Wait;
            } | {
                otherListen: Type.OtherListening;
            }
        ]) { }
    }
    export class Lyric {
        constructor(public children: [
            [
                {
                    endLine: Type.Empty;
                },
                {
                    endParagraph: Type.Empty;
                },
                {
                    extend: Type.Extend;
                } | {
                    laughing: Type.Empty;
                } | {
                    humming: Type.Empty;
                } | [
                    {
                        syllabic: Type.Syllabic;
                    },
                    {
                        text: Type.TextElementData;
                    },
                    {
                        extend: Type.Extend;
                    },
                    [
                        {
                            text: Type.TextElementData;
                        },
                        [
                            {
                                elision: Type.Elision;
                            },
                            {
                                syllabic: Type.Syllabic;
                            }
                        ]
                    ]
                ],
                Group.Editorial
            ]
        ], public Justify: AttributeGroup.Justify, public Position: AttributeGroup.Position, public Placement: AttributeGroup.Placement, public Color: AttributeGroup.Color, public PrintObject: AttributeGroup.PrintObject, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public number_?: NMTOKEN, public name?: token, public timeOnly?: Type.TimeOnly) { }
    }
    export class Mordent {
        constructor(public children: [
        ]) { }
    }
    export class NonArpeggiate {
        constructor(public children: [
        ], public Position: AttributeGroup.Position, public Placement: AttributeGroup.Placement, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.TopBottom, public number_?: Type.NumberLevel) { }
    }
    export class Notations {
        constructor(public children: [
            [
                {
                    tied: Type.Tied;
                } | {
                    slur: Type.Slur;
                } | {
                    tuplet: Type.Tuplet;
                } | {
                    glissando: Type.Glissando;
                } | {
                    slide: Type.Slide;
                } | {
                    ornaments: Type.Ornaments;
                } | {
                    technical: Type.Technical;
                } | {
                    articulations: Type.Articulations;
                } | {
                    dynamics: Type.Dynamics;
                } | {
                    fermata: Type.Fermata;
                } | {
                    arpeggiate: Type.Arpeggiate;
                } | {
                    nonArpeggiate: Type.NonArpeggiate;
                } | {
                    accidentalMark: Type.AccidentalMark;
                } | {
                    otherNotation: Type.OtherNotation;
                },
                Group.Editorial
            ]
        ], public PrintObject: AttributeGroup.PrintObject, public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class Note {
        constructor(public children: [
            [
                {
                    instrument: Type.Instrument[];
                },
                {
                    type_: Type.NoteType;
                },
                {
                    dot: Type.EmptyPlacement[];
                },
                {
                    accidental: Type.Accidental;
                },
                {
                    timeModification: Type.TimeModification;
                },
                {
                    stem: Type.Stem;
                },
                {
                    notehead: Type.Notehead;
                },
                {
                    noteheadText: Type.NoteheadText;
                },
                {
                    beam: Type.Beam[];
                },
                {
                    notations: Type.Notations[];
                },
                {
                    lyric: Type.Lyric[];
                },
                {
                    play: Type.Play;
                },
                {
                    listen: Type.Listen;
                },
                [
                    {
                        grace: Type.Grace;
                    },
                    [
                        {
                            tie: Type.Tie[];
                        },
                        Group.FullNote
                    ] | [
                        {
                            cue: Type.Empty;
                        },
                        Group.FullNote
                    ]
                ] | [
                    {
                        cue: Type.Empty;
                    },
                    Group.FullNote,
                    Group.Duration
                ] | [
                    {
                        tie: Type.Tie[];
                    },
                    Group.FullNote,
                    Group.Duration
                ],
                Group.EditorialVoice,
                Group.Staff
            ]
        ], public XPosition: AttributeGroup.XPosition, public Font: AttributeGroup.Font, public Color: AttributeGroup.Color, public Printout: AttributeGroup.Printout, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public printLeger?: Type.YesNo, public dynamics?: Type.NonNegativeDecimal, public endDynamics?: Type.NonNegativeDecimal, public attack?: Type.Divisions, public release?: Type.Divisions, public timeOnly?: Type.TimeOnly, public pizzicato?: Type.YesNo) { }
    }
    export class NoteType {
        constructor(public children: Type.NoteTypeValue, public size?: Type.SymbolSize) { }
    }
    export class Notehead {
        constructor(public children: Type.NoteheadValue, public Font: AttributeGroup.Font, public Color: AttributeGroup.Color, public Smufl: AttributeGroup.Smufl, public filled?: Type.YesNo, public parentheses?: Type.YesNo) { }
    }
    export class NoteheadText {
        constructor(public children: [
            [
                {
                    displayText: Type.FormattedText;
                } | {
                    accidentalText: Type.AccidentalText;
                }
            ]
        ]) { }
    }
    export class Ornaments {
        constructor(public children: [
            [
                {
                    accidentalMark: Type.AccidentalMark[];
                },
                {
                    trillMark: Type.EmptyTrillSound;
                } | {
                    turn: Type.HorizontalTurn;
                } | {
                    delayedTurn: Type.HorizontalTurn;
                } | {
                    invertedTurn: Type.HorizontalTurn;
                } | {
                    delayedInvertedTurn: Type.HorizontalTurn;
                } | {
                    verticalTurn: Type.EmptyTrillSound;
                } | {
                    invertedVerticalTurn: Type.EmptyTrillSound;
                } | {
                    shake: Type.EmptyTrillSound;
                } | {
                    wavyLine: Type.WavyLine;
                } | {
                    mordent: Type.Mordent;
                } | {
                    invertedMordent: Type.Mordent;
                } | {
                    schleifer: Type.EmptyPlacement;
                } | {
                    tremolo: Type.Tremolo;
                } | {
                    haydn: Type.EmptyTrillSound;
                } | {
                    otherOrnament: Type.OtherPlacementText;
                }
            ]
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class OtherNotation {
        constructor(public children: string, public PrintObject: AttributeGroup.PrintObject, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public Smufl: AttributeGroup.Smufl, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStopSingle, public number_: Type.NumberLevel = 1) { }
    }
    export class OtherPlacementText {
        constructor(public children: string, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public Smufl: AttributeGroup.Smufl) { }
    }
    export class OtherText {
        constructor(public children: string, public Smufl: AttributeGroup.Smufl) { }
    }
    export class Pitch {
        constructor(public children: [
            [
                {
                    step: Type.Step;
                },
                {
                    alter: Type.Semitones;
                },
                {
                    octave: Type.Octave;
                }
            ]
        ]) { }
    }
    export class PlacementText {
        constructor(public children: string, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement) { }
    }
    export class Release {
        constructor(public children: [
        ]) { }
    }
    export class Rest {
        constructor(public children: [
            [
                Group.DisplayStepOctave
            ]
        ], public measure?: Type.YesNo) { }
    }
    export class Slide {
        constructor(public children: string, public LineType: AttributeGroup.LineType, public DashedFormatting: AttributeGroup.DashedFormatting, public PrintStyle: AttributeGroup.PrintStyle, public BendSound: AttributeGroup.BendSound, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStop, public number_: Type.NumberLevel = 1) { }
    }
    export class Slur {
        constructor(public children: [
        ], public LineType: AttributeGroup.LineType, public DashedFormatting: AttributeGroup.DashedFormatting, public Position: AttributeGroup.Position, public Placement: AttributeGroup.Placement, public Orientation: AttributeGroup.Orientation, public Bezier: AttributeGroup.Bezier, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStopContinue, public number_: Type.NumberLevel = 1) { }
    }
    export class Stem {
        constructor(public children: Type.StemValue, public YPosition: AttributeGroup.YPosition, public Color: AttributeGroup.Color) { }
    }
    export class StrongAccent {
        constructor(public children: [
        ]) { }
    }
    export class StyleText {
        constructor(public children: string, public PrintStyle: AttributeGroup.PrintStyle) { }
    }
    export class Tap {
        constructor(public children: string, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public hand?: Type.TapHand) { }
    }
    export class Technical {
        constructor(public children: [
            {
                upBow: Type.EmptyPlacement;
            } | {
                downBow: Type.EmptyPlacement;
            } | {
                harmonic: Type.Harmonic;
            } | {
                openString: Type.EmptyPlacement;
            } | {
                thumbPosition: Type.EmptyPlacement;
            } | {
                fingering: Type.Fingering;
            } | {
                pluck: Type.PlacementText;
            } | {
                doubleTongue: Type.EmptyPlacement;
            } | {
                tripleTongue: Type.EmptyPlacement;
            } | {
                stopped: Type.EmptyPlacementSmufl;
            } | {
                snapPizzicato: Type.EmptyPlacement;
            } | {
                fret: Type.Fret;
            } | {
                string_: Type.String;
            } | {
                hammerOn: Type.HammerOnPullOff;
            } | {
                pullOff: Type.HammerOnPullOff;
            } | {
                bend: Type.Bend;
            } | {
                tap: Type.Tap;
            } | {
                heel: Type.HeelToe;
            } | {
                toe: Type.HeelToe;
            } | {
                fingernails: Type.EmptyPlacement;
            } | {
                hole: Type.Hole;
            } | {
                arrow: Type.Arrow;
            } | {
                handbell: Type.Handbell;
            } | {
                brassBend: Type.EmptyPlacement;
            } | {
                flip: Type.EmptyPlacement;
            } | {
                smear: Type.EmptyPlacement;
            } | {
                open: Type.EmptyPlacementSmufl;
            } | {
                halfMuted: Type.EmptyPlacementSmufl;
            } | {
                harmonMute: Type.HarmonMute;
            } | {
                golpe: Type.EmptyPlacement;
            } | {
                otherTechnical: Type.OtherPlacementText;
            }
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId) { }
    }
    export class TextElementData {
        constructor(public children: string, public Font: AttributeGroup.Font, public Color: AttributeGroup.Color, public TextDecoration: AttributeGroup.TextDecoration, public TextRotation: AttributeGroup.TextRotation, public LetterSpacing: AttributeGroup.LetterSpacing, public TextDirection: AttributeGroup.TextDirection, public xmlLang?: XML.lang) { }
    }
    export class Tie {
        constructor(public children: [
        ], public type_: Type.StartStop, public timeOnly?: Type.TimeOnly) { }
    }
    export class Tied {
        constructor(public children: [
        ], public LineType: AttributeGroup.LineType, public DashedFormatting: AttributeGroup.DashedFormatting, public Position: AttributeGroup.Position, public Placement: AttributeGroup.Placement, public Orientation: AttributeGroup.Orientation, public Bezier: AttributeGroup.Bezier, public Color: AttributeGroup.Color, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.TiedType, public number_?: Type.NumberLevel) { }
    }
    export class TimeModification {
        constructor(public children: [
            [
                {
                    actualNotes: nonNegativeInteger;
                },
                {
                    normalNotes: nonNegativeInteger;
                },
                [
                    {
                        normalType: Type.NoteTypeValue;
                    },
                    {
                        normalDot: Type.Empty[];
                    }
                ]
            ]
        ]) { }
    }
    export class Tremolo {
        constructor(public children: Type.TremoloMarks, public PrintStyle: AttributeGroup.PrintStyle, public Placement: AttributeGroup.Placement, public Smufl: AttributeGroup.Smufl, public type_: Type.TremoloType = "single") { }
    }
    export class Tuplet {
        constructor(public children: [
            [
                {
                    tupletActual: Type.TupletPortion;
                },
                {
                    tupletNormal: Type.TupletPortion;
                }
            ]
        ], public LineShape: AttributeGroup.LineShape, public Position: AttributeGroup.Position, public Placement: AttributeGroup.Placement, public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public type_: Type.StartStop, public number_?: Type.NumberLevel, public bracket?: Type.YesNo, public showNumber?: Type.ShowTuplet, public showType?: Type.ShowTuplet) { }
    }
    export class TupletDot {
        constructor(public children: [
        ], public Font: AttributeGroup.Font, public Color: AttributeGroup.Color) { }
    }
    export class TupletNumber {
        constructor(public children: nonNegativeInteger, public Font: AttributeGroup.Font, public Color: AttributeGroup.Color) { }
    }
    export class TupletPortion {
        constructor(public children: [
            [
                {
                    tupletNumber: Type.TupletNumber;
                },
                {
                    tupletType: Type.TupletType;
                },
                {
                    tupletDot: Type.TupletDot[];
                }
            ]
        ]) { }
    }
    export class TupletType {
        constructor(public children: Type.NoteTypeValue, public Font: AttributeGroup.Font, public Color: AttributeGroup.Color) { }
    }
    export class Unpitched {
        constructor(public children: [
            [
                Group.DisplayStepOctave
            ]
        ]) { }
    }
    export class Wait {
        constructor(public children: [
        ], public player?: IDREF, public timeOnly?: Type.TimeOnly) { }
    }
    export class Credit {
        constructor(public children: [
            [
                {
                    creditType: string[];
                },
                {
                    link: Type.Link[];
                },
                {
                    bookmark: Type.Bookmark[];
                },
                {
                    creditImage: Type.Image;
                } | [
                    {
                        creditWords: Type.FormattedTextId;
                    } | {
                        creditSymbol: Type.FormattedSymbolId;
                    },
                    [
                        {
                            link: Type.Link[];
                        },
                        {
                            bookmark: Type.Bookmark[];
                        },
                        {
                            creditWords: Type.FormattedTextId;
                        } | {
                            creditSymbol: Type.FormattedSymbolId;
                        }
                    ]
                ]
            ]
        ], public OptionalUniqueId: AttributeGroup.OptionalUniqueId, public page?: positiveInteger) { }
    }
    export class Defaults {
        constructor(public children: [
            [
                {
                    scaling: Type.Scaling;
                },
                {
                    concertScore: Type.Empty;
                },
                {
                    appearance: Type.Appearance;
                },
                {
                    musicFont: Type.EmptyFont;
                },
                {
                    wordFont: Type.EmptyFont;
                },
                {
                    lyricFont: Type.LyricFont[];
                },
                {
                    lyricLanguage: Type.LyricLanguage[];
                },
                Group.Layout
            ]
        ]) { }
    }
    export class EmptyFont {
        constructor(public children: [
        ], public Font: AttributeGroup.Font) { }
    }
    export class GroupBarline {
        constructor(public children: Type.GroupBarlineValue, public Color: AttributeGroup.Color) { }
    }
    export class GroupName {
        constructor(public children: string, public GroupNameText: AttributeGroup.GroupNameText) { }
    }
    export class GroupSymbol {
        constructor(public children: Type.GroupSymbolValue, public Position: AttributeGroup.Position, public Color: AttributeGroup.Color) { }
    }
    export class InstrumentLink {
        constructor(public children: [
        ], public id: IDREF) { }
    }
    export class LyricFont {
        constructor(public children: [
        ], public Font: AttributeGroup.Font, public number_?: NMTOKEN, public name?: token) { }
    }
    export class LyricLanguage {
        constructor(public children: [
        ], public xmlLang: XML.lang, public number_?: NMTOKEN, public name?: token) { }
    }
    export class Opus {
        constructor(public children: [
        ], public LinkAttributes: AttributeGroup.LinkAttributes) { }
    }
    export class PartGroup {
        constructor(public children: [
            [
                {
                    groupName: Type.GroupName;
                },
                {
                    groupNameDisplay: Type.NameDisplay;
                },
                {
                    groupAbbreviation: Type.GroupName;
                },
                {
                    groupAbbreviationDisplay: Type.NameDisplay;
                },
                {
                    groupSymbol: Type.GroupSymbol;
                },
                {
                    groupBarline: Type.GroupBarline;
                },
                {
                    groupTime: Type.Empty;
                },
                Group.Editorial
            ]
        ], public type_: Type.StartStop, public number_: token = "1") { }
    }
    export class PartLink {
        constructor(public children: [
            [
                {
                    instrumentLink: Type.InstrumentLink[];
                },
                {
                    groupLink: string[];
                }
            ]
        ], public LinkAttributes: AttributeGroup.LinkAttributes) { }
    }
    export class PartList {
        constructor(public children: [
            [
                Group.PartGroup | Group.ScorePart,
                Group.PartGroup[],
                Group.ScorePart
            ]
        ]) { }
    }
    export class PartName {
        constructor(public children: string, public PartNameText: AttributeGroup.PartNameText) { }
    }
    export class Player {
        constructor(public children: [
            [
                {
                    playerName: string;
                }
            ]
        ], public id: ID) { }
    }
    export class ScoreInstrument {
        constructor(public children: [
            [
                {
                    instrumentName: string;
                },
                {
                    instrumentAbbreviation: string;
                },
                Group.VirtualInstrumentData
            ]
        ], public id: ID) { }
    }
    export class ScorePart {
        constructor(public children: [
            [
                {
                    identification: Type.Identification;
                },
                {
                    partLink: Type.PartLink[];
                },
                {
                    partName: Type.PartName;
                },
                {
                    partNameDisplay: Type.NameDisplay;
                },
                {
                    partAbbreviation: Type.PartName;
                },
                {
                    partAbbreviationDisplay: Type.NameDisplay;
                },
                {
                    group: string[];
                },
                {
                    scoreInstrument: Type.ScoreInstrument[];
                },
                {
                    player: Type.Player[];
                },
                [
                    {
                        midiDevice: Type.MidiDevice;
                    },
                    {
                        midiInstrument: Type.MidiInstrument;
                    }
                ]
            ]
        ], public id: ID) { }
    }
    export class VirtualInstrument {
        constructor(public children: [
            [
                {
                    virtualLibrary: string;
                },
                {
                    virtualName: string;
                }
            ]
        ]) { }
    }
    export class Work {
        constructor(public children: [
            [
                {
                    workNumber: string;
                },
                {
                    workTitle: string;
                },
                {
                    opus: Type.Opus;
                }
            ]
        ]) { }
    }
}
export module Group {
    export class Editorial {
        constructor(public children: [
            [
                Group.Footnote,
                Group.Level
            ]
        ]) { }
    }
    export class EditorialVoice {
        constructor(public children: [
            [
                Group.Footnote,
                Group.Level,
                Group.Voice
            ]
        ]) { }
    }
    export class EditorialVoiceDirection {
        constructor(public children: [
            [
                Group.Footnote,
                Group.Level,
                Group.Voice
            ]
        ]) { }
    }
    export class Footnote {
        constructor(public children: [
            [
                {
                    footnote: Type.FormattedText;
                }
            ]
        ]) { }
    }
    export class Level {
        constructor(public children: [
            [
                {
                    level: Type.Level;
                }
            ]
        ]) { }
    }
    export class Staff {
        constructor(public children: [
            [
                {
                    staff: positiveInteger;
                }
            ]
        ]) { }
    }
    export class Tuning {
        constructor(public children: [
            [
                {
                    tuningStep: Type.Step;
                },
                {
                    tuningAlter: Type.Semitones;
                },
                {
                    tuningOctave: Type.Octave;
                }
            ]
        ]) { }
    }
    export class VirtualInstrumentData {
        constructor(public children: [
            [
                {
                    instrumentSound: string;
                },
                {
                    virtualInstrument: Type.VirtualInstrument;
                },
                {
                    solo: Type.Empty;
                } | {
                    ensemble: Type.PositiveIntegerOrEmpty;
                }
            ]
        ]) { }
    }
    export class Voice {
        constructor(public children: [
            [
                {
                    voice: string;
                }
            ]
        ]) { }
    }
    export class Clef {
        constructor(public children: [
            [
                {
                    sign: Type.ClefSign;
                },
                {
                    line: Type.StaffLinePosition;
                },
                {
                    clefOctaveChange: integer;
                }
            ]
        ]) { }
    }
    export class NonTraditionalKey {
        constructor(public children: [
            [
                {
                    keyStep: Type.Step;
                },
                {
                    keyAlter: Type.Semitones;
                },
                {
                    keyAccidental: Type.KeyAccidental;
                }
            ]
        ]) { }
    }
    export class Slash {
        constructor(public children: [
            [
                {
                    exceptVoice: string[];
                },
                [
                    {
                        slashType: Type.NoteTypeValue;
                    },
                    {
                        slashDot: Type.Empty[];
                    }
                ]
            ]
        ]) { }
    }
    export class TimeSignature {
        constructor(public children: [
            [
                {
                    beats: string;
                },
                {
                    beatType: string;
                }
            ]
        ]) { }
    }
    export class TraditionalKey {
        constructor(public children: [
            [
                {
                    cancel: Type.Cancel;
                },
                {
                    fifths: Type.Fifths;
                },
                {
                    mode: Type.Mode;
                }
            ]
        ]) { }
    }
    export class Transpose {
        constructor(public children: [
            [
                {
                    diatonic: integer;
                },
                {
                    chromatic: Type.Semitones;
                },
                {
                    octaveChange: integer;
                },
                {
                    double: Type.Double;
                }
            ]
        ]) { }
    }
    export class BeatUnit {
        constructor(public children: [
            [
                {
                    beatUnit: Type.NoteTypeValue;
                },
                {
                    beatUnitDot: Type.Empty[];
                }
            ]
        ]) { }
    }
    export class HarmonyChord {
        constructor(public children: [
            [
                {
                    kind: Type.Kind;
                },
                {
                    inversion: Type.Inversion;
                },
                {
                    bass: Type.Bass;
                },
                {
                    degree: Type.Degree[];
                },
                {
                    root: Type.Root;
                } | {
                    numeral: Type.Numeral;
                } | {
                    function_: Type.StyleText;
                }
            ]
        ]) { }
    }
    export class AllMargins {
        constructor(public children: [
            [
                {
                    topMargin: Type.Tenths;
                },
                {
                    bottomMargin: Type.Tenths;
                },
                Group.LeftRightMargins
            ]
        ]) { }
    }
    export class Layout {
        constructor(public children: [
            [
                {
                    pageLayout: Type.PageLayout;
                },
                {
                    systemLayout: Type.SystemLayout;
                },
                {
                    staffLayout: Type.StaffLayout[];
                }
            ]
        ]) { }
    }
    export class LeftRightMargins {
        constructor(public children: [
            [
                {
                    leftMargin: Type.Tenths;
                },
                {
                    rightMargin: Type.Tenths;
                }
            ]
        ]) { }
    }
    export class Duration {
        constructor(public children: [
            [
                {
                    duration: Type.PositiveDivisions;
                }
            ]
        ]) { }
    }
    export class DisplayStepOctave {
        constructor(public children: [
            [
                {
                    displayStep: Type.Step;
                },
                {
                    displayOctave: Type.Octave;
                }
            ]
        ]) { }
    }
    export class FullNote {
        constructor(public children: [
            [
                {
                    chord: Type.Empty;
                },
                {
                    pitch: Type.Pitch;
                } | {
                    unpitched: Type.Unpitched;
                } | {
                    rest: Type.Rest;
                }
            ]
        ]) { }
    }
    export class MusicData {
        constructor(public children: [
            [
                {
                    note: Type.Note;
                } | {
                    backup: Type.Backup;
                } | {
                    forward: Type.Forward;
                } | {
                    direction: Type.Direction;
                } | {
                    attributes: Type.Attributes;
                } | {
                    harmony: Type.Harmony;
                } | {
                    figuredBass: Type.FiguredBass;
                } | {
                    print: Type.Print;
                } | {
                    sound: Type.Sound;
                } | {
                    listening: Type.Listening;
                } | {
                    barline: Type.Barline;
                } | {
                    grouping: Type.Grouping;
                } | {
                    link: Type.Link;
                } | {
                    bookmark: Type.Bookmark;
                }
            ]
        ]) { }
    }
    export class PartGroup {
        constructor(public children: [
            [
                {
                    partGroup: Type.PartGroup;
                }
            ]
        ]) { }
    }
    export class ScoreHeader {
        constructor(public children: [
            [
                {
                    work: Type.Work;
                },
                {
                    movementNumber: string;
                },
                {
                    movementTitle: string;
                },
                {
                    identification: Type.Identification;
                },
                {
                    defaults: Type.Defaults;
                },
                {
                    credit: Type.Credit[];
                },
                {
                    partList: Type.PartList;
                }
            ]
        ]) { }
    }
    export class ScorePart {
        constructor(public children: [
            [
                {
                    scorePart: Type.ScorePart;
                }
            ]
        ]) { }
    }
}
export module AttributeGroup {
    export class BendSound {
        constructor(public accelerate?: Type.YesNo, public beats?: Type.TrillBeats, public firstBeat?: Type.Percent, public lastBeat?: Type.Percent) { }
    }
    export class Bezier {
        constructor(public bezierX?: Type.Tenths, public bezierY?: Type.Tenths, public bezierX2?: Type.Tenths, public bezierY2?: Type.Tenths, public bezierOffset?: Type.Divisions, public bezierOffset2?: Type.Divisions) { }
    }
    export class Color {
        constructor(public color?: Type.Color) { }
    }
    export class DashedFormatting {
        constructor(public dashLength?: Type.Tenths, public spaceLength?: Type.Tenths) { }
    }
    export class Directive {
        constructor(public directive?: Type.YesNo) { }
    }
    export class DocumentAttributes {
        constructor(public version: token = "1.0") { }
    }
    export class Enclosure {
        constructor(public enclosure?: Type.EnclosureShape) { }
    }
    export class Font {
        constructor(public fontFamily?: Type.FontFamily, public fontStyle?: Type.FontStyle, public fontSize?: Type.FontSize, public fontWeight?: Type.FontWeight) { }
    }
    export class Halign {
        constructor(public halign?: Type.LeftCenterRight) { }
    }
    export class Justify {
        constructor(public justify?: Type.LeftCenterRight) { }
    }
    export class LetterSpacing {
        constructor(public letterSpacing?: Type.NumberOrNormal) { }
    }
    export class LevelDisplay {
        constructor(public parentheses?: Type.YesNo, public bracket?: Type.YesNo, public size?: Type.SymbolSize) { }
    }
    export class LineHeight {
        constructor(public lineHeight?: Type.NumberOrNormal) { }
    }
    export class LineLength {
        constructor(public lineLength?: Type.LineLength) { }
    }
    export class LineShape {
        constructor(public lineShape?: Type.LineShape) { }
    }
    export class LineType {
        constructor(public lineType?: Type.LineType) { }
    }
    export class OptionalUniqueId {
        constructor(public id?: ID) { }
    }
    export class Orientation {
        constructor(public orientation?: Type.OverUnder) { }
    }
    export class Placement {
        constructor(public placement?: Type.AboveBelow) { }
    }
    export class Position {
        constructor(public defaultX?: Type.Tenths, public defaultY?: Type.Tenths, public relativeX?: Type.Tenths, public relativeY?: Type.Tenths) { }
    }
    export class PrintObject {
        constructor(public printObject?: Type.YesNo) { }
    }
    export class PrintSpacing {
        constructor(public printSpacing?: Type.YesNo) { }
    }
    export class PrintStyle {
        constructor() { }
    }
    export class PrintStyleAlign {
        constructor() { }
    }
    export class Printout {
        constructor(public printDot?: Type.YesNo, public printLyric?: Type.YesNo) { }
    }
    export class Smufl {
        constructor(public smufl?: Type.SmuflGlyphName) { }
    }
    export class SystemRelation {
        constructor(public system?: Type.SystemRelation) { }
    }
    export class SymbolFormatting {
        constructor() { }
    }
    export class TextDecoration {
        constructor(public underline?: Type.NumberOfLines, public overline?: Type.NumberOfLines, public lineThrough?: Type.NumberOfLines) { }
    }
    export class TextDirection {
        constructor(public dir?: Type.TextDirection) { }
    }
    export class TextFormatting {
        constructor(public xmlLang?: XML.lang, public xmlSpace?: XML.space) { }
    }
    export class TextRotation {
        constructor(public rotation?: Type.RotationDegrees) { }
    }
    export class TrillSound {
        constructor(public startNote?: Type.StartNote, public trillStep?: Type.TrillStep, public twoNoteTurn?: Type.TwoNoteTurn, public accelerate?: Type.YesNo, public beats?: Type.TrillBeats, public secondBeat?: Type.Percent, public lastBeat?: Type.Percent) { }
    }
    export class Valign {
        constructor(public valign?: Type.Valign) { }
    }
    export class ValignImage {
        constructor(public valign?: Type.ValignImage) { }
    }
    export class XPosition {
        constructor(public defaultX?: Type.Tenths, public defaultY?: Type.Tenths, public relativeX?: Type.Tenths, public relativeY?: Type.Tenths) { }
    }
    export class YPosition {
        constructor(public defaultX?: Type.Tenths, public defaultY?: Type.Tenths, public relativeX?: Type.Tenths, public relativeY?: Type.Tenths) { }
    }
    export class ImageAttributes {
        constructor(public source: anyURI, public type_: token, public height?: Type.Tenths, public width?: Type.Tenths) { }
    }
    export class PrintAttributes {
        constructor(public staffSpacing?: Type.Tenths, public newSystem?: Type.YesNo, public newPage?: Type.YesNo, public blankPage?: positiveInteger, public pageNumber?: token) { }
    }
    export class ElementPosition {
        constructor(public element?: NMTOKEN, public position?: positiveInteger) { }
    }
    export class LinkAttributes {
        constructor(public xlinkHref: XLink.href, public xlinkShow: XLink.show = "replace", public xlinkActuate: XLink.actuate = "onRequest", public xlinkType?: XLink.type, public xlinkRole?: XLink.role, public xlinkTitle?: XLink.title) { }
    }
    export class GroupNameText {
        constructor() { }
    }
    export class MeasureAttributes {
        constructor(public number_: token, public text?: Type.MeasureText, public implicit?: Type.YesNo, public nonControlling?: Type.YesNo, public width?: Type.Tenths) { }
    }
    export class PartAttributes {
        constructor(public id: IDREF) { }
    }
    export class PartNameText {
        constructor() { }
    }
}
