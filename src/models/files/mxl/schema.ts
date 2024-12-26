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
    export interface PartMeasure {
        noteOrBackupOrForwardOrDirectionOrAttributesOrHarmonyOrFiguredBassOrPrintOrSoundOrListeningOrBarlineOrGroupingOrLinkOrBookmark: Type.Note | Type.Backup | Type.Forward | Type.Direction | Type.Attributes | Type.Harmony | Type.FiguredBass | Type.Print | Type.Sound | Type.Listening | Type.Barline | Type.Grouping | Type.Link | Type.Bookmark;
        $: {
            id?: ID;
            number_: token;
            text?: Type.MeasureText;
            implicit?: Type.YesNo;
            nonControlling?: Type.YesNo;
            width?: Type.Tenths;
        };
    }
    export interface ScorePartwisePart {
        measure: PartMeasure;
        $: {
            id: IDREF;
        };
    }
    export interface ScorePartwise {
        part: ScorePartwisePart;
        work: Type.Work;
        movementNumber: string;
        movementTitle: string;
        identification: Type.Identification;
        defaults: Type.Defaults;
        credit: Type.Credit[];
        partList: Type.PartList;
        $: {
            version: token;
        };
    }
    export interface MeasurePart {
        noteOrBackupOrForwardOrDirectionOrAttributesOrHarmonyOrFiguredBassOrPrintOrSoundOrListeningOrBarlineOrGroupingOrLinkOrBookmark: Type.Note | Type.Backup | Type.Forward | Type.Direction | Type.Attributes | Type.Harmony | Type.FiguredBass | Type.Print | Type.Sound | Type.Listening | Type.Barline | Type.Grouping | Type.Link | Type.Bookmark;
        $: {
            id: IDREF;
        };
    }
    export interface ScoreTimewiseMeasure {
        part: MeasurePart;
        $: {
            id?: ID;
            number_: token;
            text?: Type.MeasureText;
            implicit?: Type.YesNo;
            nonControlling?: Type.YesNo;
            width?: Type.Tenths;
        };
    }
    export interface ScoreTimewise {
        measure: ScoreTimewiseMeasure;
        work: Type.Work;
        movementNumber: string;
        movementTitle: string;
        identification: Type.Identification;
        defaults: Type.Defaults;
        credit: Type.Credit[];
        partList: Type.PartList;
        $: {
            version: token;
        };
    }
    export interface AttributesDirective {
        xsString: string;
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
    }
    export interface AccidentalText {
        accidentalValue: Type.AccidentalValue;
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
    }
    export interface Coda {
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
    }
    export interface Dynamics {
        pOrPpOrPppOrPpppOrPppppOrPpppppOrFOrFfOrFffOrFfffOrFffffOrFfffffOrMpOrMfOrSfOrSfpOrSfppOrFpOrRfOrRfzOrSfzOrSffzOrFzOrNOrPfOrSfzpOrOtherDynamics: Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.Empty | Type.OtherText;
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
    }
    export interface Empty {
    }
    export interface EmptyPlacement {
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
    }
    export interface EmptyPlacementSmufl {
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
    }
    export interface EmptyPrintStyle {
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
    }
    export interface EmptyPrintStyleAlign {
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
    }
    export interface EmptyPrintStyleAlignId {
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
    }
    export interface EmptyPrintObjectStyleAlign {
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
    }
    export interface EmptyTrillSound {
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
    }
    export interface HorizontalTurn {
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
    }
    export interface Fermata {
        fermataShape: Type.FermataShape;
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
    }
    export interface Fingering {
        xsString: string;
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
    }
    export interface FormattedSymbol {
        smuflGlyphName: Type.SmuflGlyphName;
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
    }
    export interface FormattedSymbolId {
        smuflGlyphName: Type.SmuflGlyphName;
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
    }
    export interface FormattedText {
        xsString: string;
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
    }
    export interface FormattedTextId {
        xsString: string;
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
    }
    export interface Fret {
        xsNonNegativeInteger: nonNegativeInteger;
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    }
    export interface Level {
        xsString: string;
        $: {
            parentheses?: Type.YesNo;
            bracket?: Type.YesNo;
            size?: Type.SymbolSize;
            reference?: Type.YesNo;
            type_?: Type.StartStopSingle;
        };
    }
    export interface MidiDevice {
        xsString: string;
        $: {
            port?: Type.Midi16;
            id?: IDREF;
        };
    }
    export interface MidiInstrument {
        midiChannel: Type.Midi16;
        midiName: string;
        midiBank: Type.Midi16384;
        midiProgram: Type.Midi128;
        midiUnpitched: Type.Midi128;
        volume: Type.Percent;
        pan: Type.RotationDegrees;
        elevation: Type.RotationDegrees;
        $: {
            id: IDREF;
        };
    }
    export interface NameDisplay {
        displayTextOrAccidentalText: Type.FormattedText | Type.AccidentalText;
        $: {
            printObject?: Type.YesNo;
        };
    }
    export interface OtherPlay {
        xsString: string;
        $: {
            type_: token;
        };
    }
    export interface Play {
        ipaOrMuteOrSemiPitchedOrOtherPlay: string | Type.Mute | Type.SemiPitched | Type.OtherPlay;
        $: {
            id?: IDREF;
        };
    }
    export interface Segno {
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
    }
    export interface String {
        stringNumber: Type.StringNumber;
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
    }
    export interface TypedText {
        xsString: string;
        $: {
            type_?: token;
        };
    }
    export interface WavyLine {
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
    }
    export interface Attributes {
        divisions: Type.PositiveDivisions;
        key: Type.Key[];
        time: Type.Time[];
        staves: nonNegativeInteger;
        partSymbol: Type.PartSymbol;
        instruments: nonNegativeInteger;
        clef: Type.Clef[];
        staffDetails: Type.StaffDetails[];
        directive: AttributesDirective;
        measureStyle: Type.MeasureStyle[];
        transposeOrForPart: Type.Transpose[] | Type.ForPart[];
        footnote: Type.FormattedText;
        level: Type.Level;
    }
    export interface BeatRepeat {
        exceptVoice: string[];
        slashType: Type.NoteTypeValue;
        slashDot: Type.Empty[];
        $: {
            type_: Type.StartStop;
            slashes?: positiveInteger;
            useDots?: Type.YesNo;
        };
    }
    export interface Cancel {
        fifths: Type.Fifths;
        $: {
            location?: Type.CancelLocation;
        };
    }
    export interface Clef {
        sign: Type.ClefSign;
        line: Type.StaffLinePosition;
        clefOctaveChange: integer;
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
    }
    export interface Double {
        $: {
            above?: Type.YesNo;
        };
    }
    export interface ForPart {
        partClef: Type.PartClef;
        partTranspose: Type.PartTranspose;
        $: {
            id?: ID;
            number_?: Type.StaffNumber;
        };
    }
    export interface Interchangeable {
        timeRelation: Type.TimeRelation;
        beats: string;
        beatType: string;
        $: {
            symbol_?: Type.TimeSymbol;
            separator?: Type.TimeSeparator;
        };
    }
    export interface Key {
        keyOctave: Type.KeyOctave[];
        groupOrGroup: [
            {
                cancel?: Type.Cancel;
            },
            {
                fifths?: Type.Fifths;
            },
            {
                mode?: Type.Mode;
            }
        ] | [
            {
                keyStep?: Type.Step;
            },
            {
                keyAlter?: Type.Semitones;
            },
            {
                keyAccidental?: Type.KeyAccidental;
            }
        ];
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
    }
    export interface KeyAccidental {
        accidentalValue: Type.AccidentalValue;
        $: {
            smufl?: Type.SmuflAccidentalGlyphName;
        };
    }
    export interface KeyOctave {
        octave: Type.Octave;
        $: {
            number_: positiveInteger;
            cancel?: Type.YesNo;
        };
    }
    export interface LineDetail {
        $: {
            color?: Type.Color;
            lineType?: Type.LineType;
            printObject?: Type.YesNo;
            line: Type.StaffLine;
            width?: Type.Tenths;
        };
    }
    export interface MeasureRepeat {
        positiveIntegerOrEmpty: Type.PositiveIntegerOrEmpty;
        $: {
            type_: Type.StartStop;
            slashes?: positiveInteger;
        };
    }
    export interface MeasureStyle {
        multipleRestOrMeasureRepeatOrBeatRepeatOrSlash: Type.MultipleRest | Type.MeasureRepeat | Type.BeatRepeat | Type.Slash;
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            id?: ID;
            number_?: Type.StaffNumber;
        };
    }
    export interface MultipleRest {
        xsPositiveInteger: positiveInteger;
        $: {
            useSymbols?: Type.YesNo;
        };
    }
    export interface PartClef {
        sign: Type.ClefSign;
        line: Type.StaffLinePosition;
        clefOctaveChange: integer;
    }
    export interface PartSymbol {
        groupSymbolValue: Type.GroupSymbolValue;
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
            topStaff?: Type.StaffNumber;
            bottomStaff?: Type.StaffNumber;
        };
    }
    export interface PartTranspose {
        diatonic: integer;
        chromatic: Type.Semitones;
        octaveChange: integer;
        double: Type.Double;
    }
    export interface Slash {
        exceptVoice: string[];
        slashType: Type.NoteTypeValue;
        slashDot: Type.Empty[];
        $: {
            type_: Type.StartStop;
            useDots?: Type.YesNo;
            useStems?: Type.YesNo;
        };
    }
    export interface StaffDetails {
        staffType: Type.StaffType;
        staffTuning: Type.StaffTuning[];
        capo: nonNegativeInteger;
        staffSize: Type.StaffSize;
        staffLines: nonNegativeInteger;
        lineDetail: Type.LineDetail[];
        $: {
            printObject?: Type.YesNo;
            printSpacing?: Type.YesNo;
            number_?: Type.StaffNumber;
            showFrets?: Type.ShowFrets;
        };
    }
    export interface StaffSize {
        nonNegativeDecimal: Type.NonNegativeDecimal;
        $: {
            scaling?: Type.NonNegativeDecimal;
        };
    }
    export interface StaffTuning {
        tuningStep: Type.Step;
        tuningAlter: Type.Semitones;
        tuningOctave: Type.Octave;
        $: {
            line: Type.StaffLine;
        };
    }
    export interface Time {
        sequenceOrSenzaMisura: [
            {
                interchangeable?: Type.Interchangeable;
            },
            {
                beats?: string;
            },
            {
                beatType?: string;
            }
        ] | string;
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
    }
    export interface Transpose {
        diatonic: integer;
        chromatic: Type.Semitones;
        octaveChange: integer;
        double: Type.Double;
        $: {
            id?: ID;
            number_?: Type.StaffNumber;
        };
    }
    export interface BarStyleColor {
        barStyle: Type.BarStyle;
        $: {
            color?: Type.Color;
        };
    }
    export interface Barline {
        barStyle: Type.BarStyleColor;
        wavyLine: Type.WavyLine;
        segno: Type.Segno;
        coda: Type.Coda;
        fermata: Type.Fermata[];
        ending: Type.Ending;
        repeat: Type.Repeat;
        footnote: Type.FormattedText;
        level: Type.Level;
        $: {
            id?: ID;
            location: Type.RightLeftMiddle;
            segno?: token;
            coda?: token;
            divisions?: Type.Divisions;
        };
    }
    export interface Ending {
        xsString: string;
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
    }
    export interface Repeat {
        $: {
            direction: Type.BackwardForward;
            times?: nonNegativeInteger;
            afterJump?: Type.YesNo;
            winged?: Type.Winged;
        };
    }
    export interface Accord {
        tuningStep: Type.Step;
        tuningAlter: Type.Semitones;
        tuningOctave: Type.Octave;
        $: {
            string_?: Type.StringNumber;
        };
    }
    export interface AccordionRegistration {
        accordionHigh: Type.Empty;
        accordionMiddle: Type.AccordionMiddle;
        accordionLow: Type.Empty;
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
    }
    export interface Barre {
        $: {
            color?: Type.Color;
            type_: Type.StartStop;
        };
    }
    export interface Bass {
        bassSeparator: Type.StyleText;
        bassStep: Type.BassStep;
        bassAlter: Type.HarmonyAlter;
        $: {
            arrangement?: Type.HarmonyArrangement;
        };
    }
    export interface HarmonyAlter {
        semitones: Type.Semitones;
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
    }
    export interface BassStep {
        step: Type.Step;
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
    }
    export interface Beater {
        beaterValue: Type.BeaterValue;
        $: {
            tip?: Type.TipDirection;
        };
    }
    export interface BeatUnitTied {
        beatUnit: Type.NoteTypeValue;
        beatUnitDot: Type.Empty[];
    }
    export interface Bracket {
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
    }
    export interface Dashes {
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
    }
    export interface Degree {
        degreeValue: Type.DegreeValue;
        degreeAlter: Type.DegreeAlter;
        degreeType: Type.DegreeType;
        $: {
            printObject?: Type.YesNo;
        };
    }
    export interface DegreeAlter {
        semitones: Type.Semitones;
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
    }
    export interface DegreeType {
        degreeTypeValue: Type.DegreeTypeValue;
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
    }
    export interface DegreeValue {
        xsPositiveInteger: positiveInteger;
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
    }
    export interface Direction {
        directionType: Type.DirectionType[];
        offset: Type.Offset;
        sound: Type.Sound;
        listening: Type.Listening;
        footnote: Type.FormattedText;
        level: Type.Level;
        voice: string;
        staff: positiveInteger;
        $: {
            placement?: Type.AboveBelow;
            directive?: Type.YesNo;
            system?: Type.SystemRelation;
            id?: ID;
        };
    }
    export interface DirectionType {
        rehearsalOrSegnoOrCodaOrChoiceOrWedgeOrDynamicsOrDashesOrBracketOrPedalOrMetronomeOrOctaveShiftOrHarpPedalsOrDampOrDampAllOrEyeglassesOrStringMuteOrScordaturaOrImageOrPrincipalVoiceOrPercussionOrAccordionRegistrationOrStaffDivideOrOtherDirection: Type.FormattedTextId[] | Type.Segno[] | Type.Coda[] | {
            wordsOrSymbol: Type.FormattedTextId | Type.FormattedSymbolId;
        } | Type.Wedge | Type.Dynamics[] | Type.Dashes | Type.Bracket | Type.Pedal | Type.Metronome | Type.OctaveShift | Type.HarpPedals | Type.EmptyPrintStyleAlignId | Type.EmptyPrintStyleAlignId | Type.EmptyPrintStyleAlignId | Type.StringMute | Type.Scordatura | Type.Image | Type.PrincipalVoice | Type.Percussion[] | Type.AccordionRegistration | Type.StaffDivide | Type.OtherDirection;
        $: {
            id?: ID;
        };
    }
    export interface Effect {
        effectValue: Type.EffectValue;
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    }
    export interface Feature {
        xsString: string;
        $: {
            type_?: token;
        };
    }
    export interface FirstFret {
        xsPositiveInteger: positiveInteger;
        $: {
            text?: token;
            location?: Type.LeftRight;
        };
    }
    export interface Frame {
        frameStrings: positiveInteger;
        frameFrets: positiveInteger;
        firstFret: Type.FirstFret;
        frameNote: Type.FrameNote[];
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
    }
    export interface FrameNote {
        string_: Type.String;
        fret: Type.Fret;
        fingering: Type.Fingering;
        barre: Type.Barre;
    }
    export interface Glass {
        glassValue: Type.GlassValue;
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    }
    export interface Grouping {
        feature: Type.Feature[];
        $: {
            id?: ID;
            type_: Type.StartStopSingle;
            number_: token;
            memberOf?: token;
        };
    }
    export interface Harmony {
        frame: Type.Frame;
        offset: Type.Offset;
        kind: Type.Kind;
        inversion: Type.Inversion;
        bass: Type.Bass;
        degree: Type.Degree[];
        rootOrNumeralOrFunction: Type.Root | Type.Numeral | Type.StyleText;
        footnote: Type.FormattedText;
        level: Type.Level;
        staff: positiveInteger;
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
    }
    export interface HarpPedals {
        pedalTuning: Type.PedalTuning[];
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
    }
    export interface Image {
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
    }
    export interface InstrumentChange {
        instrumentSound: string;
        virtualInstrument: Type.VirtualInstrument;
        soloOrEnsemble: Type.Empty | Type.PositiveIntegerOrEmpty;
        $: {
            id: IDREF;
        };
    }
    export interface Inversion {
        xsNonNegativeInteger: nonNegativeInteger;
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
    }
    export interface Kind {
        kindValue: Type.KindValue;
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
    }
    export interface Listening {
        offset: Type.Offset;
        syncOrOtherListening: Type.Sync | Type.OtherListening;
    }
    export interface MeasureNumbering {
        measureNumberingValue: Type.MeasureNumberingValue;
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
    }
    export interface Membrane {
        membraneValue: Type.MembraneValue;
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    }
    export interface Metal {
        metalValue: Type.MetalValue;
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    }
    export interface Metronome {
        sequenceOrSequence: [
            {
                beatUnitTied?: Type.BeatUnitTied[];
            },
            {
                perMinuteOrSequence: Type.PerMinute | [
                    {
                        beatUnitTied?: Type.BeatUnitTied[];
                    },
                    {
                        beatUnit?: Type.NoteTypeValue;
                    },
                    {
                        beatUnitDot?: Type.Empty[];
                    }
                ];
            },
            {
                beatUnit?: Type.NoteTypeValue;
            },
            {
                beatUnitDot?: Type.Empty[];
            }
        ] | [
            {
                metronomeArrows?: Type.Empty;
            },
            {
                metronomeNote?: Type.MetronomeNote[];
            },
            {
                metronomeRelation?: string;
            },
            {
                metronomeNote?: Type.MetronomeNote[];
            }
        ];
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
    }
    export interface MetronomeBeam {
        beamValue: Type.BeamValue;
        $: {
            number_: Type.BeamLevel;
        };
    }
    export interface MetronomeNote {
        metronomeType: Type.NoteTypeValue;
        metronomeDot: Type.Empty[];
        metronomeBeam: Type.MetronomeBeam[];
        metronomeTied: Type.MetronomeTied;
        metronomeTuplet: Type.MetronomeTuplet;
    }
    export interface MetronomeTied {
        $: {
            type_: Type.StartStop;
        };
    }
    export interface MetronomeTuplet {
    }
    export interface Numeral {
        numeralRoot: Type.NumeralRoot;
        numeralAlter: Type.HarmonyAlter;
        numeralKey: Type.NumeralKey;
    }
    export interface NumeralKey {
        numeralFifths: Type.Fifths;
        numeralMode: Type.NumeralMode;
        $: {
            printObject?: Type.YesNo;
        };
    }
    export interface NumeralRoot {
        numeralValue: Type.NumeralValue;
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
    }
    export interface OctaveShift {
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
    }
    export interface Offset {
        divisions: Type.Divisions;
        $: {
            sound?: Type.YesNo;
        };
    }
    export interface OtherDirection {
        xsString: string;
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
    }
    export interface OtherListening {
        xsString: string;
        $: {
            type_: token;
            player?: IDREF;
            timeOnly?: Type.TimeOnly;
        };
    }
    export interface Pedal {
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
    }
    export interface PedalTuning {
        pedalStep: Type.Step;
        pedalAlter: Type.Semitones;
    }
    export interface PerMinute {
        xsString: string;
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
        };
    }
    export interface Percussion {
        glassOrMetalOrWoodOrPitchedOrMembraneOrEffectOrTimpaniOrBeaterOrStickOrStickLocationOrOtherPercussion: Type.Glass | Type.Metal | Type.Wood | Type.Pitched | Type.Membrane | Type.Effect | Type.Timpani | Type.Beater | Type.Stick | Type.StickLocation | Type.OtherText;
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
    }
    export interface Pitched {
        pitchedValue: Type.PitchedValue;
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    }
    export interface PrincipalVoice {
        xsString: string;
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
    }
    export interface Print {
        measureLayout: Type.MeasureLayout;
        measureNumbering: Type.MeasureNumbering;
        partNameDisplay: Type.NameDisplay;
        partAbbreviationDisplay: Type.NameDisplay;
        pageLayout: Type.PageLayout;
        systemLayout: Type.SystemLayout;
        staffLayout: Type.StaffLayout[];
        $: {
            staffSpacing?: Type.Tenths;
            newSystem?: Type.YesNo;
            newPage?: Type.YesNo;
            blankPage?: positiveInteger;
            pageNumber?: token;
            id?: ID;
        };
    }
    export interface Root {
        rootStep: Type.RootStep;
        rootAlter: Type.HarmonyAlter;
    }
    export interface RootStep {
        step: Type.Step;
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
    }
    export interface Scordatura {
        accord: Type.Accord[];
        $: {
            id?: ID;
        };
    }
    export interface Sound {
        swing: Type.Swing;
        offset: Type.Offset;
        instrumentChange: Type.InstrumentChange;
        midiDevice: Type.MidiDevice;
        midiInstrument: Type.MidiInstrument;
        play: Type.Play;
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
    }
    export interface StaffDivide {
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
    }
    export interface Stick {
        stickType: Type.StickType;
        stickMaterial: Type.StickMaterial;
        $: {
            tip?: Type.TipDirection;
            parentheses?: Type.YesNo;
            dashedCircle?: Type.YesNo;
        };
    }
    export interface StringMute {
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
    }
    export interface Swing {
        swingStyle: string;
        straightOrSequence: Type.Empty | [
            {
                first?: positiveInteger;
            },
            {
                second?: positiveInteger;
            },
            {
                swingType?: Type.SwingTypeValue;
            }
        ];
    }
    export interface Sync {
        $: {
            type_: Type.SyncType;
            latency?: Type.Milliseconds;
            player?: IDREF;
            timeOnly?: Type.TimeOnly;
        };
    }
    export interface Timpani {
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    }
    export interface Wedge {
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
    }
    export interface Wood {
        woodValue: Type.WoodValue;
        $: {
            smufl?: Type.SmuflPictogramGlyphName;
        };
    }
    export interface Encoding {
        encodingDateOrEncoderOrSoftwareOrEncodingDescriptionOrSupports: Type.YyyyMmDd | Type.TypedText | string | string | Type.Supports;
    }
    export interface Identification {
        creator: Type.TypedText[];
        rights: Type.TypedText[];
        encoding: Type.Encoding;
        source: string;
        relation: Type.TypedText[];
        miscellaneous: Type.Miscellaneous;
    }
    export interface Miscellaneous {
        miscellaneousField: Type.MiscellaneousField[];
    }
    export interface MiscellaneousField {
        xsString: string;
        $: {
            name: token;
        };
    }
    export interface Supports {
        $: {
            type_: Type.YesNo;
            element: NMTOKEN;
            attribute?: NMTOKEN;
            value?: token;
        };
    }
    export interface Appearance {
        lineWidth: Type.LineWidth[];
        noteSize: Type.NoteSize[];
        distance: Type.Distance[];
        glyph: Type.Glyph[];
        otherAppearance: Type.OtherAppearance[];
    }
    export interface Distance {
        tenths: Type.Tenths;
        $: {
            type_: Type.DistanceType;
        };
    }
    export interface Glyph {
        smuflGlyphName: Type.SmuflGlyphName;
        $: {
            type_: Type.GlyphType;
        };
    }
    export interface LineWidth {
        tenths: Type.Tenths;
        $: {
            type_: Type.LineWidthType;
        };
    }
    export interface MeasureLayout {
        measureDistance: Type.Tenths;
    }
    export interface NoteSize {
        nonNegativeDecimal: Type.NonNegativeDecimal;
        $: {
            type_: Type.NoteSizeType;
        };
    }
    export interface OtherAppearance {
        xsString: string;
        $: {
            type_: token;
        };
    }
    export interface PageLayout {
        pageMargins: Type.PageMargins[];
        pageHeight: Type.Tenths;
        pageWidth: Type.Tenths;
    }
    export interface PageMargins {
        topMargin: Type.Tenths;
        bottomMargin: Type.Tenths;
        leftMargin: Type.Tenths;
        rightMargin: Type.Tenths;
        $: {
            type_?: Type.MarginType;
        };
    }
    export interface Scaling {
        millimeters: Type.Millimeters;
        tenths: Type.Tenths;
    }
    export interface StaffLayout {
        staffDistance: Type.Tenths;
        $: {
            number_?: Type.StaffNumber;
        };
    }
    export interface SystemDividers {
        leftDivider: Type.EmptyPrintObjectStyleAlign;
        rightDivider: Type.EmptyPrintObjectStyleAlign;
    }
    export interface SystemLayout {
        systemMargins: Type.SystemMargins;
        systemDistance: Type.Tenths;
        topSystemDistance: Type.Tenths;
        systemDividers: Type.SystemDividers;
    }
    export interface SystemMargins {
        leftMargin: Type.Tenths;
        rightMargin: Type.Tenths;
    }
    export interface Bookmark {
        $: {
            element?: NMTOKEN;
            position?: positiveInteger;
            id: ID;
            name?: token;
        };
    }
    export interface Link {
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
    }
    export interface Accidental {
        accidentalValue: Type.AccidentalValue;
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
    }
    export interface AccidentalMark {
        accidentalValue: Type.AccidentalValue;
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
    }
    export interface Arpeggiate {
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
    }
    export interface Articulations {
        accentOrStrongAccentOrStaccatoOrTenutoOrDetachedLegatoOrStaccatissimoOrSpiccatoOrScoopOrPlopOrDoitOrFalloffOrBreathMarkOrCaesuraOrStressOrUnstressOrSoftAccentOrOtherArticulation: Type.EmptyPlacement | Type.StrongAccent | Type.EmptyPlacement | Type.EmptyPlacement | Type.EmptyPlacement | Type.EmptyPlacement | Type.EmptyPlacement | Type.EmptyLine | Type.EmptyLine | Type.EmptyLine | Type.EmptyLine | Type.BreathMark | Type.Caesura | Type.EmptyPlacement | Type.EmptyPlacement | Type.EmptyPlacement | Type.OtherPlacementText;
        $: {
            id?: ID;
        };
    }
    export interface Arrow {
        sequenceOrCircularArrow: [
            {
                arrowDirection?: Type.ArrowDirection;
            },
            {
                arrowStyle?: Type.ArrowStyle;
            },
            {
                arrowhead?: Type.Empty;
            }
        ] | Type.CircularArrow;
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
    }
    export interface Assess {
        $: {
            type_: Type.YesNo;
            player?: IDREF;
            timeOnly?: Type.TimeOnly;
        };
    }
    export interface Backup {
        duration: Type.PositiveDivisions;
        footnote: Type.FormattedText;
        level: Type.Level;
    }
    export interface Beam {
        beamValue: Type.BeamValue;
        $: {
            color?: Type.Color;
            id?: ID;
            number_: Type.BeamLevel;
            repeater?: Type.YesNo;
            fan?: Type.Fan;
        };
    }
    export interface Bend {
        bendAlter: Type.Semitones;
        withBar: Type.PlacementText;
        preBendOrRelease: Type.Empty | Type.Release;
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
    }
    export interface BreathMark {
        breathMarkValue: Type.BreathMarkValue;
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
    }
    export interface Caesura {
        caesuraValue: Type.CaesuraValue;
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
    }
    export interface Elision {
        xsString: string;
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
            smufl?: Type.SmuflLyricsGlyphName;
        };
    }
    export interface EmptyLine {
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
    }
    export interface Extend {
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
            type_?: Type.StartStopContinue;
        };
    }
    export interface Figure {
        prefix: Type.StyleText;
        figureNumber: Type.StyleText;
        suffix: Type.StyleText;
        extend: Type.Extend;
        footnote: Type.FormattedText;
        level: Type.Level;
    }
    export interface FiguredBass {
        figure: Type.Figure[];
        duration: Type.PositiveDivisions;
        footnote: Type.FormattedText;
        level: Type.Level;
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
    }
    export interface Forward {
        duration: Type.PositiveDivisions;
        footnote: Type.FormattedText;
        level: Type.Level;
        voice: string;
        staff: positiveInteger;
    }
    export interface Glissando {
        xsString: string;
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
    }
    export interface Grace {
        $: {
            stealTimePrevious?: Type.Percent;
            stealTimeFollowing?: Type.Percent;
            makeTime?: Type.Divisions;
            slash?: Type.YesNo;
        };
    }
    export interface HammerOnPullOff {
        xsString: string;
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
    }
    export interface Handbell {
        handbellValue: Type.HandbellValue;
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
    }
    export interface HarmonClosed {
        harmonClosedValue: Type.HarmonClosedValue;
        $: {
            location?: Type.HarmonClosedLocation;
        };
    }
    export interface HarmonMute {
        harmonClosed: Type.HarmonClosed;
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
    }
    export interface Harmonic {
        naturalOrArtificial: Type.Empty | Type.Empty;
        basePitchOrTouchingPitchOrSoundingPitch: Type.Empty | Type.Empty | Type.Empty;
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
    }
    export interface HeelToe {
    }
    export interface Hole {
        holeType: string;
        holeClosed: Type.HoleClosed;
        holeShape: string;
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
    }
    export interface HoleClosed {
        holeClosedValue: Type.HoleClosedValue;
        $: {
            location?: Type.HoleClosedLocation;
        };
    }
    export interface Instrument {
        $: {
            id: IDREF;
        };
    }
    export interface Listen {
        assessOrWaitOrOtherListen: Type.Assess | Type.Wait | Type.OtherListening;
    }
    export interface Lyric {
        endLine: Type.Empty;
        endParagraph: Type.Empty;
        sequenceOrExtendOrLaughingOrHumming: [
            {
                syllabic?: Type.Syllabic;
            },
            {
                text?: Type.TextElementData;
            },
            {
                extend?: Type.Extend;
            },
            {
                text?: Type.TextElementData;
            },
            {
                elision?: Type.Elision;
            },
            {
                syllabic?: Type.Syllabic;
            }
        ] | Type.Extend | Type.Empty | Type.Empty;
        footnote: Type.FormattedText;
        level: Type.Level;
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
    }
    export interface Mordent {
    }
    export interface NonArpeggiate {
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
    }
    export interface Notations {
        tiedOrSlurOrTupletOrGlissandoOrSlideOrOrnamentsOrTechnicalOrArticulationsOrDynamicsOrFermataOrArpeggiateOrNonArpeggiateOrAccidentalMarkOrOtherNotation: Type.Tied | Type.Slur | Type.Tuplet | Type.Glissando | Type.Slide | Type.Ornaments | Type.Technical | Type.Articulations | Type.Dynamics | Type.Fermata | Type.Arpeggiate | Type.NonArpeggiate | Type.AccidentalMark | Type.OtherNotation;
        footnote: Type.FormattedText;
        level: Type.Level;
        $: {
            printObject?: Type.YesNo;
            id?: ID;
        };
    }
    export interface Note {
        instrument: Type.Instrument[];
        type_: Type.NoteType;
        dot: Type.EmptyPlacement[];
        accidental: Type.Accidental;
        timeModification: Type.TimeModification;
        stem: Type.Stem;
        notehead: Type.Notehead;
        noteheadText: Type.NoteheadText;
        beam: Type.Beam[];
        notations: Type.Notations[];
        lyric: Type.Lyric[];
        play: Type.Play;
        listen: Type.Listen;
        sequenceOrSequenceOrSequence: [
            {
                grace?: Type.Grace;
            },
            {
                sequenceOrSequence: [
                    {
                        tie?: Type.Tie[];
                    },
                    {
                        chord?: Type.Empty;
                    },
                    {
                        pitchOrUnpitchedOrRest: Type.Pitch | Type.Unpitched | Type.Rest;
                    }
                ] | [
                    {
                        cue?: Type.Empty;
                    },
                    {
                        chord?: Type.Empty;
                    },
                    {
                        pitchOrUnpitchedOrRest: Type.Pitch | Type.Unpitched | Type.Rest;
                    }
                ];
            }
        ] | [
            {
                cue?: Type.Empty;
            },
            {
                chord?: Type.Empty;
            },
            {
                pitchOrUnpitchedOrRest: Type.Pitch | Type.Unpitched | Type.Rest;
            },
            {
                duration?: Type.PositiveDivisions;
            }
        ] | [
            {
                tie?: Type.Tie[];
            },
            {
                chord?: Type.Empty;
            },
            {
                pitchOrUnpitchedOrRest: Type.Pitch | Type.Unpitched | Type.Rest;
            },
            {
                duration?: Type.PositiveDivisions;
            }
        ];
        footnote: Type.FormattedText;
        level: Type.Level;
        voice: string;
        staff: positiveInteger;
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
    }
    export interface NoteType {
        noteTypeValue: Type.NoteTypeValue;
        $: {
            size?: Type.SymbolSize;
        };
    }
    export interface Notehead {
        noteheadValue: Type.NoteheadValue;
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
    }
    export interface NoteheadText {
        displayTextOrAccidentalText: Type.FormattedText | Type.AccidentalText;
    }
    export interface Ornaments {
        accidentalMark: Type.AccidentalMark[];
        trillMarkOrTurnOrDelayedTurnOrInvertedTurnOrDelayedInvertedTurnOrVerticalTurnOrInvertedVerticalTurnOrShakeOrWavyLineOrMordentOrInvertedMordentOrSchleiferOrTremoloOrHaydnOrOtherOrnament: Type.EmptyTrillSound | Type.HorizontalTurn | Type.HorizontalTurn | Type.HorizontalTurn | Type.HorizontalTurn | Type.EmptyTrillSound | Type.EmptyTrillSound | Type.EmptyTrillSound | Type.WavyLine | Type.Mordent | Type.Mordent | Type.EmptyPlacement | Type.Tremolo | Type.EmptyTrillSound | Type.OtherPlacementText;
        $: {
            id?: ID;
        };
    }
    export interface OtherNotation {
        xsString: string;
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
    }
    export interface OtherPlacementText {
        xsString: string;
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
    }
    export interface OtherText {
        xsString: string;
        $: {
            smufl?: Type.SmuflGlyphName;
        };
    }
    export interface Pitch {
        step: Type.Step;
        alter: Type.Semitones;
        octave: Type.Octave;
    }
    export interface PlacementText {
        xsString: string;
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
    }
    export interface Release {
    }
    export interface Rest {
        displayStep: Type.Step;
        displayOctave: Type.Octave;
        $: {
            measure?: Type.YesNo;
        };
    }
    export interface Slide {
        xsString: string;
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
    }
    export interface Slur {
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
    }
    export interface Stem {
        stemValue: Type.StemValue;
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
        };
    }
    export interface StrongAccent {
    }
    export interface StyleText {
        xsString: string;
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
    }
    export interface Tap {
        xsString: string;
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
    }
    export interface Technical {
        upBowOrDownBowOrHarmonicOrOpenStringOrThumbPositionOrFingeringOrPluckOrDoubleTongueOrTripleTongueOrStoppedOrSnapPizzicatoOrFretOrStringOrHammerOnOrPullOffOrBendOrTapOrHeelOrToeOrFingernailsOrHoleOrArrowOrHandbellOrBrassBendOrFlipOrSmearOrOpenOrHalfMutedOrHarmonMuteOrGolpeOrOtherTechnical: Type.EmptyPlacement | Type.EmptyPlacement | Type.Harmonic | Type.EmptyPlacement | Type.EmptyPlacement | Type.Fingering | Type.PlacementText | Type.EmptyPlacement | Type.EmptyPlacement | Type.EmptyPlacementSmufl | Type.EmptyPlacement | Type.Fret | Type.String | Type.HammerOnPullOff | Type.HammerOnPullOff | Type.Bend | Type.Tap | Type.HeelToe | Type.HeelToe | Type.EmptyPlacement | Type.Hole | Type.Arrow | Type.Handbell | Type.EmptyPlacement | Type.EmptyPlacement | Type.EmptyPlacement | Type.EmptyPlacementSmufl | Type.EmptyPlacementSmufl | Type.HarmonMute | Type.EmptyPlacement | Type.OtherPlacementText;
        $: {
            id?: ID;
        };
    }
    export interface TextElementData {
        xsString: string;
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
    }
    export interface Tie {
        $: {
            type_: Type.StartStop;
            timeOnly?: Type.TimeOnly;
        };
    }
    export interface Tied {
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
    }
    export interface TimeModification {
        actualNotes: nonNegativeInteger;
        normalNotes: nonNegativeInteger;
        normalType: Type.NoteTypeValue;
        normalDot: Type.Empty[];
    }
    export interface Tremolo {
        tremoloMarks: Type.TremoloMarks;
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
    }
    export interface Tuplet {
        tupletActual: Type.TupletPortion;
        tupletNormal: Type.TupletPortion;
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
    }
    export interface TupletDot {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    }
    export interface TupletNumber {
        xsNonNegativeInteger: nonNegativeInteger;
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    }
    export interface TupletPortion {
        tupletNumber: Type.TupletNumber;
        tupletType: Type.TupletType;
        tupletDot: Type.TupletDot[];
    }
    export interface TupletType {
        noteTypeValue: Type.NoteTypeValue;
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            color?: Type.Color;
        };
    }
    export interface Unpitched {
        displayStep: Type.Step;
        displayOctave: Type.Octave;
    }
    export interface Wait {
        $: {
            player?: IDREF;
            timeOnly?: Type.TimeOnly;
        };
    }
    export interface Credit {
        creditType: string[];
        link: Type.Link[];
        bookmark: Type.Bookmark[];
        creditImageOrSequence: Type.Image | [
            {
                creditWordsOrCreditSymbol: Type.FormattedTextId | Type.FormattedSymbolId;
            },
            {
                link?: Type.Link[];
            },
            {
                bookmark?: Type.Bookmark[];
            },
            {
                creditWordsOrCreditSymbol: Type.FormattedTextId | Type.FormattedSymbolId;
            }
        ];
        $: {
            id?: ID;
            page?: positiveInteger;
        };
    }
    export interface Defaults {
        scaling: Type.Scaling;
        concertScore: Type.Empty;
        appearance: Type.Appearance;
        musicFont: Type.EmptyFont;
        wordFont: Type.EmptyFont;
        lyricFont: Type.LyricFont[];
        lyricLanguage: Type.LyricLanguage[];
        pageLayout: Type.PageLayout;
        systemLayout: Type.SystemLayout;
        staffLayout: Type.StaffLayout[];
    }
    export interface EmptyFont {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
        };
    }
    export interface GroupBarline {
        groupBarlineValue: Type.GroupBarlineValue;
        $: {
            color?: Type.Color;
        };
    }
    export interface GroupName {
        xsString: string;
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
    }
    export interface GroupSymbol {
        groupSymbolValue: Type.GroupSymbolValue;
        $: {
            defaultX?: Type.Tenths;
            defaultY?: Type.Tenths;
            relativeX?: Type.Tenths;
            relativeY?: Type.Tenths;
            color?: Type.Color;
        };
    }
    export interface InstrumentLink {
        $: {
            id: IDREF;
        };
    }
    export interface LyricFont {
        $: {
            fontFamily?: Type.FontFamily;
            fontStyle?: Type.FontStyle;
            fontSize?: Type.FontSize;
            fontWeight?: Type.FontWeight;
            number_?: NMTOKEN;
            name?: token;
        };
    }
    export interface LyricLanguage {
        $: {
            number_?: NMTOKEN;
            name?: token;
            xmlLang: XML.lang;
        };
    }
    export interface Opus {
        $: {
            xlinkHref: XLink.href;
            xlinkType?: XLink.type;
            xlinkRole?: XLink.role;
            xlinkTitle?: XLink.title;
            xlinkShow: XLink.show;
            xlinkActuate: XLink.actuate;
        };
    }
    export interface PartGroup {
        groupName: Type.GroupName;
        groupNameDisplay: Type.NameDisplay;
        groupAbbreviation: Type.GroupName;
        groupAbbreviationDisplay: Type.NameDisplay;
        groupSymbol: Type.GroupSymbol;
        groupBarline: Type.GroupBarline;
        groupTime: Type.Empty;
        footnote: Type.FormattedText;
        level: Type.Level;
        $: {
            type_: Type.StartStop;
            number_: token;
        };
    }
    export interface PartLink {
        instrumentLink: Type.InstrumentLink[];
        groupLink: string[];
        $: {
            xlinkHref: XLink.href;
            xlinkType?: XLink.type;
            xlinkRole?: XLink.role;
            xlinkTitle?: XLink.title;
            xlinkShow: XLink.show;
            xlinkActuate: XLink.actuate;
        };
    }
    export interface PartList {
        groupOrGroup: [
            {
                partGroup?: Type.PartGroup;
            }
        ] | [
            {
                scorePart?: Type.ScorePart;
            }
        ];
        partGroup: Type.PartGroup;
        scorePart: Type.ScorePart;
    }
    export interface PartName {
        xsString: string;
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
    }
    export interface Player {
        playerName: string;
        $: {
            id: ID;
        };
    }
    export interface ScoreInstrument {
        instrumentName: string;
        instrumentAbbreviation: string;
        instrumentSound: string;
        virtualInstrument: Type.VirtualInstrument;
        soloOrEnsemble: Type.Empty | Type.PositiveIntegerOrEmpty;
        $: {
            id: ID;
        };
    }
    export interface ScorePart {
        identification: Type.Identification;
        partLink: Type.PartLink[];
        partName: Type.PartName;
        partNameDisplay: Type.NameDisplay;
        partAbbreviation: Type.PartName;
        partAbbreviationDisplay: Type.NameDisplay;
        group: string[];
        scoreInstrument: Type.ScoreInstrument[];
        player: Type.Player[];
        midiDevice: Type.MidiDevice;
        midiInstrument: Type.MidiInstrument;
        $: {
            id: ID;
        };
    }
    export interface VirtualInstrument {
        virtualLibrary: string;
        virtualName: string;
    }
    export interface Work {
        workNumber: string;
        workTitle: string;
        opus: Type.Opus;
    }
}
