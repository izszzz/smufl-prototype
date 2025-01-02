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
        $: {
            id?: ID;
            number_: token;
            text?: Type.MeasureText;
            implicit?: Type.YesNo;
            nonControlling?: Type.YesNo;
            width?: Type.Tenths;
        };
    };
    export type ScorePartwisePart = {
        measure: PartMeasure[];
    } & {
        $: {
            id: IDREF;
        };
    };
    export type ScorePartwise = {
        part: ScorePartwisePart[];
    } & Group.ScoreHeader & {
        $: {
            version: token;
        };
    };
    export type MeasurePart = Group.MusicData & {
        $: {
            id: IDREF;
        };
    };
    export type ScoreTimewiseMeasure = {
        part: MeasurePart[];
    } & {
        $: {
            id?: ID;
            number_: token;
            text?: Type.MeasureText;
            implicit?: Type.YesNo;
            nonControlling?: Type.YesNo;
            width?: Type.Tenths;
        };
    };
    export type ScoreTimewise = {
        measure: ScoreTimewiseMeasure[];
    } & Group.ScoreHeader & {
        $: {
            version: token;
        };
    };
    export type AttributesDirective = {
        xsString: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            xmlLang?: XML.lang;
        };
    };
    export type AccidentalText = {
        accidentalValue: Type.AccidentalValue;
    } & {
        $: {
            justify?: Type.LeftCenterRight;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            underline?: Type.NumberOfLines;
            overline?: Type.NumberOfLines;
            lineThrough?: Type.NumberOfLines;
            rotation?: Type.RotationDegrees;
            letterSpacing?: Type.NumberOrNormal;
            lineHeight?: Type.NumberOrNormal;
            dir?: Type.TextDirection;
            enclosure?: Type.EnclosureShape;
            xmlLang?: XML.lang;
            xmlSpace?: XML.space;
            smufl?: Type.SmuflAccidentalGlyphName;
        };
    };
    export type Coda = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
            smufl?: Type.SmuflCodaGlyphName;
        };
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
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            placement?: Type.AboveBelow;
            underline?: Type.NumberOfLines;
            overline?: Type.NumberOfLines;
            lineThrough?: Type.NumberOfLines;
            enclosure?: Type.EnclosureShape;
            id?: ID;
        };
    };
    export type Empty = null;
    export type EmptyPlacement = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
    };
    export type EmptyPlacementSmufl = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            smufl?: Type.SmuflGlyphName;
        };
    };
    export type EmptyPrintStyle = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    };
    export type EmptyPrintStyleAlign = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
        };
    };
    export type EmptyPrintStyleAlignId = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
        };
    };
    export type EmptyPrintObjectStyleAlign = {
        $: {
            printObject?: Type.YesNo;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
        };
    };
    export type EmptyTrillSound = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            startNote?: Type.StartNote;
            trillStep?: Type.TrillStep;
            twoNoteTurn?: Type.TwoNoteTurn;
            accelerate?: Type.YesNo;
            beats?: Type.TrillBeats;
            secondBeat?: Type.Percent;
            lastBeat?: Type.Percent;
        };
    };
    export type HorizontalTurn = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            startNote?: Type.StartNote;
            trillStep?: Type.TrillStep;
            twoNoteTurn?: Type.TwoNoteTurn;
            accelerate?: Type.YesNo;
            beats?: Type.TrillBeats;
            secondBeat?: Type.Percent;
            lastBeat?: Type.Percent;
            slash?: Type.YesNo;
        };
    };
    export type Fermata = {
        fermataShape: Type.FermataShape;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            id?: ID;
            type_?: Type.UprightInverted;
        };
    };
    export type Fingering = {
        xsString: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            substitution?: Type.YesNo;
            alternate?: Type.YesNo;
        };
    };
    export type FormattedSymbol = {
        smuflGlyphName: Type.SmuflGlyphName;
    } & {
        $: {
            justify?: Type.LeftCenterRight;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            underline?: Type.NumberOfLines;
            overline?: Type.NumberOfLines;
            lineThrough?: Type.NumberOfLines;
            rotation?: Type.RotationDegrees;
            letterSpacing?: Type.NumberOrNormal;
            lineHeight?: Type.NumberOrNormal;
            dir?: Type.TextDirection;
            enclosure?: Type.EnclosureShape;
        };
    };
    export type FormattedSymbolId = {
        smuflGlyphName: Type.SmuflGlyphName;
    } & {
        $: {
            justify?: Type.LeftCenterRight;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            underline?: Type.NumberOfLines;
            overline?: Type.NumberOfLines;
            lineThrough?: Type.NumberOfLines;
            rotation?: Type.RotationDegrees;
            letterSpacing?: Type.NumberOrNormal;
            lineHeight?: Type.NumberOrNormal;
            dir?: Type.TextDirection;
            enclosure?: Type.EnclosureShape;
            id?: ID;
        };
    };
    export type FormattedText = {
        xsString: string;
    } & {
        $: {
            justify?: Type.LeftCenterRight;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            underline?: Type.NumberOfLines;
            overline?: Type.NumberOfLines;
            lineThrough?: Type.NumberOfLines;
            rotation?: Type.RotationDegrees;
            letterSpacing?: Type.NumberOrNormal;
            lineHeight?: Type.NumberOrNormal;
            dir?: Type.TextDirection;
            enclosure?: Type.EnclosureShape;
            xmlLang?: XML.lang;
            xmlSpace?: XML.space;
        };
    };
    export type FormattedTextId = {
        xsString: string;
    } & {
        $: {
            justify?: Type.LeftCenterRight;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            underline?: Type.NumberOfLines;
            overline?: Type.NumberOfLines;
            lineThrough?: Type.NumberOfLines;
            rotation?: Type.RotationDegrees;
            letterSpacing?: Type.NumberOrNormal;
            lineHeight?: Type.NumberOrNormal;
            dir?: Type.TextDirection;
            enclosure?: Type.EnclosureShape;
            xmlLang?: XML.lang;
            xmlSpace?: XML.space;
            id?: ID;
        };
    };
    export type Fret = {
        xsNonNegativeInteger: nonNegativeInteger;
    } & {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    };
    export type Level = {
        xsString: string;
    } & {
        $: {
            parentheses?: Type.YesNo;
            bracket?: Type.YesNo;
            size?: Type.SymbolSize;
            reference?: Type.YesNo;
            type_?: Type.StartStopSingle;
        };
    };
    export type MidiDevice = {
        xsString: string;
    } & {
        $: {
            port?: Type.Midi16;
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
        $: {
            printObject?: Type.YesNo;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
            smufl?: Type.SmuflSegnoGlyphName;
        };
    };
    export type String = {
        stringNumber: Type.StringNumber;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            placement?: Type.AboveBelow;
            color?: Type.Color;
            startNote?: Type.StartNote;
            trillStep?: Type.TrillStep;
            twoNoteTurn?: Type.TwoNoteTurn;
            accelerate?: Type.YesNo;
            beats?: Type.TrillBeats;
            secondBeat?: Type.Percent;
            lastBeat?: Type.Percent;
            type_: Type.StartStopContinue;
            number_?: Type.NumberLevel;
            smufl?: Type.SmuflWavyLineGlyphName;
        };
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
            slashes?: positiveInteger;
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            printObject?: Type.YesNo;
            id?: ID;
            number_?: Type.StaffNumber;
            additional?: Type.YesNo;
            size?: Type.SymbolSize;
            afterBarline?: Type.YesNo;
        };
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
            id?: ID;
            number_?: Type.StaffNumber;
        };
    };
    export type Interchangeable = {
        timeRelation: Type.TimeRelation;
    } & Group.TimeSignature[] & {
        $: {
            symbol_?: Type.TimeSymbol;
            separator?: Type.TimeSeparator;
        };
    };
    export type Key = {
        keyOctave: Type.KeyOctave[];
    } & (Group.TraditionalKey | Group.NonTraditionalKey[]) & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            printObject?: Type.YesNo;
            id?: ID;
            number_?: Type.StaffNumber;
        };
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
            cancel?: Type.YesNo;
        };
    };
    export type LineDetail = {
        $: {
            color?: Type.Color;
            lineType?: Type.LineType;
            printObject?: Type.YesNo;
            line: Type.StaffLine;
            width?: Type.Tenths;
        };
    };
    export type MeasureRepeat = {
        positiveIntegerOrEmpty: Type.PositiveIntegerOrEmpty;
    } & {
        $: {
            type_: Type.StartStop;
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
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            id?: ID;
            number_?: Type.StaffNumber;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
            topStaff?: Type.StaffNumber;
            bottomStaff?: Type.StaffNumber;
        };
    };
    export type PartTranspose = Group.Transpose;
    export type Slash = Group.Slash & {
        $: {
            type_: Type.StartStop;
            useDots?: Type.YesNo;
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
            printObject?: Type.YesNo;
            printSpacing?: Type.YesNo;
            number_?: Type.StaffNumber;
            showFrets?: Type.ShowFrets;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            printObject?: Type.YesNo;
            id?: ID;
            number_?: Type.StaffNumber;
            symbol_?: Type.TimeSymbol;
            separator?: Type.TimeSeparator;
        };
    };
    export type Transpose = Group.Transpose & {
        $: {
            id?: ID;
            number_?: Type.StaffNumber;
        };
    };
    export type BarStyleColor = {
        barStyle: Type.BarStyle;
    } & {
        $: {
            color?: Type.Color;
        };
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
            id?: ID;
            location: Type.RightLeftMiddle;
            segno?: token;
            coda?: token;
            divisions?: Type.Divisions;
        };
    };
    export type Ending = {
        xsString: string;
    } & {
        $: {
            printObject?: Type.YesNo;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            system?: Type.SystemRelation;
            number_: Type.EndingNumber;
            type_: Type.StartStopDiscontinue;
            endLength?: Type.Tenths;
            textX?: Type.Tenths;
            textY?: Type.Tenths;
        };
    };
    export type Repeat = {
        $: {
            direction: Type.BackwardForward;
            times?: nonNegativeInteger;
            afterJump?: Type.YesNo;
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
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
        };
    };
    export type Barre = {
        $: {
            color?: Type.Color;
            type_: Type.StartStop;
        };
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
            printObject?: Type.YesNo;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            location?: Type.LeftRight;
        };
    };
    export type BassStep = {
        step: Type.Step;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            text?: token;
        };
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
            lineType?: Type.LineType;
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
            id?: ID;
            type_: Type.StartStopContinue;
            number_?: Type.NumberLevel;
            lineEnd: Type.LineEnd;
            endLength?: Type.Tenths;
        };
    };
    export type Dashes = {
        $: {
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
            id?: ID;
            type_: Type.StartStopContinue;
            number_?: Type.NumberLevel;
        };
    };
    export type Degree = {
        degreeValue: Type.DegreeValue;
    } & {
        degreeAlter: Type.DegreeAlter;
    } & {
        degreeType: Type.DegreeType;
    } & {
        $: {
            printObject?: Type.YesNo;
        };
    };
    export type DegreeAlter = {
        semitones: Type.Semitones;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            plusMinus?: Type.YesNo;
        };
    };
    export type DegreeType = {
        degreeTypeValue: Type.DegreeTypeValue;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            text?: token;
        };
    };
    export type DegreeValue = {
        xsPositiveInteger: positiveInteger;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            symbol_?: Type.DegreeSymbolValue;
            text?: token;
        };
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
        $: {
            placement?: Type.AboveBelow;
            directive?: Type.YesNo;
            system?: Type.SystemRelation;
            id?: ID;
        };
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
        $: {
            id?: ID;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.ValignImage;
            id?: ID;
            height?: Type.Tenths;
            width?: Type.Tenths;
            unplayed?: token;
        };
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
            id?: ID;
            type_: Type.StartStopSingle;
            number_: token;
            memberOf?: token;
        };
    };
    export type Harmony = {
        frame: Type.Frame;
    } & {
        offset: Type.Offset;
    } & Group.HarmonyChord[] & Group.Editorial & Group.Staff & {
        $: {
            printObject?: Type.YesNo;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            system?: Type.SystemRelation;
            id?: ID;
            type_?: Type.HarmonyType;
            printFrame?: Type.YesNo;
            arrangement?: Type.HarmonyArrangement;
        };
    };
    export type HarpPedals = {
        pedalTuning: Type.PedalTuning[];
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
        };
    };
    export type Image = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            halign?: Type.LeftCenterRight;
            valign?: Type.ValignImage;
            source: anyURI;
            type_: token;
            height?: Type.Tenths;
            width?: Type.Tenths;
            id?: ID;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            text?: token;
        };
    };
    export type Kind = {
        kindValue: Type.KindValue;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            useSymbols?: Type.YesNo;
            text?: token;
            stackDegrees?: Type.YesNo;
            parenthesesDegrees?: Type.YesNo;
            bracketDegrees?: Type.YesNo;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            system?: Type.SystemRelationNumber;
            staff?: Type.StaffNumber;
            multipleRestAlways?: Type.YesNo;
            multipleRestRange?: Type.YesNo;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            printObject?: Type.YesNo;
            justify?: Type.LeftCenterRight;
            id?: ID;
            parentheses?: Type.YesNo;
        };
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
        $: {
            printObject?: Type.YesNo;
        };
    };
    export type NumeralRoot = {
        numeralValue: Type.NumeralValue;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            text?: token;
        };
    };
    export type OctaveShift = {
        $: {
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            id?: ID;
            type_: Type.UpDownStopContinue;
            number_?: Type.NumberLevel;
            size: positiveInteger;
        };
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
        $: {
            printObject?: Type.YesNo;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            smufl?: Type.SmuflGlyphName;
            id?: ID;
        };
    };
    export type OtherListening = {
        xsString: string;
    } & {
        $: {
            type_: token;
            player?: IDREF;
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Pedal = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
            type_: Type.PedalType;
            number_?: Type.NumberLevel;
            line?: Type.YesNo;
            sign?: Type.YesNo;
            abbreviated?: Type.YesNo;
        };
    };
    export type PedalTuning = {
        pedalStep: Type.Step;
    } & {
        pedalAlter: Type.Semitones;
    };
    export type PerMinute = {
        xsString: string;
    } & {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
        };
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
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            enclosure?: Type.EnclosureShape;
            id?: ID;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
            type_: Type.StartStop;
            symbol_: Type.PrincipalVoiceSymbol;
        };
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
        $: {
            staffSpacing?: Type.Tenths;
            newSystem?: Type.YesNo;
            newPage?: Type.YesNo;
            blankPage?: positiveInteger;
            pageNumber?: token;
            id?: ID;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            text?: token;
        };
    };
    export type Scordatura = {
        accord: Type.Accord[];
    } & {
        $: {
            id?: ID;
        };
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
            id?: ID;
            tempo?: Type.NonNegativeDecimal;
            dynamics?: Type.NonNegativeDecimal;
            dacapo?: Type.YesNo;
            segno?: token;
            dalsegno?: token;
            coda?: token;
            tocoda?: token;
            divisions?: Type.Divisions;
            forwardRepeat?: Type.YesNo;
            fine?: token;
            timeOnly?: Type.TimeOnly;
            pizzicato?: Type.YesNo;
            pan?: Type.RotationDegrees;
            elevation?: Type.RotationDegrees;
            damperPedal?: Type.YesNoNumber;
            softPedal?: Type.YesNoNumber;
            sostenutoPedal?: Type.YesNoNumber;
        };
    };
    export type StaffDivide = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
            type_: Type.StaffDivideSymbol;
        };
    };
    export type Stick = {
        stickType: Type.StickType;
    } & {
        stickMaterial: Type.StickMaterial;
    } & {
        $: {
            tip?: Type.TipDirection;
            parentheses?: Type.YesNo;
            dashedCircle?: Type.YesNo;
        };
    };
    export type StringMute = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            id?: ID;
            type_: Type.OnOff;
        };
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
            latency?: Type.Milliseconds;
            player?: IDREF;
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
            lineType?: Type.LineType;
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
            id?: ID;
            type_: Type.WedgeType;
            number_?: Type.NumberLevel;
            spread?: Type.Tenths;
            niente?: Type.YesNo;
        };
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
            element: NMTOKEN;
            attribute?: NMTOKEN;
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
            element?: NMTOKEN;
            position?: positiveInteger;
            id: ID;
            name?: token;
        };
    };
    export type Link = {
        $: {
            xlinkHref: XLink.href;
            xlinkType?: XLink.type;
            xlinkRole?: XLink.role;
            xlinkTitle?: XLink.title;
            xlinkShow: XLink.show;
            xlinkActuate: XLink.actuate;
            element?: NMTOKEN;
            position?: positiveInteger;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            name?: token;
        };
    };
    export type Accidental = {
        accidentalValue: Type.AccidentalValue;
    } & {
        $: {
            parentheses?: Type.YesNo;
            bracket?: Type.YesNo;
            size?: Type.SymbolSize;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            cautionary?: Type.YesNo;
            editorial?: Type.YesNo;
            smufl?: Type.SmuflAccidentalGlyphName;
        };
    };
    export type AccidentalMark = {
        accidentalValue: Type.AccidentalValue;
    } & {
        $: {
            parentheses?: Type.YesNo;
            bracket?: Type.YesNo;
            size?: Type.SymbolSize;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            id?: ID;
            smufl?: Type.SmuflAccidentalGlyphName;
        };
    };
    export type Arpeggiate = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            placement?: Type.AboveBelow;
            color?: Type.Color;
            id?: ID;
            number_?: Type.NumberLevel;
            direction?: Type.UpDown;
            unbroken?: Type.YesNo;
        };
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
        $: {
            id?: ID;
        };
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
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            smufl?: Type.SmuflGlyphName;
        };
    };
    export type Assess = {
        $: {
            type_: Type.YesNo;
            player?: IDREF;
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Backup = Group.Duration & Group.Editorial;
    export type Beam = {
        beamValue: Type.BeamValue;
    } & {
        $: {
            color?: Type.Color;
            id?: ID;
            number_: Type.BeamLevel;
            repeater?: Type.YesNo;
            fan?: Type.Fan;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            accelerate?: Type.YesNo;
            beats?: Type.TrillBeats;
            firstBeat?: Type.Percent;
            lastBeat?: Type.Percent;
            shape?: Type.BendShape;
        };
    };
    export type BreathMark = {
        breathMarkValue: Type.BreathMarkValue;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
    };
    export type Caesura = {
        caesuraValue: Type.CaesuraValue;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
    };
    export type Elision = {
        xsString: string;
    } & {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            smufl?: Type.SmuflLyricsGlyphName;
        };
    };
    export type EmptyLine = {
        $: {
            lineShape?: Type.LineShape;
            lineType?: Type.LineType;
            lineLength?: Type.LineLength;
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
    };
    export type Extend = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
            type_?: Type.StartStopContinue;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            halign?: Type.LeftCenterRight;
            valign?: Type.Valign;
            placement?: Type.AboveBelow;
            printObject?: Type.YesNo;
            printSpacing?: Type.YesNo;
            printDot?: Type.YesNo;
            printLyric?: Type.YesNo;
            id?: ID;
            parentheses?: Type.YesNo;
        };
    };
    export type Forward = Group.Duration & Group.EditorialVoice & Group.Staff;
    export type Glissando = {
        xsString: string;
    } & {
        $: {
            lineType?: Type.LineType;
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            id?: ID;
            type_: Type.StartStop;
            number_: Type.NumberLevel;
        };
    };
    export type Grace = {
        $: {
            stealTimePrevious?: Type.Percent;
            stealTimeFollowing?: Type.Percent;
            makeTime?: Type.Divisions;
            slash?: Type.YesNo;
        };
    };
    export type HammerOnPullOff = {
        xsString: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            type_: Type.StartStop;
            number_: Type.NumberLevel;
        };
    };
    export type Handbell = {
        handbellValue: Type.HandbellValue;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
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
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
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
        $: {
            printObject?: Type.YesNo;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
    };
    export type HeelToe = null;
    export type Hole = {
        holeType: string;
    } & {
        holeClosed: Type.HoleClosed;
    } & {
        holeShape: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
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
            justify?: Type.LeftCenterRight;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            placement?: Type.AboveBelow;
            color?: Type.Color;
            printObject?: Type.YesNo;
            id?: ID;
            number_?: NMTOKEN;
            name?: token;
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Mordent = null;
    export type NonArpeggiate = {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            placement?: Type.AboveBelow;
            color?: Type.Color;
            id?: ID;
            type_: Type.TopBottom;
            number_?: Type.NumberLevel;
        };
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
        $: {
            printObject?: Type.YesNo;
            id?: ID;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            printObject?: Type.YesNo;
            printSpacing?: Type.YesNo;
            printDot?: Type.YesNo;
            printLyric?: Type.YesNo;
            id?: ID;
            printLeger?: Type.YesNo;
            dynamics?: Type.NonNegativeDecimal;
            endDynamics?: Type.NonNegativeDecimal;
            attack?: Type.Divisions;
            release?: Type.Divisions;
            timeOnly?: Type.TimeOnly;
            pizzicato?: Type.YesNo;
        };
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
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            smufl?: Type.SmuflGlyphName;
            filled?: Type.YesNo;
            parentheses?: Type.YesNo;
        };
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
        $: {
            id?: ID;
        };
    };
    export type OtherNotation = {
        xsString: string;
    } & {
        $: {
            printObject?: Type.YesNo;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            smufl?: Type.SmuflGlyphName;
            id?: ID;
            type_: Type.StartStopSingle;
            number_: Type.NumberLevel;
        };
    };
    export type OtherPlacementText = {
        xsString: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            smufl?: Type.SmuflGlyphName;
        };
    };
    export type OtherText = {
        xsString: string;
    } & {
        $: {
            smufl?: Type.SmuflGlyphName;
        };
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
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
        };
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
            lineType?: Type.LineType;
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            accelerate?: Type.YesNo;
            beats?: Type.TrillBeats;
            firstBeat?: Type.Percent;
            lastBeat?: Type.Percent;
            id?: ID;
            type_: Type.StartStop;
            number_: Type.NumberLevel;
        };
    };
    export type Slur = {
        $: {
            lineType?: Type.LineType;
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            placement?: Type.AboveBelow;
            orientation?: Type.OverUnder;
            bezierX?: Type.Tenths;
            bezierY?: Type.Tenths;
            bezierX2?: Type.Tenths;
            bezierY2?: Type.Tenths;
            bezierOffset?: Type.Divisions;
            bezierOffset2?: Type.Divisions;
            color?: Type.Color;
            id?: ID;
            type_: Type.StartStopContinue;
            number_: Type.NumberLevel;
        };
    };
    export type Stem = {
        stemValue: Type.StemValue;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
        };
    };
    export type StrongAccent = null;
    export type StyleText = {
        xsString: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    };
    export type Tap = {
        xsString: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            hand?: Type.TapHand;
        };
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
        $: {
            id?: ID;
        };
    };
    export type TextElementData = {
        xsString: string;
    } & {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            underline?: Type.NumberOfLines;
            overline?: Type.NumberOfLines;
            lineThrough?: Type.NumberOfLines;
            rotation?: Type.RotationDegrees;
            letterSpacing?: Type.NumberOrNormal;
            dir?: Type.TextDirection;
            xmlLang?: XML.lang;
        };
    };
    export type Tie = {
        $: {
            type_: Type.StartStop;
            timeOnly?: Type.TimeOnly;
        };
    };
    export type Tied = {
        $: {
            lineType?: Type.LineType;
            dashLength?: Type.Tenths;
            spaceLength?: Type.Tenths;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            placement?: Type.AboveBelow;
            orientation?: Type.OverUnder;
            bezierX?: Type.Tenths;
            bezierY?: Type.Tenths;
            bezierX2?: Type.Tenths;
            bezierY2?: Type.Tenths;
            bezierOffset?: Type.Divisions;
            bezierOffset2?: Type.Divisions;
            color?: Type.Color;
            id?: ID;
            type_: Type.TiedType;
            number_?: Type.NumberLevel;
        };
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
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            placement?: Type.AboveBelow;
            smufl?: Type.SmuflGlyphName;
            type_: Type.TremoloType;
        };
    };
    export type Tuplet = {
        tupletActual: Type.TupletPortion;
    } & {
        tupletNormal: Type.TupletPortion;
    } & {
        $: {
            lineShape?: Type.LineShape;
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            placement?: Type.AboveBelow;
            id?: ID;
            type_: Type.StartStop;
            number_?: Type.NumberLevel;
            bracket?: Type.YesNo;
            showNumber?: Type.ShowTuplet;
            showType?: Type.ShowTuplet;
        };
    };
    export type TupletDot = {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    };
    export type TupletNumber = {
        xsNonNegativeInteger: nonNegativeInteger;
    } & {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
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
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    };
    export type Unpitched = Group.DisplayStepOctave;
    export type Wait = {
        $: {
            player?: IDREF;
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
            id?: ID;
            page?: positiveInteger;
        };
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
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
        };
    };
    export type GroupBarline = {
        groupBarlineValue: Type.GroupBarlineValue;
    } & {
        $: {
            color?: Type.Color;
        };
    };
    export type GroupName = {
        xsString: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            justify?: Type.LeftCenterRight;
        };
    };
    export type GroupSymbol = {
        groupSymbolValue: Type.GroupSymbolValue;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
        };
    };
    export type InstrumentLink = {
        $: {
            id: IDREF;
        };
    };
    export type LyricFont = {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            number_?: NMTOKEN;
            name?: token;
        };
    };
    export type LyricLanguage = {
        $: {
            number_?: NMTOKEN;
            name?: token;
            xmlLang: XML.lang;
        };
    };
    export type Opus = {
        $: {
            xlinkHref: XLink.href;
            xlinkType?: XLink.type;
            xlinkRole?: XLink.role;
            xlinkTitle?: XLink.title;
            xlinkShow: XLink.show;
            xlinkActuate: XLink.actuate;
        };
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
            number_: token;
        };
    };
    export type PartLink = {
        instrumentLink: Type.InstrumentLink[];
    } & {
        groupLink: string[];
    } & {
        $: {
            xlinkHref: XLink.href;
            xlinkType?: XLink.type;
            xlinkRole?: XLink.role;
            xlinkTitle?: XLink.title;
            xlinkShow: XLink.show;
            xlinkActuate: XLink.actuate;
        };
    };
    export type PartList = (Group.PartGroup[] | Group.ScorePart[]) & Group.PartGroup[] & Group.ScorePart;
    export type PartName = {
        xsString: string;
    } & {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            printObject?: Type.YesNo;
            justify?: Type.LeftCenterRight;
        };
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
