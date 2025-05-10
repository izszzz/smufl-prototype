/* eslint-disable @typescript-eslint/no-explicit-any */
import * as xml2js from "xml2js";
import fs from "fs";
import * as R from "remeda";
import { JSONSchema } from "json-schema-to-typescript";
import { SetRequired } from "type-fest";

export const xsdToJsonSchema = async () => {
  let compile: typeof import("json-schema-to-typescript").compile | undefined;
  if (typeof window === "undefined") {
    compile = (await import("json-schema-to-typescript")).compile;
  }
  if (compile === undefined) return;

  const parser = new xml2js.Parser({ explicitChildren: true });
  const musicxml = await parser.parseStringPromise(
    fs.readFileSync("src/const/musicxml/4.0/musicxml.xsd")
  );
  const xlink = await parser.parseStringPromise(
    fs.readFileSync("src/const/musicxml/4.0/xlink.xsd")
  );
  const xml = await parser.parseStringPromise(
    fs.readFileSync("src/const/musicxml/4.0/xml.xsd")
  );

  const ts = await compile(
    {
      type: "object",
      properties: {
        "score-partwise": {
          $ref: "#/$defs/musicxml/element/score-partwise",
        },
      },
      $defs: {
        xlink: {
          attribute: R.pipe(
            xlink["xs:schema"].$$["xs:attribute"] as Attribute[],
            R.map(handleAttribute),
            R.mapToObj(({ title, ...other }) => [title, other])
          ),
        },
        xml: {
          attribute: R.pipe(
            xml["xs:schema"].$$["xs:attribute"],
            R.map(handleAttribute),
            R.mapToObj(({ title, ...other }) => [title, other])
          ),
          attributeGroup: R.pipe(
            xml["xs:schema"].$$["xs:attributeGroup"],
            R.map(handleAttributeGroup),
            R.mapToObj(({ title, ...other }) => [title, other])
          ),
        },
        musicxml: {
          type: R.mergeAll([
            R.pipe(
              musicxml["xs:schema"].$$["xs:simpleType"],
              R.map(
                (data) =>
                  handleSimpleType(data) as SetRequired<JSONSchema, "title">
              ),
              R.mapToObj(({ title, ...other }) => [title, other])
            ),
            R.pipe(
              musicxml["xs:schema"].$$["xs:complexType"],
              R.map(
                (data) =>
                  handleComplexType(data) as SetRequired<JSONSchema, "title">
              ),
              R.mapToObj(({ title, ...other }) => [title, other])
            ),
          ]),
          attributeGroup: R.pipe(
            musicxml["xs:schema"].$$["xs:attributeGroup"],
            R.map(handleAttributeGroup),
            R.mapToObj(({ title, ...other }) => [title, other])
          ),
          group: R.pipe(
            musicxml["xs:schema"].$$["xs:group"],
            R.map(handleGroup),
            R.mapToObj(({ title, ...other }) => [title, other])
          ),
          element: R.pipe(
            musicxml["xs:schema"].$$["xs:element"],
            R.map(handleElement),
            R.mapToObj(({ title, ...other }) => [title, other])
          ),
        },
      },
    },
    "MusicXML",
    { additionalProperties: false }
  );
  fs.writeFileSync("src/const/musicxml/4.0/musicxml.ts", ts);
};

type XsType =
  | "xs:language"
  | "xs:string"
  | "xs:token"
  | "xs:date"
  | "xs:ID"
  | "xs:IDREF"
  | "xs:NMTOKEN"
  | "xs:anyURI"
  | "xs:integer"
  | "xs:decimal"
  | "xs:nonNegativeInteger"
  | "xs:positiveInteger";

type Enumeration = { $: { value: string } };
type Restriction = {
  $: { base: XsType };
  $$?: {
    ["xs:enumeration"]?: Enumeration[];
    ["xs:minInclusive"]?: [{ $: { value: string } }];
    ["xs:maxInclusive"]?: [{ $: { value: string } }];
  };
};
type Union = {
  $: { memberTypes: string };
  $$?: { ["xs:simpleType"]?: SimpleType[] };
};
type SimpleType = {
  $?: { name: string };
  $$: {
    ["xs:restriction"]?: Restriction[];
    ["xs:union"]?: Union[];
  };
};
type ComplexType = {
  $?: { name?: string };
  $$?: {
    ["xs:annotation"]: Annotation[];
    ["xs:simpleContent"]?: SimpleContent[];
    ["xs:complexContent"]?: ComplexContent[];
    ["xs:choice"]?: Choice[];
    ["xs:sequence"]?: Sequence[];
    ["xs:group"]?: Group[];
    ["xs:attributeGroup"]?: AttributeGroup[];
    ["xs:attribute"]?: Attribute[];
  };
};
type Attribute = {
  $: {
    name?: string;
    type?: XsType;
    ref?: string;
    use?: string;
    default?: string;
  };
  $$?: { ["xs:simpleType"]?: SimpleType[]; ["xs:annotation"]?: Annotation[] };
};
type AttributeGroup = {
  $: { name?: string; ref?: string };
  $$?: {
    ["xs:attribute"]?: Attribute[];
    ["xs:annotation"]: Annotation[];
    ["xs:attributeGroup"]?: { $: { ref: string } }[];
  };
};
type Annotation = {
  $$: {
    ["xs:documentation"]: string[];
  };
};
type Group = {
  $: { name: string; ref?: string; minOccurs?: string; maxOccurs?: string };
  $$: {
    ["xs:annotation"]: Annotation[];
    ["xs:sequence"]: Sequence[];
  };
};
type Sequence = {
  $$: {
    ["xs:element"]?: Element[];
    ["xs:group"]?: Group[];
    ["xs:choice"]?: Choice[];
  };
};
type Element = {
  $: { name: string; type?: string; minOccurs?: string; maxOccurs?: string };
  $$?: {
    ["xs:annotation"]?: Annotation[];
    ["xs:complexType"]?: ComplexType[];
  };
};
type Choice = {
  $?: { minOccurs: string; maxOccurs: string };
  $$: {
    ["xs:element"]?: Element[];
    ["xs:sequence"]?: Sequence[];
    ["xs:group"]?: Group[];
    ["xs:choice"]?: Choice[];
  };
};
type SimpleContent = {
  $$: {
    "xs:extension": Extension[];
  };
};
type ComplexContent = {
  $$: {
    "xs:extension": Extension[];
  };
};
type Extension = {
  $: { base: string };
  $$?: {
    ["xs:attribute"]?: Attribute[];
    ["xs:attributeGroup"]?: AttributeGroup[];
  };
};
function handleXsType(base: XsType): JSONSchema {
  switch (base) {
    case "xs:string":
    case "xs:token":
    case "xs:ID":
    case "xs:IDREF":
    case "xs:date":
    case "xs:anyURI":
    case "xs:NMTOKEN":
    case "xs:language":
      return generateArray({ type: "string" });
    case "xs:integer":
      return generateArray({ type: "integer" });
    case "xs:nonNegativeInteger":
      return generateArray({ type: "integer", minimum: 0 });
    case "xs:positiveInteger":
      return generateArray({ type: "integer", minimum: 1 });
    case "xs:decimal":
      return generateArray({ type: "number" });
  }
  function generateArray(obj: JSONSchema) {
    return {
      type: "array" as const,
      items: obj,
      minItems: 1,
      maxItems: 1,
    };
  }
}
function handleType(type: string) {
  const xsType = handleXsType(type as XsType);
  return xsType ? xsType : { $ref: "#/$defs/musicxml/type/" + type };
}
function handleAttributeGroup({
  $: { name, ref },
  $$,
}: AttributeGroup): SetRequired<JSONSchema, "title"> {
  const attributes = $$?.["xs:attribute"];
  const attributeGroups = $$?.["xs:attributeGroup"];
  const annotation = $$?.["xs:annotation"]?.[0];
  return {
    title: name ?? ref ?? "error",
    ...(ref ? { $ref: "#/$defs/musicxml/attributeGroup/" + ref } : {}),
    ...(annotation ? handleAnnotation(annotation) : {}),
    ...(attributes || attributeGroups
      ? {
          allOf: [
            ...(attributes
              ? [
                  {
                    properties: R.pipe(
                      attributes,
                      R.map(handleAttribute),
                      R.mapToObj(({ title, ...other }) => [title, other])
                    ),
                  },
                ]
              : []),
            ...(attributeGroups?.map((attributeGroup) => ({
              $ref: "#/$defs/musicxml/attributeGroup/" + attributeGroup.$.ref,
            })) ?? []),
          ],
        }
      : {}),
  };
}
function handleAttribute({
  $: { type, name, ref, use, default: $default },
  $$,
}: Attribute): SetRequired<JSONSchema, "title"> {
  const simpleType = $$?.["xs:simpleType"]?.[0];
  const annotation = $$?.["xs:annotation"]?.[0];
  return {
    title: name ?? ref ?? "error",
    ...($default ? { $default } : {}),
    ...(ref ? resolveRef(ref) : {}),
    ...(type ? handleType(type) : {}),
    ...(simpleType ? handleSimpleType(simpleType) : {}),
    ...(annotation ? handleAnnotation(annotation) : {}),
    required: use === "required",
  };
}
function handleAnnotation({ $$ }: Annotation): JSONSchema {
  return {
    description: $$["xs:documentation"][0],
  };
}
function handleSimpleType({ $, $$ }: SimpleType): JSONSchema {
  const restriction = $$["xs:restriction"]?.[0];
  const union = $$["xs:union"]?.[0];
  return {
    ...($?.name ? { title: $.name } : {}),
    ...(restriction ? handleRestriction(restriction) : {}),
    ...(union ? handleUnion(union) : {}),
  };
}
function handleUnion({ $, $$ }: Union): JSONSchema {
  const memberTypes = $.memberTypes;
  const simpleType = $$?.["xs:simpleType"]?.[0];
  return {
    anyOf: [
      ...memberTypes.split(" ").map(handleType),
      ...(simpleType ? [handleSimpleType(simpleType)] : []),
    ],
  };
}
function handleRestriction({ $, $$ }: Restriction): JSONSchema {
  const enumeration = $$?.["xs:enumeration"];
  const minInclusive = $$?.["xs:minInclusive"]?.[0];
  const maxInclusive = $$?.["xs:maxInclusive"]?.[0];
  return {
    ...handleXsType($.base),
    ...(enumeration ? { enum: enumeration.map(({ $ }) => $.value) } : {}),
    ...(minInclusive ? { minimum: Number(minInclusive.$.value) } : {}),
    ...(maxInclusive ? { maximum: Number(maxInclusive.$.value) } : {}),
  };
}
function handleGroup({
  $: { name, ref },
  $$,
}: Group): SetRequired<JSONSchema, "title"> {
  const annotation = $$?.["xs:annotation"]?.[0];
  const sequence = $$?.["xs:sequence"]?.[0];
  return {
    title: name ?? ref,
    ...(ref ? { $ref: "#/$defs/musicxml/group/" + ref } : {}),
    ...(annotation ? handleAnnotation(annotation) : {}),
    ...(sequence ? handleSequence(sequence) : {}),
  };
}
function handleSequence({ $$ }: Sequence): JSONSchema {
  const elements = $$?.["xs:element"];
  const choices = $$?.["xs:choice"];
  const groups = $$?.["xs:group"];
  return {
    ...(elements || groups || choices
      ? {
          allOf: [
            ...(elements
              ? [
                  {
                    properties: R.pipe(
                      elements ?? [],
                      R.map(handleElement),
                      R.mapToObj(({ title, ...other }) => [title, other])
                    ),
                    required: R.pipe(
                      elements ?? [],
                      R.filter((element) => element.$.minOccurs !== "0"),
                      R.map((element) => element.$.name)
                    ),
                  },
                ]
              : []),
            ...R.pipe(groups ?? [], R.map(handleGroup)),
            ...R.pipe(choices ?? [], R.map(handleChoice)),
          ],
        }
      : {}),
  };
}
function handleElement({
  $: { type, name, minOccurs, maxOccurs },
  $$,
}: Element): SetRequired<JSONSchema, "title"> {
  const annotation = $$?.["xs:annotation"]?.[0];
  const complexType = $$?.["xs:complexType"]?.[0];

  return {
    title: name,
    ...(minOccurs || maxOccurs
      ? {
          type: "array",
          ...(minOccurs ? { minItems: Number(minOccurs) } : {}),
          ...(maxOccurs && maxOccurs !== "unbounded"
            ? { maxItems: Number(maxOccurs) }
            : {}),
          items: {
            ...(type ? handleType(type) : {}),
            ...(complexType ? handleComplexType(complexType) : {}),
          },
        }
      : {
          ...(type ? handleType(type) : {}),
          ...(complexType ? handleComplexType(complexType) : {}),
        }),
    ...(annotation ? handleAnnotation(annotation) : {}),
  };
}
function handleChoice({ $, $$ }: Choice): JSONSchema {
  const elements = $$?.["xs:element"];
  const sequence = $$?.["xs:sequence"];
  const groups = $$?.["xs:group"];
  const choices = $$?.["xs:choice"];
  const minOccurs = $?.minOccurs;
  const maxOccurs = $?.maxOccurs;
  return {
    oneOf: [
      ...R.pipe(
        elements ?? [],
        R.map((element) =>
          handleElement({
            ...element,
            $: { ...element.$, minOccurs, maxOccurs },
          })
        ),
        R.map(({ title, ...other }) => ({
          properties: { [title]: other },
        }))
      ),
      ...R.pipe(groups ?? [], R.map(handleGroup)),
      ...R.pipe(sequence ?? [], R.map(handleSequence)),
      ...R.pipe(choices ?? [], R.map(handleChoice)),
    ],
  };
}
function handleSimpleContent({ $$ }: SimpleContent): JSONSchema {
  const extension = $$["xs:extension"][0];
  return {
    ...(extension ? handleExtension(extension) : {}),
  };
}
function handleComplexContent({ $$ }: ComplexContent): JSONSchema {
  const extension = $$["xs:extension"][0];
  return {
    ...(extension ? handleExtension(extension) : {}),
  };
}
function handleExtension({ $, $$ }: Extension): JSONSchema {
  const attributes = $$?.["xs:attribute"];
  const attributeGroups = $$?.["xs:attributeGroup"];
  return {
    allOf: [
      handleType($.base),
      ...(attributes
        ? [
            {
              properties: R.pipe(
                attributes,
                R.map(handleAttribute),
                R.mapToObj(({ title, ...other }) => [title, other])
              ),
            },
          ]
        : []),
      ...(attributeGroups?.map((attributeGroup) => ({
        $ref: "#/$defs/musicxml/attributeGroup/" + attributeGroup.$.ref,
      })) ?? []),
    ],
  };
}
function handleComplexType({ $, $$ }: ComplexType): JSONSchema {
  const annotation = $$?.["xs:annotation"]?.[0];
  const choice = $$?.["xs:choice"]?.[0];
  const sequence = $$?.["xs:sequence"]?.[0];
  const group = $$?.["xs:group"]?.[0];
  const attributeGroups = $$?.["xs:attributeGroup"];
  const attributes = $$?.["xs:attribute"];
  const simpleContent = $$?.["xs:simpleContent"]?.[0];
  const complexContent = $$?.["xs:complexContent"]?.[0];
  return {
    ...($?.name ? { title: $.name } : {}),
    ...(annotation ? handleAnnotation(annotation) : {}),
    ...(choice ||
    sequence ||
    group ||
    attributes ||
    attributeGroups ||
    simpleContent ||
    complexContent
      ? {
          properties: {
            ...(attributes || attributeGroups
              ? {
                  $: {
                    allOf: [
                      ...R.pipe(
                        attributeGroups ?? [],
                        R.map(handleAttributeGroup)
                      ),
                      ...(attributes
                        ? [
                            {
                              properties: R.pipe(
                                attributes,
                                R.map(handleAttribute),
                                R.mapToObj(({ title, ...other }) => [
                                  title,
                                  other,
                                ])
                              ),
                            },
                          ]
                        : []),
                    ],
                  },
                }
              : {}),
            ...(choice || sequence || group || simpleContent || complexContent
              ? {
                  $$: {
                    allOf: [
                      ...(choice ? [handleChoice(choice)] : []),
                      ...(sequence ? [handleSequence(sequence)] : []),
                      ...(group ? [handleGroup(group)] : []),
                      ...(simpleContent
                        ? [handleSimpleContent(simpleContent)]
                        : []),
                      ...(complexContent
                        ? [handleComplexContent(complexContent)]
                        : []),
                    ],
                  },
                }
              : {}),
          },
          required: [
            ...(attributes || attributeGroups ? ["$"] : []),
            ...(choice || sequence || group || simpleContent || complexContent
              ? ["$$"]
              : []),
          ],
        }
      : {}),
  };
}

function resolveRef(ref: string) {
  if (ref.includes("xml")) {
    return { $ref: "#/$defs/xml/attribute/" + ref.replace("xml:", "") };
  }
  if (ref.includes("xlink")) {
    return { $ref: "#/$defs/xlink/attribute/" + ref.replace("xlink:", "") };
  }
}

xsdToJsonSchema();
