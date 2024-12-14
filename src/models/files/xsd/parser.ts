/* eslint-disable @typescript-eslint/no-explicit-any */

import * as xml2js from "xml2js";
import fs from "fs";
import * as R from "remeda";
import * as ts from "typescript";

const data = fs.readFileSync("src/musicxml/schema/musicxml.xsd");
const tsNodes: ts.Statement[] = [];

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
        createClassName(simpleType),
        undefined,
        valueType
      );
    }
  );

  const groups = result["xs:schema"]["xs:group"].map((v: any) =>
    ts.factory.createClassDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      createClassName(v),
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
              createSequence(v)
            ),
          ],
          ts.factory.createBlock([])
        ),
      ]
    )
  );
  const attributeGroups = result["xs:schema"]["xs:attributeGroup"].map(
    (v: any) =>
      ts.factory.createClassDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        createClassName(v),
        undefined,
        undefined,
        [
          ts.factory.createConstructorDeclaration(
            undefined,
            R.pipe(
              v["xs:attribute"] ?? [],
              R.sort(sortAttribute),
              R.map(createAttribute)
            ),
            ts.factory.createBlock([])
          ),
        ]
      )
  );

  const complexTypes = [];
  complexTypes.push(
    ...result["xs:schema"]["xs:complexType"].map(createComplexType)
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
  function createAttribute(v: any) {
    return ts.factory.createParameterDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
      undefined,
      createPropertyName(v),
      createUse(v),
      createType(Type)(v),
      createDefault(v)
    );
  }
  function createSequence(v: any) {
    return ts.factory.createTupleTypeNode([
      ...(v["xs:element"]?.map(createElement) ?? []),
      ...(v["xs:choice"]?.map(createChoice) ?? []),
      ...(v["xs:group"]?.map(createType(Group)) ?? []),
      ...(v["xs:sequence"]?.map(createSequence) ?? []),
    ]);

    function createChoice(v: any) {
      return ts.factory.createUnionTypeNode([
        ...(v["xs:element"]?.map(createElement) ?? []),
        ...(v["xs:group"]?.map(createType(Group)) ?? []),
        ...(v["xs:sequence"]?.map(createSequence) ?? []),
      ]);
    }
    function createElement(v: any) {
      return ts.factory.createTypeLiteralNode([
        ts.factory.createPropertySignature(
          undefined,
          createPropertyName(v),
          undefined,
          v["xs:complexType"]
            ? (() => {
                v.$.type = v.$.name;
                complexTypes.push(
                  createComplexType({ ...v["xs:complexType"][0], $: v.$ })
                );
                return createType(Type)(v);
              })()
            : createType(Type)(v)
        ),
      ]);
    }
  }

  function createComplexType(v: any) {
    return ts.factory.createClassDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      createClassName(v),
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
                : createSequence(v)
            ),
            ...(
              v["xs:simpleContent"]?.[0]["xs:extension"][0][
                "xs:attributeGroup"
              ] ?? []
            ).map((v: any) =>
              ts.factory.createParameterDeclaration(
                [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
                undefined,
                createClassName(v),
                undefined,
                createType(AttributeGroup)(v)
              )
            ),
            ...(
              v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attribute"] ??
              []
            )
              .sort(sortAttribute)
              .map(createAttribute),
            ...(v["xs:attributeGroup"] ?? []).map((v: any) =>
              ts.factory.createParameterDeclaration(
                [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
                undefined,
                createClassName(v),
                undefined,
                createType(AttributeGroup)(v)
              )
            ),
            ...(v["xs:attribute"] ?? [])
              .sort(sortAttribute)
              .map(createAttribute),
          ],
          ts.factory.createBlock([])
        ),
      ]
    );
  }
  function createType(module?: ts.Identifier) {
    return (v: any) => {
      const typeName = v.$?.type ?? v.$.ref;
      const typeNode = ts.factory.createTypeReferenceNode(
        typeName.includes("xs:")
          ? typeName.replace("xs:", "")
          : typeName.includes("xml:")
            ? "XML." + typeName.replace("xml:", "")
            : typeName.includes("xlink:")
              ? "XLink." + typeName.replace("xlink:", "")
              : (module?.escapedText ? module.escapedText + "." : "") +
                R.pipe(typeName, R.toCamelCase(), R.capitalize())
      );
      //TODO:
      // 要素がなくてもいい場合オプショナルにする
      v.$.maxOccurs ??= "1";
      v.$.minOccurs ??= "1";
      if (v.$.maxOccurs === "1") return typeNode;
      if (v.$.maxOccurs === "unbounded" || parseInt(v.$.maxOccurs) > 1) {
        return ts.factory.createArrayTypeNode(typeNode);
      }
    };
  }

  // TODO:
  // function createChildren(){}
  function createUse(v: any) {
    return isRequired(v)
      ? undefined
      : ts.factory.createToken(ts.SyntaxKind.QuestionToken);
  }

  function createPropertyName(v: any) {
    const name = v.$?.name ?? v.$.ref;
    return (
      R.pipe(name.replace(":", "-"), R.toCamelCase()) +
      (isReservedWord(name) ? "_" : "")
    );
  }
  function createClassName(v: any) {
    const name = v.$?.name ?? v.$.ref;
    return R.pipe(name, R.toCamelCase(), R.capitalize());
  }
  function createDefault(v: any) {
    if (!v.$.default) return undefined;
    if (v.$.type) {
      if (v.$.type.includes("xs:")) {
        const xsType = xsTypes.find(
          (xsType: any) =>
            xsType.name.escapedText === v.$.type.replace("xs:", "")
        );
        switch (xsType!.type.kind) {
          case ts.SyntaxKind.StringKeyword:
            return ts.factory.createStringLiteral(v.$.default);
          case ts.SyntaxKind.NumberKeyword:
            return ts.factory.createNumericLiteral(v.$.default);
        }
      }
      const simpleType = simpleTypes.find(
        (simpleType: any) =>
          simpleType.name.escapedText ===
          R.pipe(v.$.type, R.toCamelCase(), R.capitalize())
      );
      if (simpleType.type.typeName) {
        const xsType = xsTypes.find(
          (xsType: any) =>
            xsType.name.escapedText === simpleType.type.typeName.escapedText
        );
        switch (xsType!.type.kind) {
          case ts.SyntaxKind.StringKeyword:
            return ts.factory.createStringLiteral(v.$.default);
          case ts.SyntaxKind.NumberKeyword:
            return ts.factory.createNumericLiteral(v.$.default);
          case ts.SyntaxKind.UnionType:
            return ts.factory.createStringLiteral(v.$.default);
          case ts.SyntaxKind.TypeAliasDeclaration:
          case ts.SyntaxKind.Identifier: {
            console.log(simpleType);
          }
        }
      }
    }
    return ts.factory.createStringLiteral(v.$.default);
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
