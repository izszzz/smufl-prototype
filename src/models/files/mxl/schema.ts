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
    export type PartMeasure = Group.MusicData & {
        $: AttributeGroup.MeasureAttributes;
    };
    export type ScorePartwisePart = {
        measure: PartMeasure[];
    } & {
        $: AttributeGroup.PartAttributes;
    };
    export type ScorePartwise = {
        part: ScorePartwisePart[];
    } & Group.ScoreHeader & {
        $: AttributeGroup.DocumentAttributes;
    };
    export type MeasurePart = Group.MusicData & {
        $: AttributeGroup.PartAttributes;
    };
    export type ScoreTimewiseMeasure = {
        part: MeasurePart[];
    } & {
        $: AttributeGroup.MeasureAttributes;
    };
    export type ScoreTimewise = {
        measure: ScoreTimewiseMeasure[];
    } & Group.ScoreHeader & {
        $: AttributeGroup.DocumentAttributes;
    };
    export type AttributesDirective = {
        xsString: string;
    } & {
        $: {
            xmlLang?: XML.lang;
        } & AttributeGroup.PrintStyle;
    };
    export type AccidentalText = {
        accidentalValue: Type.AccidentalValue;
    } & {
        $: {
            smufl?: Type.SmuflAccidentalGlyphName;
        } & AttributeGroup.TextFormatting;
    };
    export type Coda = {
        $: {
            smufl?: Type.SmuflCodaGlyphName;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type Dynamics = ({
        p: Type.Empty[];
    } | {
        pp: Type.Empty[];
    } | {
        ppp: Type.Empty[];
    } | {
        pppp: Type.Empty[];
    } | {
        ppppp: Type.Empty[];
    } | {
        pppppp: Type.Empty[];
    } | {
        f: Type.Empty[];
    } | {
        ff: Type.Empty[];
    } | {
        fff: Type.Empty[];
    } | {
        ffff: Type.Empty[];
    } | {
        fffff: Type.Empty[];
    } | {
        ffffff: Type.Empty[];
    } | {
        mp: Type.Empty[];
    } | {
        mf: Type.Empty[];
    } | {
        sf: Type.Empty[];
    } | {
        sfp: Type.Empty[];
    } | {
        sfpp: Type.Empty[];
    } | {
        fp: Type.Empty[];
    } | {
        rf: Type.Empty[];
    } | {
        rfz: Type.Empty[];
    } | {
        sfz: Type.Empty[];
    } | {
        sffz: Type.Empty[];
    } | {
        fz: Type.Empty[];
    } | {
        n: Type.Empty[];
    } | {
        pf: Type.Empty[];
    } | {
        sfzp: Type.Empty[];
    } | {
        otherDynamics: Type.OtherText[];
    }) & {
        $: AttributeGroup.PrintStyleAlign & AttributeGroup.Placement & AttributeGroup.TextDecoration & AttributeGroup.Enclosure & AttributeGroup.OptionalUniqueId;
    };
    export type Empty = null;
    export type EmptyPlacement = {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type EmptyPlacementSmufl = {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.Smufl;
    };
    export type EmptyPrintStyle = {
        $: AttributeGroup.PrintStyle;
    };
    export type EmptyPrintStyleAlign = {
        $: AttributeGroup.PrintStyleAlign;
    };
    export type EmptyPrintStyleAlignId = {
        $: AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type EmptyPrintObjectStyleAlign = {
        $: AttributeGroup.PrintObject & AttributeGroup.PrintStyleAlign;
    };
    export type EmptyTrillSound = {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.TrillSound;
    };
    export type HorizontalTurn = {
        $: {
            slash?: Type.YesNo;
        } & AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.TrillSound;
    };
    export type Fermata = {
        fermataShape: Type.FermataShape;
    } & {
        $: {
            type_?: Type.UprightInverted;
        } & AttributeGroup.PrintStyle & AttributeGroup.OptionalUniqueId;
    };
    export type Fingering = {
        xsString: string;
    } & {
        $: {
            substitution?: Type.YesNo;
        } & {
            alternate?: Type.YesNo;
        } & AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type FormattedSymbol = {
        smuflGlyphName: Type.SmuflGlyphName;
    } & {
        $: AttributeGroup.SymbolFormatting;
    };
    export type FormattedSymbolId = {
        smuflGlyphName: Type.SmuflGlyphName;
    } & {
        $: AttributeGroup.SymbolFormatting & AttributeGroup.OptionalUniqueId;
    };
    export type FormattedText = {
        xsString: string;
    } & {
        $: AttributeGroup.TextFormatting;
    };
    export type FormattedTextId = {
        xsString: string;
    } & {
        $: AttributeGroup.TextFormatting & AttributeGroup.OptionalUniqueId;
    };
    export type Fret = {
        xsNonNegativeInteger: nonNegativeInteger;
    } & {
        $: AttributeGroup.Font & AttributeGroup.Color;
    };
    export type Level = {
        xsString: string;
    } & {
        $: {
            reference?: Type.YesNo;
        } & {
            type_?: Type.StartStopSingle;
        } & AttributeGroup.LevelDisplay;
    };
    export type MidiDevice = {
        xsString: string;
    } & {
        $: {
            port?: Type.Midi16;
        } & {
            id?: IDREF;
        };
    };
    export type MidiInstrument = {
        midiChannel: Type.Midi16;
    } & {
        midiName: string;
    } & {
        midiBank: Type.Midi16384;
    } & {
        midiProgram: Type.Midi128;
    } & {
        midiUnpitched: Type.Midi128;
    } & {
        volume: Type.Percent;
    } & {
        pan: Type.RotationDegrees;
    } & {
        elevation: Type.RotationDegrees;
    } & {
        $: {
            id: IDREF;
        };
    };
    export type NameDisplay = ({
        displayText: Type.FormattedText[];
    } | {
        accidentalText: Type.AccidentalText[];
    }) & {
        $: AttributeGroup.PrintObject;
    };
    export type OtherPlay = {
        xsString: string;
    } & {
        $: {
            type_: token;
        };
    };
    export type Play = ({
        ipa: string[];
    } | {
        mute: Type.Mute[];
    } | {
        semiPitched: Type.SemiPitched[];
    } | {
        otherPlay: Type.OtherPlay[];
    }) & {
        $: {
            id?: IDREF;
        };
    };
    export type Segno = {
        $: {
            smufl?: Type.SmuflSegnoGlyphName;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type String = {
        stringNumber: Type.StringNumber;
    } & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type TypedText = {
        xsString: string;
    } & {
        $: {
            type_?: token;
        };
    };
    export type WavyLine = {
        $: {
            type_: Type.StartStopContinue;
        } & {
            number_?: Type.NumberLevel;
        } & {
            smufl?: Type.SmuflWavyLineGlyphName;
        } & AttributeGroup.Position & AttributeGroup.Placement & AttributeGroup.Color & AttributeGroup.TrillSound;
    };
    export type Attributes = {
        divisions: Type.PositiveDivisions;
    } & {
        key: Type.Key[];
    } & {
        time: Type.Time[];
    } & {
        staves: nonNegativeInteger;
    } & {
        partSymbol: Type.PartSymbol;
    } & {
        instruments: nonNegativeInteger;
    } & {
        clef: Type.Clef[];
    } & {
        staffDetails: Type.StaffDetails[];
    } & {
        directive: AttributesDirective[];
    } & {
        measureStyle: Type.MeasureStyle[];
    } & ({
        transpose: Type.Transpose[];
    } | {
        forPart: Type.ForPart[];
    }) & Group.Editorial;
    export type BeatRepeat = Group.Slash & {
        $: {
            type_: Type.StartStop;
        } & {
            slashes?: positiveInteger;
        } & {
            useDots?: Type.YesNo;
        };
    };
    export type Cancel = {
        fifths: Type.Fifths;
    } & {
        $: {
            location?: Type.CancelLocation;
        };
    };
    export type Clef = Group.Clef & {
        $: {
            number_?: Type.StaffNumber;
        } & {
            additional?: Type.YesNo;
        } & {
            size?: Type.SymbolSize;
        } & {
            afterBarline?: Type.YesNo;
        } & AttributeGroup.PrintStyle & AttributeGroup.PrintObject & AttributeGroup.OptionalUniqueId;
    };
    export type Double = {
        $: {
            above?: Type.YesNo;
        };
    };
    export type ForPart = {
        partClef: Type.PartClef;
    } & {
        partTranspose: Type.PartTranspose;
    } & {
        $: {
            number_?: Type.StaffNumber;
        } & AttributeGroup.OptionalUniqueId;
    };
    export type Interchangeable = {
        timeRelation: Type.TimeRelation;
    } & Group.TimeSignature[] & {
        $: {
            symbol_?: Type.TimeSymbol;
        } & {
            separator?: Type.TimeSeparator;
        };
    };
    export type Key = {
        keyOctave: Type.KeyOctave[];
    } & (Group.TraditionalKey | Group.NonTraditionalKey[]) & {
        $: {
            number_?: Type.StaffNumber;
        } & AttributeGroup.PrintStyle & AttributeGroup.PrintObject & AttributeGroup.OptionalUniqueId;
    };
    export type KeyAccidental = {
        accidentalValue: Type.AccidentalValue;
    } & {
        $: {
            smufl?: Type.SmuflAccidentalGlyphName;
        };
    };
    export type KeyOctave = {
        octave: Type.Octave;
    } & {
        $: {
            number_: positiveInteger;
        } & {
            cancel?: Type.YesNo;
        };
    };
    export type LineDetail = {
        $: {
            line: Type.StaffLine;
        } & {
            width?: Type.Tenths;
        } & AttributeGroup.Color & AttributeGroup.LineType & AttributeGroup.PrintObject;
    };
    export type MeasureRepeat = {
        positiveIntegerOrEmpty: Type.PositiveIntegerOrEmpty;
    } & {
        $: {
            type_: Type.StartStop;
        } & {
            slashes?: positiveInteger;
        };
    };
    export type MeasureStyle = ({
        multipleRest: Type.MultipleRest;
    } | {
        measureRepeat: Type.MeasureRepeat;
    } | {
        beatRepeat: Type.BeatRepeat;
    } | {
        slash: Type.Slash;
    }) & {
        $: {
            number_?: Type.StaffNumber;
        } & AttributeGroup.Font & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type MultipleRest = {
        xsPositiveInteger: positiveInteger;
    } & {
        $: {
            useSymbols?: Type.YesNo;
        };
    };
    export type PartClef = Group.Clef;
    export type PartSymbol = {
        groupSymbolValue: Type.GroupSymbolValue;
    } & {
        $: {
            topStaff?: Type.StaffNumber;
        } & {
            bottomStaff?: Type.StaffNumber;
        } & AttributeGroup.Position & AttributeGroup.Color;
    };
    export type PartTranspose = Group.Transpose;
    export type Slash = Group.Slash & {
        $: {
            type_: Type.StartStop;
        } & {
            useDots?: Type.YesNo;
        } & {
            useStems?: Type.YesNo;
        };
    };
    export type StaffDetails = {
        staffType: Type.StaffType;
    } & {
        staffTuning: Type.StaffTuning[];
    } & {
        capo: nonNegativeInteger;
    } & {
        staffSize: Type.StaffSize;
    } & {
        staffLines: nonNegativeInteger;
    } & {
        lineDetail: Type.LineDetail[];
    } & {
        $: {
            number_?: Type.StaffNumber;
        } & {
            showFrets?: Type.ShowFrets;
        } & AttributeGroup.PrintObject & AttributeGroup.PrintSpacing;
    };
    export type StaffSize = {
        nonNegativeDecimal: Type.NonNegativeDecimal;
    } & {
        $: {
            scaling?: Type.NonNegativeDecimal;
        };
    };
    export type StaffTuning = Group.Tuning & {
        $: {
            line: Type.StaffLine;
        };
    };
    export type Time = ({
        interchangeable: Type.Interchangeable;
    } | Group.TimeSignature[] | {
        senzaMisura: string;
    }) & {
        $: {
            number_?: Type.StaffNumber;
        } & {
            symbol_?: Type.TimeSymbol;
        } & {
            separator?: Type.TimeSeparator;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.PrintObject & AttributeGroup.OptionalUniqueId;
    };
    export type Transpose = Group.Transpose & {
        $: {
            number_?: Type.StaffNumber;
        } & AttributeGroup.OptionalUniqueId;
    };
    export type BarStyleColor = {
        barStyle: Type.BarStyle;
    } & {
        $: AttributeGroup.Color;
    };
    export type Barline = {
        barStyle: Type.BarStyleColor;
    } & {
        wavyLine: Type.WavyLine;
    } & {
        segno: Type.Segno;
    } & {
        coda: Type.Coda;
    } & {
        fermata: Type.Fermata[];
    } & {
        ending: Type.Ending;
    } & {
        repeat: Type.Repeat;
    } & Group.Editorial & {
        $: {
            location: Type.RightLeftMiddle;
        } & {
            segno?: token;
        } & {
            coda?: token;
        } & {
            divisions?: Type.Divisions;
        } & AttributeGroup.OptionalUniqueId;
    };
    export type Ending = {
        xsString: string;
    } & {
        $: {
            number_: Type.EndingNumber;
        } & {
            type_: Type.StartStopDiscontinue;
        } & {
            endLength?: Type.Tenths;
        } & {
            textX?: Type.Tenths;
        } & {
            textY?: Type.Tenths;
        } & AttributeGroup.PrintObject & AttributeGroup.PrintStyle & AttributeGroup.SystemRelation;
    };
    export type Repeat = {
        $: {
            direction: Type.BackwardForward;
        } & {
            times?: nonNegativeInteger;
        } & {
            afterJump?: Type.YesNo;
        } & {
            winged?: Type.Winged;
        };
    };
    export type Accord = Group.Tuning & {
        $: {
            string_?: Type.StringNumber;
        };
    };
    export type AccordionRegistration = {
        accordionHigh: Type.Empty;
    } & {
        accordionMiddle: Type.AccordionMiddle;
    } & {
        accordionLow: Type.Empty;
    } & {
        $: AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type Barre = {
        $: {
            type_: Type.StartStop;
        } & AttributeGroup.Color;
    };
    export type Bass = {
        bassSeparator: Type.StyleText;
    } & {
        bassStep: Type.BassStep;
    } & {
        bassAlter: Type.HarmonyAlter;
    } & {
        $: {
            arrangement?: Type.HarmonyArrangement;
        };
    };
    export type HarmonyAlter = {
        semitones: Type.Semitones;
    } & {
        $: {
            location?: Type.LeftRight;
        } & AttributeGroup.PrintObject & AttributeGroup.PrintStyle;
    };
    export type BassStep = {
        step: Type.Step;
    } & {
        $: {
            text?: token;
        } & AttributeGroup.PrintStyle;
    };
    export type Beater = {
        beaterValue: Type.BeaterValue;
    } & {
        $: {
            tip?: Type.TipDirection;
        };
    };
    export type BeatUnitTied = Group.BeatUnit;
    export type Bracket = {
        $: {
            type_: Type.StartStopContinue;
        } & {
            number_?: Type.NumberLevel;
        } & {
            lineEnd: Type.LineEnd;
        } & {
            endLength?: Type.Tenths;
        } & AttributeGroup.LineType & AttributeGroup.DashedFormatting & AttributeGroup.Position & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type Dashes = {
        $: {
            type_: Type.StartStopContinue;
        } & {
            number_?: Type.NumberLevel;
        } & AttributeGroup.DashedFormatting & AttributeGroup.Position & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type Degree = {
        degreeValue: Type.DegreeValue;
    } & {
        degreeAlter: Type.DegreeAlter;
    } & {
        degreeType: Type.DegreeType;
    } & {
        $: AttributeGroup.PrintObject;
    };
    export type DegreeAlter = {
        semitones: Type.Semitones;
    } & {
        $: {
            plusMinus?: Type.YesNo;
        } & AttributeGroup.PrintStyle;
    };
    export type DegreeType = {
        degreeTypeValue: Type.DegreeTypeValue;
    } & {
        $: {
            text?: token;
        } & AttributeGroup.PrintStyle;
    };
    export type DegreeValue = {
        xsPositiveInteger: positiveInteger;
    } & {
        $: {
            symbol_?: Type.DegreeSymbolValue;
        } & {
            text?: token;
        } & AttributeGroup.PrintStyle;
    };
    export type Direction = {
        directionType: Type.DirectionType[];
    } & {
        offset: Type.Offset;
    } & {
        sound: Type.Sound;
    } & {
        listening: Type.Listening;
    } & Group.EditorialVoiceDirection & Group.Staff & {
        $: AttributeGroup.Placement & AttributeGroup.Directive & AttributeGroup.SystemRelation & AttributeGroup.OptionalUniqueId;
    };
    export type DirectionType = ({
        rehearsal: Type.FormattedTextId[];
    } | {
        segno: Type.Segno[];
    } | {
        coda: Type.Coda[];
    } | ({
        words: Type.FormattedTextId[];
    } | {
        symbol_: Type.FormattedSymbolId[];
    }) | {
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
    }) & {
        $: AttributeGroup.OptionalUniqueId;
    };
    export type Effect = {
        effectValue: Type.EffectValue;
    } & {
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    };
    export type Feature = {
        xsString: string;
    } & {
        $: {
            type_?: token;
        };
    };
    export type FirstFret = {
        xsPositiveInteger: positiveInteger;
    } & {
        $: {
            text?: token;
        } & {
            location?: Type.LeftRight;
        };
    };
    export type Frame = {
        frameStrings: positiveInteger;
    } & {
        frameFrets: positiveInteger;
    } & {
        firstFret: Type.FirstFret;
    } & {
        frameNote: Type.FrameNote[];
    } & {
        $: {
            height?: Type.Tenths;
        } & {
            width?: Type.Tenths;
        } & {
            unplayed?: token;
        } & AttributeGroup.Position & AttributeGroup.Color & AttributeGroup.Halign & AttributeGroup.ValignImage & AttributeGroup.OptionalUniqueId;
    };
    export type FrameNote = {
        string_: Type.String;
    } & {
        fret: Type.Fret;
    } & {
        fingering: Type.Fingering;
    } & {
        barre: Type.Barre;
    };
    export type Glass = {
        glassValue: Type.GlassValue;
    } & {
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    };
    export type Grouping = {
        feature: Type.Feature[];
    } & {
        $: {
            type_: Type.StartStopSingle;
        } & {
            number_: token;
        } & {
            memberOf?: token;
        } & AttributeGroup.OptionalUniqueId;
    };
    export type Harmony = {
        frame: Type.Frame;
    } & {
        offset: Type.Offset;
    } & Group.HarmonyChord[] & Group.Editorial & Group.Staff & {
        $: {
            type_?: Type.HarmonyType;
        } & {
            printFrame?: Type.YesNo;
        } & {
            arrangement?: Type.HarmonyArrangement;
        } & AttributeGroup.PrintObject & AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.SystemRelation & AttributeGroup.OptionalUniqueId;
    };
    export type HarpPedals = {
        pedalTuning: Type.PedalTuning[];
    } & {
        $: AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type Image = {
        $: AttributeGroup.ImageAttributes & AttributeGroup.OptionalUniqueId;
    };
    export type InstrumentChange = Group.VirtualInstrumentData & {
        $: {
            id: IDREF;
        };
    };
    export type Inversion = {
        xsNonNegativeInteger: nonNegativeInteger;
    } & {
        $: {
            text?: token;
        } & AttributeGroup.PrintStyle;
    };
    export type Kind = {
        kindValue: Type.KindValue;
    } & {
        $: {
            useSymbols?: Type.YesNo;
        } & {
            text?: token;
        } & {
            stackDegrees?: Type.YesNo;
        } & {
            parenthesesDegrees?: Type.YesNo;
        } & {
            bracketDegrees?: Type.YesNo;
        } & AttributeGroup.PrintStyle & AttributeGroup.Halign & AttributeGroup.Valign;
    };
    export type Listening = {
        offset: Type.Offset;
    } & ({
        sync: Type.Sync[];
    } | {
        otherListening: Type.OtherListening[];
    });
    export type MeasureNumbering = {
        measureNumberingValue: Type.MeasureNumberingValue;
    } & {
        $: {
            system?: Type.SystemRelationNumber;
        } & {
            staff?: Type.StaffNumber;
        } & {
            multipleRestAlways?: Type.YesNo;
        } & {
            multipleRestRange?: Type.YesNo;
        } & AttributeGroup.PrintStyleAlign;
    };
    export type Membrane = {
        membraneValue: Type.MembraneValue;
    } & {
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    };
    export type Metal = {
        metalValue: Type.MetalValue;
    } & {
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    };
    export type Metronome = ({
        beatUnitTied: Type.BeatUnitTied[];
    } | ({
        perMinute: Type.PerMinute;
    } | {
        beatUnitTied: Type.BeatUnitTied[];
    } | Group.BeatUnit) | Group.BeatUnit | {
        metronomeArrows: Type.Empty;
    } | {
        metronomeNote: Type.MetronomeNote[];
    } | {
        metronomeRelation: string;
    } | {
        metronomeNote: Type.MetronomeNote[];
    }) & {
        $: {
            parentheses?: Type.YesNo;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.PrintObject & AttributeGroup.Justify & AttributeGroup.OptionalUniqueId;
    };
    export type MetronomeBeam = {
        beamValue: Type.BeamValue;
    } & {
        $: {
            number_: Type.BeamLevel;
        };
    };
    export type MetronomeNote = {
        metronomeType: Type.NoteTypeValue;
    } & {
        metronomeDot: Type.Empty[];
    } & {
        metronomeBeam: Type.MetronomeBeam[];
    } & {
        metronomeTied: Type.MetronomeTied;
    } & {
        metronomeTuplet: Type.MetronomeTuplet;
    };
    export type MetronomeTied = {
        $: {
            type_: Type.StartStop;
        };
    };
    export type MetronomeTuplet = null;
    export type Numeral = {
        numeralRoot: Type.NumeralRoot;
    } & {
        numeralAlter: Type.HarmonyAlter;
    } & {
        numeralKey: Type.NumeralKey;
    };
    export type NumeralKey = {
        numeralFifths: Type.Fifths;
    } & {
        numeralMode: Type.NumeralMode;
    } & {
        $: AttributeGroup.PrintObject;
    };
    export type NumeralRoot = {
        numeralValue: Type.NumeralValue;
    } & {
        $: {
            text?: token;
        } & AttributeGroup.PrintStyle;
    };
    export type OctaveShift = {
        $: {
            type_: Type.UpDownStopContinue;
        } & {
            number_?: Type.NumberLevel;
        } & {
            size: positiveInteger;
        } & AttributeGroup.DashedFormatting & AttributeGroup.PrintStyle & AttributeGroup.OptionalUniqueId;
    };
    export type Offset = {
        divisions: Type.Divisions;
    } & {
        $: {
            sound?: Type.YesNo;
        };
    };
    export type OtherDirection = {
        xsString: string;
    } & {
        $: AttributeGroup.PrintObject & AttributeGroup.PrintStyleAlign & AttributeGroup.Smufl & AttributeGroup.OptionalUniqueId;
    };
    export type OtherListening = {
        xsString: string;
    } & {
        $: {
            type_: token;
        } & {
            player?: IDREF;
        } & {
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Pedal = {
        $: {
            type_: Type.PedalType;
        } & {
            number_?: Type.NumberLevel;
        } & {
            line?: Type.YesNo;
        } & {
            sign?: Type.YesNo;
        } & {
            abbreviated?: Type.YesNo;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type PedalTuning = {
        pedalStep: Type.Step;
    } & {
        pedalAlter: Type.Semitones;
    };
    export type PerMinute = {
        xsString: string;
    } & {
        $: AttributeGroup.Font;
    };
    export type Percussion = ({
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
    }) & {
        $: AttributeGroup.PrintStyleAlign & AttributeGroup.Enclosure & AttributeGroup.OptionalUniqueId;
    };
    export type Pitched = {
        pitchedValue: Type.PitchedValue;
    } & {
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    };
    export type PrincipalVoice = {
        xsString: string;
    } & {
        $: {
            type_: Type.StartStop;
        } & {
            symbol_: Type.PrincipalVoiceSymbol;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type Print = {
        measureLayout: Type.MeasureLayout;
    } & {
        measureNumbering: Type.MeasureNumbering;
    } & {
        partNameDisplay: Type.NameDisplay;
    } & {
        partAbbreviationDisplay: Type.NameDisplay;
    } & Group.Layout & {
        $: AttributeGroup.PrintAttributes & AttributeGroup.OptionalUniqueId;
    };
    export type Root = {
        rootStep: Type.RootStep;
    } & {
        rootAlter: Type.HarmonyAlter;
    };
    export type RootStep = {
        step: Type.Step;
    } & {
        $: {
            text?: token;
        } & AttributeGroup.PrintStyle;
    };
    export type Scordatura = {
        accord: Type.Accord[];
    } & {
        $: AttributeGroup.OptionalUniqueId;
    };
    export type Sound = {
        swing: Type.Swing;
    } & {
        offset: Type.Offset;
    } & {
        instrumentChange: Type.InstrumentChange;
    } & {
        midiDevice: Type.MidiDevice;
    } & {
        midiInstrument: Type.MidiInstrument;
    } & {
        play: Type.Play;
    } & {
        $: {
            tempo?: Type.NonNegativeDecimal;
        } & {
            dynamics?: Type.NonNegativeDecimal;
        } & {
            dacapo?: Type.YesNo;
        } & {
            segno?: token;
        } & {
            dalsegno?: token;
        } & {
            coda?: token;
        } & {
            tocoda?: token;
        } & {
            divisions?: Type.Divisions;
        } & {
            forwardRepeat?: Type.YesNo;
        } & {
            fine?: token;
        } & {
            timeOnly?: Type.TimeOnly;
        } & {
            pizzicato?: Type.YesNo;
        } & {
            pan?: Type.RotationDegrees;
        } & {
            elevation?: Type.RotationDegrees;
        } & {
            damperPedal?: Type.YesNoNumber;
        } & {
            softPedal?: Type.YesNoNumber;
        } & {
            sostenutoPedal?: Type.YesNoNumber;
        } & AttributeGroup.OptionalUniqueId;
    };
    export type StaffDivide = {
        $: {
            type_: Type.StaffDivideSymbol;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type Stick = {
        stickType: Type.StickType;
    } & {
        stickMaterial: Type.StickMaterial;
    } & {
        $: {
            tip?: Type.TipDirection;
        } & {
            parentheses?: Type.YesNo;
        } & {
            dashedCircle?: Type.YesNo;
        };
    };
    export type StringMute = {
        $: {
            type_: Type.OnOff;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.OptionalUniqueId;
    };
    export type Swing = {
        swingStyle: string;
    } & ({
        straight: Type.Empty;
    } | {
        first: positiveInteger;
    } | {
        second: positiveInteger;
    } | {
        swingType: Type.SwingTypeValue;
    });
    export type Sync = {
        $: {
            type_: Type.SyncType;
        } & {
            latency?: Type.Milliseconds;
        } & {
            player?: IDREF;
        } & {
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Timpani = {
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    };
    export type Wedge = {
        $: {
            type_: Type.WedgeType;
        } & {
            number_?: Type.NumberLevel;
        } & {
            spread?: Type.Tenths;
        } & {
            niente?: Type.YesNo;
        } & AttributeGroup.LineType & AttributeGroup.DashedFormatting & AttributeGroup.Position & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type Wood = {
        woodValue: Type.WoodValue;
    } & {
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    };
    export type Encoding = ({
        encodingDate: Type.YyyyMmDd[];
    } | {
        encoder: Type.TypedText[];
    } | {
        software: string[];
    } | {
        encodingDescription: string[];
    } | {
        supports: Type.Supports[];
    });
    export type Identification = {
        creator: Type.TypedText[];
    } & {
        rights: Type.TypedText[];
    } & {
        encoding: Type.Encoding;
    } & {
        source: string;
    } & {
        relation: Type.TypedText[];
    } & {
        miscellaneous: Type.Miscellaneous;
    };
    export type Miscellaneous = {
        miscellaneousField: Type.MiscellaneousField[];
    };
    export type MiscellaneousField = {
        xsString: string;
    } & {
        $: {
            name: token;
        };
    };
    export type Supports = {
        $: {
            type_: Type.YesNo;
        } & {
            element: NMTOKEN;
        } & {
            attribute?: NMTOKEN;
        } & {
            value?: token;
        };
    };
    export type Appearance = {
        lineWidth: Type.LineWidth[];
    } & {
        noteSize: Type.NoteSize[];
    } & {
        distance: Type.Distance[];
    } & {
        glyph: Type.Glyph[];
    } & {
        otherAppearance: Type.OtherAppearance[];
    };
    export type Distance = {
        tenths: Type.Tenths;
    } & {
        $: {
            type_: Type.DistanceType;
        };
    };
    export type Glyph = {
        smuflGlyphName: Type.SmuflGlyphName;
    } & {
        $: {
            type_: Type.GlyphType;
        };
    };
    export type LineWidth = {
        tenths: Type.Tenths;
    } & {
        $: {
            type_: Type.LineWidthType;
        };
    };
    export type MeasureLayout = {
        measureDistance: Type.Tenths;
    };
    export type NoteSize = {
        nonNegativeDecimal: Type.NonNegativeDecimal;
    } & {
        $: {
            type_: Type.NoteSizeType;
        };
    };
    export type OtherAppearance = {
        xsString: string;
    } & {
        $: {
            type_: token;
        };
    };
    export type PageLayout = {
        pageMargins: Type.PageMargins[];
    } & {
        pageHeight: Type.Tenths;
    } & {
        pageWidth: Type.Tenths;
    };
    export type PageMargins = Group.AllMargins & {
        $: {
            type_?: Type.MarginType;
        };
    };
    export type Scaling = {
        millimeters: Type.Millimeters;
    } & {
        tenths: Type.Tenths;
    };
    export type StaffLayout = {
        staffDistance: Type.Tenths;
    } & {
        $: {
            number_?: Type.StaffNumber;
        };
    };
    export type SystemDividers = {
        leftDivider: Type.EmptyPrintObjectStyleAlign;
    } & {
        rightDivider: Type.EmptyPrintObjectStyleAlign;
    };
    export type SystemLayout = {
        systemMargins: Type.SystemMargins;
    } & {
        systemDistance: Type.Tenths;
    } & {
        topSystemDistance: Type.Tenths;
    } & {
        systemDividers: Type.SystemDividers;
    };
    export type SystemMargins = Group.LeftRightMargins;
    export type Bookmark = {
        $: {
            id: ID;
        } & {
            name?: token;
        } & AttributeGroup.ElementPosition;
    };
    export type Link = {
        $: {
            name?: token;
        } & AttributeGroup.LinkAttributes & AttributeGroup.ElementPosition & AttributeGroup.Position;
    };
    export type Accidental = {
        accidentalValue: Type.AccidentalValue;
    } & {
        $: {
            cautionary?: Type.YesNo;
        } & {
            editorial?: Type.YesNo;
        } & {
            smufl?: Type.SmuflAccidentalGlyphName;
        } & AttributeGroup.LevelDisplay & AttributeGroup.PrintStyle;
    };
    export type AccidentalMark = {
        accidentalValue: Type.AccidentalValue;
    } & {
        $: {
            smufl?: Type.SmuflAccidentalGlyphName;
        } & AttributeGroup.LevelDisplay & AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.OptionalUniqueId;
    };
    export type Arpeggiate = {
        $: {
            number_?: Type.NumberLevel;
        } & {
            direction?: Type.UpDown;
        } & {
            unbroken?: Type.YesNo;
        } & AttributeGroup.Position & AttributeGroup.Placement & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type Articulations = ({
        accent: Type.EmptyPlacement[];
    } | {
        strongAccent: Type.StrongAccent[];
    } | {
        staccato: Type.EmptyPlacement[];
    } | {
        tenuto: Type.EmptyPlacement[];
    } | {
        detachedLegato: Type.EmptyPlacement[];
    } | {
        staccatissimo: Type.EmptyPlacement[];
    } | {
        spiccato: Type.EmptyPlacement[];
    } | {
        scoop: Type.EmptyLine[];
    } | {
        plop: Type.EmptyLine[];
    } | {
        doit: Type.EmptyLine[];
    } | {
        falloff: Type.EmptyLine[];
    } | {
        breathMark: Type.BreathMark[];
    } | {
        caesura: Type.Caesura[];
    } | {
        stress: Type.EmptyPlacement[];
    } | {
        unstress: Type.EmptyPlacement[];
    } | {
        softAccent: Type.EmptyPlacement[];
    } | {
        otherArticulation: Type.OtherPlacementText[];
    }) & {
        $: AttributeGroup.OptionalUniqueId;
    };
    export type Arrow = ({
        arrowDirection: Type.ArrowDirection;
    } | {
        arrowStyle: Type.ArrowStyle;
    } | {
        arrowhead: Type.Empty;
    } | {
        circularArrow: Type.CircularArrow;
    }) & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.Smufl;
    };
    export type Assess = {
        $: {
            type_: Type.YesNo;
        } & {
            player?: IDREF;
        } & {
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Backup = Group.Duration & Group.Editorial;
    export type Beam = {
        beamValue: Type.BeamValue;
    } & {
        $: {
            number_: Type.BeamLevel;
        } & {
            repeater?: Type.YesNo;
        } & {
            fan?: Type.Fan;
        } & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type Bend = {
        bendAlter: Type.Semitones;
    } & {
        withBar: Type.PlacementText;
    } & ({
        preBend: Type.Empty;
    } | {
        release: Type.Release;
    }) & {
        $: {
            shape?: Type.BendShape;
        } & AttributeGroup.PrintStyle & AttributeGroup.BendSound;
    };
    export type BreathMark = {
        breathMarkValue: Type.BreathMarkValue;
    } & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type Caesura = {
        caesuraValue: Type.CaesuraValue;
    } & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type Elision = {
        xsString: string;
    } & {
        $: {
            smufl?: Type.SmuflLyricsGlyphName;
        } & AttributeGroup.Font & AttributeGroup.Color;
    };
    export type EmptyLine = {
        $: AttributeGroup.LineShape & AttributeGroup.LineType & AttributeGroup.LineLength & AttributeGroup.DashedFormatting & AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type Extend = {
        $: {
            type_?: Type.StartStopContinue;
        } & AttributeGroup.Position & AttributeGroup.Color;
    };
    export type Figure = {
        prefix: Type.StyleText;
    } & {
        figureNumber: Type.StyleText;
    } & {
        suffix: Type.StyleText;
    } & {
        extend: Type.Extend;
    } & Group.Editorial;
    export type FiguredBass = {
        figure: Type.Figure[];
    } & Group.Duration & Group.Editorial & {
        $: {
            parentheses?: Type.YesNo;
        } & AttributeGroup.PrintStyleAlign & AttributeGroup.Placement & AttributeGroup.Printout & AttributeGroup.OptionalUniqueId;
    };
    export type Forward = Group.Duration & Group.EditorialVoice & Group.Staff;
    export type Glissando = {
        xsString: string;
    } & {
        $: {
            type_: Type.StartStop;
        } & {
            number_: Type.NumberLevel;
        } & AttributeGroup.LineType & AttributeGroup.DashedFormatting & AttributeGroup.PrintStyle & AttributeGroup.OptionalUniqueId;
    };
    export type Grace = {
        $: {
            stealTimePrevious?: Type.Percent;
        } & {
            stealTimeFollowing?: Type.Percent;
        } & {
            makeTime?: Type.Divisions;
        } & {
            slash?: Type.YesNo;
        };
    };
    export type HammerOnPullOff = {
        xsString: string;
    } & {
        $: {
            type_: Type.StartStop;
        } & {
            number_: Type.NumberLevel;
        } & AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type Handbell = {
        handbellValue: Type.HandbellValue;
    } & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type HarmonClosed = {
        harmonClosedValue: Type.HarmonClosedValue;
    } & {
        $: {
            location?: Type.HarmonClosedLocation;
        };
    };
    export type HarmonMute = {
        harmonClosed: Type.HarmonClosed;
    } & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type Harmonic = ({
        natural: Type.Empty;
    } | {
        artificial: Type.Empty;
    }) & ({
        basePitch: Type.Empty;
    } | {
        touchingPitch: Type.Empty;
    } | {
        soundingPitch: Type.Empty;
    }) & {
        $: AttributeGroup.PrintObject & AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type HeelToe = null;
    export type Hole = {
        holeType: string;
    } & {
        holeClosed: Type.HoleClosed;
    } & {
        holeShape: string;
    } & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type HoleClosed = {
        holeClosedValue: Type.HoleClosedValue;
    } & {
        $: {
            location?: Type.HoleClosedLocation;
        };
    };
    export type Instrument = {
        $: {
            id: IDREF;
        };
    };
    export type Listen = ({
        assess: Type.Assess[];
    } | {
        wait: Type.Wait[];
    } | {
        otherListen: Type.OtherListening[];
    });
    export type Lyric = {
        endLine: Type.Empty;
    } & {
        endParagraph: Type.Empty;
    } & ({
        syllabic: Type.Syllabic;
    } | {
        text: Type.TextElementData;
    } | {
        extend: Type.Extend;
    } | {
        text: Type.TextElementData;
    } | {
        elision: Type.Elision;
    } | {
        syllabic: Type.Syllabic;
    } | {
        extend: Type.Extend;
    } | {
        laughing: Type.Empty;
    } | {
        humming: Type.Empty;
    }) & Group.Editorial & {
        $: {
            number_?: NMTOKEN;
        } & {
            name?: token;
        } & {
            timeOnly?: Type.TimeOnly;
        } & AttributeGroup.Justify & AttributeGroup.Position & AttributeGroup.Placement & AttributeGroup.Color & AttributeGroup.PrintObject & AttributeGroup.OptionalUniqueId;
    };
    export type Mordent = null;
    export type NonArpeggiate = {
        $: {
            type_: Type.TopBottom;
        } & {
            number_?: Type.NumberLevel;
        } & AttributeGroup.Position & AttributeGroup.Placement & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type Notations = ({
        tied: Type.Tied[];
    } | {
        slur: Type.Slur[];
    } | {
        tuplet: Type.Tuplet[];
    } | {
        glissando: Type.Glissando[];
    } | {
        slide: Type.Slide[];
    } | {
        ornaments: Type.Ornaments[];
    } | {
        technical: Type.Technical[];
    } | {
        articulations: Type.Articulations[];
    } | {
        dynamics: Type.Dynamics[];
    } | {
        fermata: Type.Fermata[];
    } | {
        arpeggiate: Type.Arpeggiate[];
    } | {
        nonArpeggiate: Type.NonArpeggiate[];
    } | {
        accidentalMark: Type.AccidentalMark[];
    } | {
        otherNotation: Type.OtherNotation[];
    }) & Group.Editorial & {
        $: AttributeGroup.PrintObject & AttributeGroup.OptionalUniqueId;
    };
    export type Note = {
        instrument: Type.Instrument[];
    } & {
        type_: Type.NoteType;
    } & {
        dot: Type.EmptyPlacement[];
    } & {
        accidental: Type.Accidental;
    } & {
        timeModification: Type.TimeModification;
    } & {
        stem: Type.Stem;
    } & {
        notehead: Type.Notehead;
    } & {
        noteheadText: Type.NoteheadText;
    } & {
        beam: Type.Beam[];
    } & {
        notations: Type.Notations[];
    } & {
        lyric: Type.Lyric[];
    } & {
        play: Type.Play;
    } & {
        listen: Type.Listen;
    } & ({
        grace: Type.Grace;
    } | ({
        tie: Type.Tie[];
    } | Group.FullNote | {
        cue: Type.Empty;
    } | Group.FullNote) | {
        cue: Type.Empty;
    } | Group.FullNote | Group.Duration | {
        tie: Type.Tie[];
    } | Group.FullNote | Group.Duration) & Group.EditorialVoice & Group.Staff & {
        $: {
            printLeger?: Type.YesNo;
        } & {
            dynamics?: Type.NonNegativeDecimal;
        } & {
            endDynamics?: Type.NonNegativeDecimal;
        } & {
            attack?: Type.Divisions;
        } & {
            release?: Type.Divisions;
        } & {
            timeOnly?: Type.TimeOnly;
        } & {
            pizzicato?: Type.YesNo;
        } & AttributeGroup.XPosition & AttributeGroup.Font & AttributeGroup.Color & AttributeGroup.Printout & AttributeGroup.OptionalUniqueId;
    };
    export type NoteType = {
        noteTypeValue: Type.NoteTypeValue;
    } & {
        $: {
            size?: Type.SymbolSize;
        };
    };
    export type Notehead = {
        noteheadValue: Type.NoteheadValue;
    } & {
        $: {
            filled?: Type.YesNo;
        } & {
            parentheses?: Type.YesNo;
        } & AttributeGroup.Font & AttributeGroup.Color & AttributeGroup.Smufl;
    };
    export type NoteheadText = ({
        displayText: Type.FormattedText[];
    } | {
        accidentalText: Type.AccidentalText[];
    });
    export type Ornaments = {
        accidentalMark: Type.AccidentalMark[];
    } & ({
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
    }) & {
        $: AttributeGroup.OptionalUniqueId;
    };
    export type OtherNotation = {
        xsString: string;
    } & {
        $: {
            type_: Type.StartStopSingle;
        } & {
            number_: Type.NumberLevel;
        } & AttributeGroup.PrintObject & AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.Smufl & AttributeGroup.OptionalUniqueId;
    };
    export type OtherPlacementText = {
        xsString: string;
    } & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.Smufl;
    };
    export type OtherText = {
        xsString: string;
    } & {
        $: AttributeGroup.Smufl;
    };
    export type Pitch = {
        step: Type.Step;
    } & {
        alter: Type.Semitones;
    } & {
        octave: Type.Octave;
    };
    export type PlacementText = {
        xsString: string;
    } & {
        $: AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type Release = null;
    export type Rest = Group.DisplayStepOctave & {
        $: {
            measure?: Type.YesNo;
        };
    };
    export type Slide = {
        xsString: string;
    } & {
        $: {
            type_: Type.StartStop;
        } & {
            number_: Type.NumberLevel;
        } & AttributeGroup.LineType & AttributeGroup.DashedFormatting & AttributeGroup.PrintStyle & AttributeGroup.BendSound & AttributeGroup.OptionalUniqueId;
    };
    export type Slur = {
        $: {
            type_: Type.StartStopContinue;
        } & {
            number_: Type.NumberLevel;
        } & AttributeGroup.LineType & AttributeGroup.DashedFormatting & AttributeGroup.Position & AttributeGroup.Placement & AttributeGroup.Orientation & AttributeGroup.Bezier & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type Stem = {
        stemValue: Type.StemValue;
    } & {
        $: AttributeGroup.YPosition & AttributeGroup.Color;
    };
    export type StrongAccent = null;
    export type StyleText = {
        xsString: string;
    } & {
        $: AttributeGroup.PrintStyle;
    };
    export type Tap = {
        xsString: string;
    } & {
        $: {
            hand?: Type.TapHand;
        } & AttributeGroup.PrintStyle & AttributeGroup.Placement;
    };
    export type Technical = ({
        upBow: Type.EmptyPlacement[];
    } | {
        downBow: Type.EmptyPlacement[];
    } | {
        harmonic: Type.Harmonic[];
    } | {
        openString: Type.EmptyPlacement[];
    } | {
        thumbPosition: Type.EmptyPlacement[];
    } | {
        fingering: Type.Fingering[];
    } | {
        pluck: Type.PlacementText[];
    } | {
        doubleTongue: Type.EmptyPlacement[];
    } | {
        tripleTongue: Type.EmptyPlacement[];
    } | {
        stopped: Type.EmptyPlacementSmufl[];
    } | {
        snapPizzicato: Type.EmptyPlacement[];
    } | {
        fret: Type.Fret[];
    } | {
        string_: Type.String[];
    } | {
        hammerOn: Type.HammerOnPullOff[];
    } | {
        pullOff: Type.HammerOnPullOff[];
    } | {
        bend: Type.Bend[];
    } | {
        tap: Type.Tap[];
    } | {
        heel: Type.HeelToe[];
    } | {
        toe: Type.HeelToe[];
    } | {
        fingernails: Type.EmptyPlacement[];
    } | {
        hole: Type.Hole[];
    } | {
        arrow: Type.Arrow[];
    } | {
        handbell: Type.Handbell[];
    } | {
        brassBend: Type.EmptyPlacement[];
    } | {
        flip: Type.EmptyPlacement[];
    } | {
        smear: Type.EmptyPlacement[];
    } | {
        open: Type.EmptyPlacementSmufl[];
    } | {
        halfMuted: Type.EmptyPlacementSmufl[];
    } | {
        harmonMute: Type.HarmonMute[];
    } | {
        golpe: Type.EmptyPlacement[];
    } | {
        otherTechnical: Type.OtherPlacementText[];
    }) & {
        $: AttributeGroup.OptionalUniqueId;
    };
    export type TextElementData = {
        xsString: string;
    } & {
        $: {
            xmlLang?: XML.lang;
        } & AttributeGroup.Font & AttributeGroup.Color & AttributeGroup.TextDecoration & AttributeGroup.TextRotation & AttributeGroup.LetterSpacing & AttributeGroup.TextDirection;
    };
    export type Tie = {
        $: {
            type_: Type.StartStop;
        } & {
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Tied = {
        $: {
            type_: Type.TiedType;
        } & {
            number_?: Type.NumberLevel;
        } & AttributeGroup.LineType & AttributeGroup.DashedFormatting & AttributeGroup.Position & AttributeGroup.Placement & AttributeGroup.Orientation & AttributeGroup.Bezier & AttributeGroup.Color & AttributeGroup.OptionalUniqueId;
    };
    export type TimeModification = {
        actualNotes: nonNegativeInteger;
    } & {
        normalNotes: nonNegativeInteger;
    } & {
        normalType: Type.NoteTypeValue;
    } & {
        normalDot: Type.Empty[];
    };
    export type Tremolo = {
        tremoloMarks: Type.TremoloMarks;
    } & {
        $: {
            type_: Type.TremoloType;
        } & AttributeGroup.PrintStyle & AttributeGroup.Placement & AttributeGroup.Smufl;
    };
    export type Tuplet = {
        tupletActual: Type.TupletPortion;
    } & {
        tupletNormal: Type.TupletPortion;
    } & {
        $: {
            type_: Type.StartStop;
        } & {
            number_?: Type.NumberLevel;
        } & {
            bracket?: Type.YesNo;
        } & {
            showNumber?: Type.ShowTuplet;
        } & {
            showType?: Type.ShowTuplet;
        } & AttributeGroup.LineShape & AttributeGroup.Position & AttributeGroup.Placement & AttributeGroup.OptionalUniqueId;
    };
    export type TupletDot = {
        $: AttributeGroup.Font & AttributeGroup.Color;
    };
    export type TupletNumber = {
        xsNonNegativeInteger: nonNegativeInteger;
    } & {
        $: AttributeGroup.Font & AttributeGroup.Color;
    };
    export type TupletPortion = {
        tupletNumber: Type.TupletNumber;
    } & {
        tupletType: Type.TupletType;
    } & {
        tupletDot: Type.TupletDot[];
    };
    export type TupletType = {
        noteTypeValue: Type.NoteTypeValue;
    } & {
        $: AttributeGroup.Font & AttributeGroup.Color;
    };
    export type Unpitched = Group.DisplayStepOctave;
    export type Wait = {
        $: {
            player?: IDREF;
        } & {
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Credit = {
        creditType: string[];
    } & {
        link: Type.Link[];
    } & {
        bookmark: Type.Bookmark[];
    } & ({
        creditImage: Type.Image;
    } | ({
        creditWords: Type.FormattedTextId;
    } | {
        creditSymbol: Type.FormattedSymbolId;
    }) | {
        link: Type.Link[];
    } | {
        bookmark: Type.Bookmark[];
    } | ({
        creditWords: Type.FormattedTextId;
    } | {
        creditSymbol: Type.FormattedSymbolId;
    })) & {
        $: {
            page?: positiveInteger;
        } & AttributeGroup.OptionalUniqueId;
    };
    export type Defaults = {
        scaling: Type.Scaling;
    } & {
        concertScore: Type.Empty;
    } & {
        appearance: Type.Appearance;
    } & {
        musicFont: Type.EmptyFont;
    } & {
        wordFont: Type.EmptyFont;
    } & {
        lyricFont: Type.LyricFont[];
    } & {
        lyricLanguage: Type.LyricLanguage[];
    } & Group.Layout;
    export type EmptyFont = {
        $: AttributeGroup.Font;
    };
    export type GroupBarline = {
        groupBarlineValue: Type.GroupBarlineValue;
    } & {
        $: AttributeGroup.Color;
    };
    export type GroupName = {
        xsString: string;
    } & {
        $: AttributeGroup.GroupNameText;
    };
    export type GroupSymbol = {
        groupSymbolValue: Type.GroupSymbolValue;
    } & {
        $: AttributeGroup.Position & AttributeGroup.Color;
    };
    export type InstrumentLink = {
        $: {
            id: IDREF;
        };
    };
    export type LyricFont = {
        $: {
            number_?: NMTOKEN;
        } & {
            name?: token;
        } & AttributeGroup.Font;
    };
    export type LyricLanguage = {
        $: {
            number_?: NMTOKEN;
        } & {
            name?: token;
        } & {
            xmlLang: XML.lang;
        };
    };
    export type Opus = {
        $: AttributeGroup.LinkAttributes;
    };
    export type PartGroup = {
        groupName: Type.GroupName;
    } & {
        groupNameDisplay: Type.NameDisplay;
    } & {
        groupAbbreviation: Type.GroupName;
    } & {
        groupAbbreviationDisplay: Type.NameDisplay;
    } & {
        groupSymbol: Type.GroupSymbol;
    } & {
        groupBarline: Type.GroupBarline;
    } & {
        groupTime: Type.Empty;
    } & Group.Editorial & {
        $: {
            type_: Type.StartStop;
        } & {
            number_: token;
        };
    };
    export type PartLink = {
        instrumentLink: Type.InstrumentLink[];
    } & {
        groupLink: string[];
    } & {
        $: AttributeGroup.LinkAttributes;
    };
    export type PartList = (Group.PartGroup[] | Group.ScorePart[]) & Group.PartGroup[] & Group.ScorePart;
    export type PartName = {
        xsString: string;
    } & {
        $: AttributeGroup.PartNameText;
    };
    export type Player = {
        playerName: string;
    } & {
        $: {
            id: ID;
        };
    };
    export type ScoreInstrument = {
        instrumentName: string;
    } & {
        instrumentAbbreviation: string;
    } & Group.VirtualInstrumentData & {
        $: {
            id: ID;
        };
    };
    export type ScorePart = {
        identification: Type.Identification;
    } & {
        partLink: Type.PartLink[];
    } & {
        partName: Type.PartName;
    } & {
        partNameDisplay: Type.NameDisplay;
    } & {
        partAbbreviation: Type.PartName;
    } & {
        partAbbreviationDisplay: Type.NameDisplay;
    } & {
        group: string[];
    } & {
        scoreInstrument: Type.ScoreInstrument[];
    } & {
        player: Type.Player[];
    } & {
        midiDevice: Type.MidiDevice;
    } & {
        midiInstrument: Type.MidiInstrument;
    } & {
        $: {
            id: ID;
        };
    };
    export type VirtualInstrument = {
        virtualLibrary: string;
    } & {
        virtualName: string;
    };
    export type Work = {
        workNumber: string;
    } & {
        workTitle: string;
    } & {
        opus: Type.Opus;
    };
}
export module Group {
    export type Editorial = Group.Footnote & Group.Level;
    export type EditorialVoice = Group.Footnote & Group.Level & Group.Voice;
    export type EditorialVoiceDirection = Group.Footnote & Group.Level & Group.Voice;
    export type Footnote = {
        footnote: Type.FormattedText;
    };
    export type Level = {
        level: Type.Level;
    };
    export type Staff = {
        staff: positiveInteger;
    };
    export type Tuning = {
        tuningStep: Type.Step;
    } & {
        tuningAlter: Type.Semitones;
    } & {
        tuningOctave: Type.Octave;
    };
    export type VirtualInstrumentData = {
        instrumentSound: string;
    } & {
        virtualInstrument: Type.VirtualInstrument;
    } & ({
        solo: Type.Empty;
    } | {
        ensemble: Type.PositiveIntegerOrEmpty;
    });
    export type Voice = {
        voice: string;
    };
    export type Clef = {
        sign: Type.ClefSign;
    } & {
        line: Type.StaffLinePosition;
    } & {
        clefOctaveChange: integer;
    };
    export type NonTraditionalKey = {
        keyStep: Type.Step;
    } & {
        keyAlter: Type.Semitones;
    } & {
        keyAccidental: Type.KeyAccidental;
    };
    export type Slash = {
        exceptVoice: string[];
    } & {
        slashType: Type.NoteTypeValue;
    } & {
        slashDot: Type.Empty[];
    };
    export type TimeSignature = {
        beats: string;
    } & {
        beatType: string;
    };
    export type TraditionalKey = {
        cancel: Type.Cancel;
    } & {
        fifths: Type.Fifths;
    } & {
        mode: Type.Mode;
    };
    export type Transpose = {
        diatonic: integer;
    } & {
        chromatic: Type.Semitones;
    } & {
        octaveChange: integer;
    } & {
        double: Type.Double;
    };
    export type BeatUnit = {
        beatUnit: Type.NoteTypeValue;
    } & {
        beatUnitDot: Type.Empty[];
    };
    export type HarmonyChord = {
        kind: Type.Kind;
    } & {
        inversion: Type.Inversion;
    } & {
        bass: Type.Bass;
    } & {
        degree: Type.Degree[];
    } & ({
        root: Type.Root;
    } | {
        numeral: Type.Numeral;
    } | {
        function_: Type.StyleText;
    });
    export type AllMargins = {
        topMargin: Type.Tenths;
    } & {
        bottomMargin: Type.Tenths;
    } & Group.LeftRightMargins;
    export type Layout = {
        pageLayout: Type.PageLayout;
    } & {
        systemLayout: Type.SystemLayout;
    } & {
        staffLayout: Type.StaffLayout[];
    };
    export type LeftRightMargins = {
        leftMargin: Type.Tenths;
    } & {
        rightMargin: Type.Tenths;
    };
    export type Duration = {
        duration: Type.PositiveDivisions;
    };
    export type DisplayStepOctave = {
        displayStep: Type.Step;
    } & {
        displayOctave: Type.Octave;
    };
    export type FullNote = {
        chord: Type.Empty;
    } & ({
        pitch: Type.Pitch;
    } | {
        unpitched: Type.Unpitched;
    } | {
        rest: Type.Rest;
    });
    export type MusicData = ({
        note: Type.Note[];
    } | {
        backup: Type.Backup[];
    } | {
        forward: Type.Forward[];
    } | {
        direction: Type.Direction[];
    } | {
        attributes: Type.Attributes[];
    } | {
        harmony: Type.Harmony[];
    } | {
        figuredBass: Type.FiguredBass[];
    } | {
        print: Type.Print[];
    } | {
        sound: Type.Sound[];
    } | {
        listening: Type.Listening[];
    } | {
        barline: Type.Barline[];
    } | {
        grouping: Type.Grouping[];
    } | {
        link: Type.Link[];
    } | {
        bookmark: Type.Bookmark[];
    });
    export type PartGroup = {
        partGroup: Type.PartGroup;
    };
    export type ScoreHeader = {
        work: Type.Work;
    } & {
        movementNumber: string;
    } & {
        movementTitle: string;
    } & {
        identification: Type.Identification;
    } & {
        defaults: Type.Defaults;
    } & {
        credit: Type.Credit[];
    } & {
        partList: Type.PartList;
    };
    export type ScorePart = {
        scorePart: Type.ScorePart;
    };
}
export module AttributeGroup {
    export type BendSound = {
        accelerate?: Type.YesNo;
    } & {
        beats?: Type.TrillBeats;
    } & {
        firstBeat?: Type.Percent;
    } & {
        lastBeat?: Type.Percent;
    };
    export type Bezier = {
        bezierX?: Type.Tenths;
    } & {
        bezierY?: Type.Tenths;
    } & {
        bezierX2?: Type.Tenths;
    } & {
        bezierY2?: Type.Tenths;
    } & {
        bezierOffset?: Type.Divisions;
    } & {
        bezierOffset2?: Type.Divisions;
    };
    export type Color = {
        color?: Type.Color;
    };
    export type DashedFormatting = {
        dashLength?: Type.Tenths;
    } & {
        spaceLength?: Type.Tenths;
    };
    export type Directive = {
        directive?: Type.YesNo;
    };
    export type DocumentAttributes = {
        version: token;
    };
    export type Enclosure = {
        enclosure?: Type.EnclosureShape;
    };
    export type Font = {
        fontFamily?: Type.FontFamily;
    } & {
        fontStyle?: Type.FontStyle;
    } & {
        fontSize?: Type.FontSize;
    } & {
        fontWeight?: Type.FontWeight;
    };
    export type Halign = {
        halign?: Type.LeftCenterRight;
    };
    export type Justify = {
        justify?: Type.LeftCenterRight;
    };
    export type LetterSpacing = {
        letterSpacing?: Type.NumberOrNormal;
    };
    export type LevelDisplay = {
        parentheses?: Type.YesNo;
    } & {
        bracket?: Type.YesNo;
    } & {
        size?: Type.SymbolSize;
    };
    export type LineHeight = {
        lineHeight?: Type.NumberOrNormal;
    };
    export type LineLength = {
        lineLength?: Type.LineLength;
    };
    export type LineShape = {
        lineShape?: Type.LineShape;
    };
    export type LineType = {
        lineType?: Type.LineType;
    };
    export type OptionalUniqueId = {
        id?: ID;
    };
    export type Orientation = {
        orientation?: Type.OverUnder;
    };
    export type Placement = {
        placement?: Type.AboveBelow;
    };
    export type Position = {
        defaultX?: Type.Tenths;
    } & {
        defaultY?: Type.Tenths;
    } & {
        relativeX?: Type.Tenths;
    } & {
        relativeY?: Type.Tenths;
    };
    export type PrintObject = {
        printObject?: Type.YesNo;
    };
    export type PrintSpacing = {
        printSpacing?: Type.YesNo;
    };
    export type PrintStyle = AttributeGroup.Position & AttributeGroup.Font & AttributeGroup.Color;
    export type PrintStyleAlign = AttributeGroup.PrintStyle & AttributeGroup.Halign & AttributeGroup.Valign;
    export type Printout = {
        printDot?: Type.YesNo;
    } & {
        printLyric?: Type.YesNo;
    } & AttributeGroup.PrintObject & AttributeGroup.PrintSpacing;
    export type Smufl = {
        smufl?: Type.SmuflGlyphName;
    };
    export type SystemRelation = {
        system?: Type.SystemRelation;
    };
    export type SymbolFormatting = AttributeGroup.Justify & AttributeGroup.PrintStyleAlign & AttributeGroup.TextDecoration & AttributeGroup.TextRotation & AttributeGroup.LetterSpacing & AttributeGroup.LineHeight & AttributeGroup.TextDirection & AttributeGroup.Enclosure;
    export type TextDecoration = {
        underline?: Type.NumberOfLines;
    } & {
        overline?: Type.NumberOfLines;
    } & {
        lineThrough?: Type.NumberOfLines;
    };
    export type TextDirection = {
        dir?: Type.TextDirection;
    };
    export type TextFormatting = {
        xmlLang?: XML.lang;
    } & {
        xmlSpace?: XML.space;
    } & AttributeGroup.Justify & AttributeGroup.PrintStyleAlign & AttributeGroup.TextDecoration & AttributeGroup.TextRotation & AttributeGroup.LetterSpacing & AttributeGroup.LineHeight & AttributeGroup.TextDirection & AttributeGroup.Enclosure;
    export type TextRotation = {
        rotation?: Type.RotationDegrees;
    };
    export type TrillSound = {
        startNote?: Type.StartNote;
    } & {
        trillStep?: Type.TrillStep;
    } & {
        twoNoteTurn?: Type.TwoNoteTurn;
    } & {
        accelerate?: Type.YesNo;
    } & {
        beats?: Type.TrillBeats;
    } & {
        secondBeat?: Type.Percent;
    } & {
        lastBeat?: Type.Percent;
    };
    export type Valign = {
        valign?: Type.Valign;
    };
    export type ValignImage = {
        valign?: Type.ValignImage;
    };
    export type XPosition = {
        defaultX?: Type.Tenths;
    } & {
        defaultY?: Type.Tenths;
    } & {
        relativeX?: Type.Tenths;
    } & {
        relativeY?: Type.Tenths;
    };
    export type YPosition = {
        defaultX?: Type.Tenths;
    } & {
        defaultY?: Type.Tenths;
    } & {
        relativeX?: Type.Tenths;
    } & {
        relativeY?: Type.Tenths;
    };
    export type ImageAttributes = {
        source: anyURI;
    } & {
        type_: token;
    } & {
        height?: Type.Tenths;
    } & {
        width?: Type.Tenths;
    } & AttributeGroup.Position & AttributeGroup.Halign & AttributeGroup.ValignImage;
    export type PrintAttributes = {
        staffSpacing?: Type.Tenths;
    } & {
        newSystem?: Type.YesNo;
    } & {
        newPage?: Type.YesNo;
    } & {
        blankPage?: positiveInteger;
    } & {
        pageNumber?: token;
    };
    export type ElementPosition = {
        element?: NMTOKEN;
    } & {
        position?: positiveInteger;
    };
    export type LinkAttributes = {
        xlinkHref: XLink.href;
    } & {
        xlinkType?: XLink.type;
    } & {
        xlinkRole?: XLink.role;
    } & {
        xlinkTitle?: XLink.title;
    } & {
        xlinkShow: XLink.show;
    } & {
        xlinkActuate: XLink.actuate;
    };
    export type GroupNameText = AttributeGroup.PrintStyle & AttributeGroup.Justify;
    export type MeasureAttributes = {
        number_: token;
    } & {
        text?: Type.MeasureText;
    } & {
        implicit?: Type.YesNo;
    } & {
        nonControlling?: Type.YesNo;
    } & {
        width?: Type.Tenths;
    } & AttributeGroup.OptionalUniqueId;
    export type PartAttributes = {
        id: IDREF;
    };
    export type PartNameText = AttributeGroup.PrintStyle & AttributeGroup.PrintObject & AttributeGroup.Justify;
}
