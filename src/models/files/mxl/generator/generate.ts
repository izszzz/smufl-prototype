/* eslint-disable @typescript-eslint/no-explicit-any */

import * as xml2js from "xml2js";
import fs from "fs";
import * as R from "remeda";
import * as ts from "typescript";

const data = fs.readFileSync("src/musicxml/schema/musicxml.xsd");
const tsNodes: ts.Statement[] = [];
// TODO: MinOccurs, MaxOccursの処理
// TODO: default値の型を正しく設定する

new xml2js.Parser().parseString(data, (_, result) => {
  const XML = ts.factory.createIdentifier("XML");
  const XLink = ts.factory.createIdentifier("XLink");
  const Type = ts.factory.createIdentifier("Type");
  const Group = ts.factory.createIdentifier("Group");
  const AttributeGroup = ts.factory.createIdentifier("AttributeGroup");

  const xsTypes = [
    {
      name: "anyURI",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "decimal",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "ID",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "IDREF",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "NMTOKEN",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "integer",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    },
    {
      name: "nonNegativeInteger",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    },
    {
      name: "positiveInteger",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    },
    {
      name: "token",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "date",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
  ].map((v) =>
    ts.factory.createTypeAliasDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      v.name,
      undefined,
      v.value
    )
  );
  const xmlTypes = [
    {
      name: "lang",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "space",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
  ].map((v) =>
    ts.factory.createTypeAliasDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      v.name,
      undefined,
      v.value
    )
  );
  const xlinkTypes = [
    {
      name: "href",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "type",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "role",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "title",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "show",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
    {
      name: "actuate",
      value: ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    },
  ].map((v) =>
    ts.factory.createTypeAliasDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      v.name,
      undefined,
      v.value
    )
  );
  const simpleTypes = result["xs:schema"]["xs:simpleType"].map(
    (simpleType: any) => {
      const restriction = simpleType["xs:restriction"]?.[0];
      const union = simpleType?.["xs:union"]?.[0];
      const base = restriction?.$.base;
      const enumeration = restriction?.["xs:enumeration"];
      const isEnumeration = enumeration ? true : false;
      const isUnion = union ? true : false;
      const valueType = isEnumeration
        ? ts.factory.createUnionTypeNode(
            R.pipe(
              enumeration,
              R.map(
                R.piped(R.prop("$"), R.prop("value"), (v: string) =>
                  ts.factory.createLiteralTypeNode(
                    ts.factory.createStringLiteral(v)
                  )
                )
              )
            )
          )
        : isUnion
          ? "memberTypes" in union.$
            ? ts.factory.createUnionTypeNode(
                R.pipe(
                  union.$.memberTypes,
                  R.split(" "),
                  R.map((v) =>
                    v.includes("xs:")
                      ? ts.factory.createTypeReferenceNode(v.replace("xs:", ""))
                      : ts.factory.createTypeReferenceNode(
                          R.pipe(v, R.toCamelCase(), R.capitalize())
                        )
                  )
                )
              )
            : ts.factory.createTypeReferenceNode(
                union.$.memberTypes.replace("xs:", "")
              )
          : base.includes("xs:")
            ? ts.factory.createTypeReferenceNode(base.replace("xs:", ""))
            : ts.factory.createTypeReferenceNode(
                R.pipe(base, R.toCamelCase(), R.capitalize())
              );
      return ts.factory.createTypeAliasDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        R.pipe(simpleType.$.name, R.toCamelCase(), R.capitalize()),
        undefined,
        valueType
      );
    }
  );

  const complexTypes = [];
  complexTypes.push(
    ...result["xs:schema"]["xs:complexType"].map(createComplexType)
  );

  const groups = result["xs:schema"]["xs:group"].map((group: any) =>
    ts.factory.createClassDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      R.pipe(group.$.name, R.toCamelCase(), R.capitalize()),
      undefined,
      undefined,
      [
        ts.factory.createConstructorDeclaration(
          undefined,
          [
            ts.factory.createParameterDeclaration(
              [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
              undefined,
              "children",
              undefined,
              createSequence(Group)(group)
            ),
          ],
          ts.factory.createBlock([])
        ),
      ]
    )
  );
  const attributeGroups = result["xs:schema"]["xs:attributeGroup"].map(
    (attributeGroup: any) =>
      ts.factory.createClassDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        R.pipe(attributeGroup.$.name, R.toCamelCase(), R.capitalize()),
        undefined,
        undefined,
        [
          ts.factory.createConstructorDeclaration(
            undefined,
            R.pipe(
              attributeGroup["xs:attribute"] ?? [],
              R.sort(sortAttribute),
              R.map(createAttribute(AttributeGroup))
            ),
            ts.factory.createBlock([])
          ),
        ]
      )
  );

  tsNodes.push(...xsTypes);
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      XML,
      ts.factory.createModuleBlock(xmlTypes)
    )
  );
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      XLink,
      ts.factory.createModuleBlock(xlinkTypes)
    )
  );
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      Type,
      ts.factory.createModuleBlock([...simpleTypes, ...complexTypes])
    )
  );
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      Group,
      ts.factory.createModuleBlock(groups)
    )
  );
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      AttributeGroup,
      ts.factory.createModuleBlock(attributeGroups)
    )
  );
  function createAttribute(from: ts.Identifier) {
    return (v: any) =>
      ts.factory.createParameterDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
        undefined,
        createNameOrRef(v),
        createUse(v),
        ts.factory.createTypeReferenceNode(createTypeOrRef(from)(v)),
        createDefault(v)
      );
  }
  function createSequence(id: ts.Identifier) {
    return (v: any) =>
      ts.factory.createTupleTypeNode([
        ...(v["xs:element"]?.map(createElement) ?? []),
        ...(v["xs:choice"]?.map(createChoice) ?? []),
        ...(v["xs:group"]?.map(createGroup) ?? []),
        ...(v["xs:sequence"]?.map(createSequence(id)) ?? []),
      ]);

    function createChoice(v: any) {
      return ts.factory.createUnionTypeNode([
        ...(v["xs:element"]?.map(createElement) ?? []),
        ...(v["xs:group"]?.map(createGroup) ?? []),
        ...(v["xs:sequence"]?.map(createSequence(id)) ?? []),
      ]);
    }
    function createGroup(v: any) {
      return ts.factory.createTypeReferenceNode(
        "Group." + R.pipe(v.$.ref, R.toCamelCase(), R.capitalize())
      );
    }
    function createElement(v: any) {
      return ts.factory.createTypeLiteralNode([
        ts.factory.createPropertySignature(
          undefined,
          R.pipe(createNameOrRef(v), R.toCamelCase()),
          undefined,
          v["xs:complexType"]
            ? (() => {
                complexTypes.push(
                  createComplexType({ ...v["xs:complexType"][0], $: v.$ })
                );
                return ts.factory.createTypeReferenceNode(
                  "Type." + R.pipe(v.$.name, R.toCamelCase(), R.capitalize())
                );
              })()
            : ts.factory.createTypeReferenceNode(createTypeOrRef(id)(v))
        ),
      ]);
    }
  }
  function createComplexType(v: any) {
    return ts.factory.createClassDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      R.pipe(v.$.name, R.toCamelCase(), R.capitalize()),
      undefined,
      v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attributeGroup"] &&
        ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
          ts.factory.createExpressionWithTypeArguments(
            ts.factory.createIdentifier(
              "AttributeGroup." +
                R.pipe(
                  v["xs:simpleContent"]?.[0]["xs:extension"][0][
                    "xs:attributeGroup"
                  ][0].$.ref,
                  R.toCamelCase(),
                  R.capitalize()
                )
            ),
            undefined
          ),
        ]),
      [
        ts.factory.createConstructorDeclaration(
          undefined,
          [
            ts.factory.createParameterDeclaration(
              [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
              undefined,
              "children",
              undefined,
              v["xs:simpleContent"]
                ? ts.factory.createTypeReferenceNode(
                    v["xs:simpleContent"]?.[0][
                      "xs:extension"
                    ][0].$.base.includes("xs:")
                      ? v["xs:simpleContent"]?.[0][
                          "xs:extension"
                        ][0].$.base.replace("xs:", "")
                      : "Type." +
                          R.pipe(
                            v["xs:simpleContent"]?.[0]["xs:extension"][0].$
                              .base,
                            R.toCamelCase(),
                            R.capitalize()
                          )
                  )
                : createSequence(Group)(v)
            ),
            ...(
              v["xs:simpleContent"]?.[0]["xs:extension"][0][
                "xs:attributeGroup"
              ] ?? []
            ).map((v: any) =>
              ts.factory.createParameterDeclaration(
                [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
                undefined,
                R.pipe(v.$.ref, R.toCamelCase(), R.capitalize()),
                undefined,
                ts.factory.createTypeReferenceNode(
                  "AttributeGroup." +
                    R.pipe(v.$.ref, R.toCamelCase(), R.capitalize())
                )
              )
            ),
            ...(
              v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attribute"] ??
              []
            )
              .sort(sortAttribute)
              .map(createAttribute(Type)),
            ...(v["xs:attribute"] ?? [])
              .sort(sortAttribute)
              .map(createAttribute(Type)),
          ],
          ts.factory.createBlock([])
        ),
      ]
    );
  }
  function createTypeOrRef(from: ts.Identifier) {
    return (v: any) => {
      if (v.$?.ref) {
        if (v.$.ref.includes("xml:"))
          return "XML." + v.$.ref.replace("xml:", "");
        if (v.$.ref.includes("xlink:"))
          return "XLink." + v.$.ref.replace("xlink:", "");
        return v.$?.ref;
      }
      if (v.$?.type.includes("xs:")) return v.$.type.replace("xs:", "");
      return (
        (from === Type ? "" : "Type.") +
        R.pipe(v.$.type, R.toCamelCase(), R.capitalize())
      );
    };
  }
  function createUse(v: any) {
    return isRequired(v)
      ? undefined
      : ts.factory.createToken(ts.SyntaxKind.QuestionToken);
  }

  function createNameOrRef(v: any) {
    const name = v.$?.name ?? v.$.ref;
    if (name.includes(":")) return name.replace(":", "");
    return R.pipe(name, R.toCamelCase()) + (isReservedWord(name) ? "_" : "");
  }
  function createDefault(v: any) {
    // v.$.ref or v.$.typeの値をもとにts.factoryから型を検索し、stringかliteralかnumberを返す
    console.log(v);
    return v.$.default && ts.factory.createStringLiteral(v.$.default);
  }
  function sortAttribute(a: any, b: any) {
    if (isRequired(a) && !isRequired(b)) return -1;
    if (!isRequired(a) && isRequired(b)) return 1;
    return 0;
  }
  function isRequired(v: any) {
    return v.$.use === "required" || v.$.default !== undefined;
  }
});

const sourceFile = ts.factory.createSourceFile(
  tsNodes,
  ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
  ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
fs.writeFileSync("src/models/files/mxl/schema.ts", code, { encoding: "utf8" });

function isReservedWord(name: string): boolean {
  for (const kind in ts.SyntaxKind) {
    const token = ts.tokenToString(
      ts.SyntaxKind[kind as keyof typeof ts.SyntaxKind]
    );
    if (token === name) return true;
  }
  return false;
}
