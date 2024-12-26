/* eslint-disable @typescript-eslint/no-explicit-any */

import * as xml2js from "xml2js";
import fs from "fs";
import * as R from "remeda";
import * as ts from "typescript";
// TODO: groupの定義
// TODO: attributeGroupの定義
// TODO: choiceのプロパティ名
// TODO: default値はobjectmapperで変換する
const data = fs.readFileSync("src/musicxml/schema/musicxml.xsd");
const tsNodes: ts.Statement[] = [];
const xsTypes = [
  {
    name: "anyURI",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "decimal",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "ID",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "IDREF",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "NMTOKEN",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "integer",
    value: ts.SyntaxKind.NumberKeyword,
  },
  {
    name: "nonNegativeInteger",
    value: ts.SyntaxKind.NumberKeyword,
  },
  {
    name: "positiveInteger",
    value: ts.SyntaxKind.NumberKeyword,
  },
  {
    name: "token",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "date",
    value: ts.SyntaxKind.StringKeyword,
  },
];
const xmlTypes = [
  {
    name: "lang",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "space",
    value: ts.SyntaxKind.StringKeyword,
  },
];
const xlinkTypes = [
  {
    name: "href",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "type",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "role",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "title",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "show",
    value: ts.SyntaxKind.StringKeyword,
  },
  {
    name: "actuate",
    value: ts.SyntaxKind.StringKeyword,
  },
];
new xml2js.Parser({
  explicitChildren: true,
  preserveChildrenOrder: true,
}).parseString(data, (_, result) => {
  const XML = ts.factory.createIdentifier("XML");
  const XLink = ts.factory.createIdentifier("XLink");
  const Type = ts.factory.createIdentifier("Type");

  const complexTypes = [];
  const tsXsTypes = xsTypes.map(createTsTypeAilias);
  const tsXmlTypes = xmlTypes.map(createTsTypeAilias);
  const tsXlinkTypes = xlinkTypes.map(createTsTypeAilias);

  // TODO: refactor
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
                  R.map((v: any) =>
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
  result["xs:schema"]["xs:element"].forEach((v: any) => {
    if (v["xs:complexType"]) {
      v.$.type ??= v.$.name;
      complexTypes.push(
        createComplexType()({ ...v["xs:complexType"][0], $: v.$ })
      );
    }
  });
  complexTypes.push(
    ...result["xs:schema"]["xs:complexType"].map(createComplexType())
  );

  tsNodes.push(...tsXsTypes);
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      XML,
      ts.factory.createModuleBlock(tsXmlTypes)
    )
  );
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      XLink,
      ts.factory.createModuleBlock(tsXlinkTypes)
    )
  );
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      Type,
      ts.factory.createModuleBlock([...simpleTypes, ...complexTypes])
    )
  );

  function createTsTypeAilias(v: { name: string; value: ts.SyntaxKind }) {
    return ts.factory.createTypeAliasDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      v.name,
      undefined,
      ts.factory.createKeywordTypeNode(Number(v.value))
    );
  }
  function createAttribute(v: any) {
    return {
      name: createPropertyName(v),
      use: createUse(v),
      type: createType(Type)(v),
      default_: createDefault(v),
    };
  }
  function createAttributeGroup(v: any): ReturnType<typeof createAttribute>[] {
    const group = result["xs:schema"]["xs:attributeGroup"].find(
      (group: any) => group.$.name === v.$.ref
    );
    return [
      ...(group["xs:attributeGroup"] ?? []).flatMap(createAttributeGroup),
      ...(group["xs:attribute"] ?? []),
    ];
  }

  function createIndicator(
    isProperty: boolean = false,

    parentClassName?: string
  ) {
    return (v: any) => [
      ...(v["xs:element"]?.map(createElement(isProperty, parentClassName)) ??
        []),
      ...(v["xs:choice"]?.map(createChoice(isProperty, parentClassName)) ?? []),
      ...(v["xs:group"]?.flatMap(createGroup(isProperty, parentClassName)) ??
        []),
      ...(v["xs:sequence"]?.flatMap(
        createIndicator(isProperty, parentClassName)
      ) ?? []),
      ...(v["xs:simpleContent"]?.map(createSimpleContent) ?? []),
    ];
  }

  function createSimpleContent(v: any) {
    const value = {
      $: {
        name: v["xs:extension"][0].$.base,
        type: v["xs:extension"][0].$.base,
      },
    };
    return ts.factory.createPropertyDeclaration(
      undefined,
      createPropertyName(value),
      undefined,
      createType(Type)(value),
      undefined
    );
  }

  function createGroup(isProperty: boolean = false, parentClasName?: string) {
    // minOccurs maxOccurs
    return (v: any) => {
      const group = result["xs:schema"]["xs:group"].find(
        (group: any) => group.$.name === v.$.ref
      );
      return createIndicator(isProperty, parentClasName)(group);
    };
  }
  function createElement(
    isProperty: boolean = false,
    parentClassName?: string
  ) {
    return (v: any) => {
      if (v["xs:complexType"]) {
        v.$.type = v.$.name;
        complexTypes.push(
          createComplexType(parentClassName)({
            ...v["xs:complexType"][0],
            $: v.$,
          })
        );
      }
      if (isProperty) {
        return ts.factory.createTypeLiteralNode([
          ts.factory.createPropertySignature(
            undefined,
            createPropertyName(v),
            createUse(v),
            createType(Type)(v)
          ),
        ]);
      }
      return ts.factory.createPropertyDeclaration(
        undefined,
        createPropertyName(v),
        undefined,
        v["xs:complexType"]
          ? ts.factory.createTypeReferenceNode(
              ts.factory.createIdentifier(parentClassName + createClassName(v))
            )
          : createType(Type)(v),
        undefined
      );
    };
  }
  function createChoice(isProperty: boolean = false, parentClassName?: string) {
    return (v: any) => {
      const unionTypes = ts.factory.createUnionTypeNode(
        v.$$.map((v: any) => {
          switch (v["#name"]) {
            case "xs:element":
              return createType(Type)(v);
            case "xs:group":
              return ts.factory.createTupleTypeNode(
                createGroup(true, parentClassName)(v)
              );
            case "xs:sequence":
              return ts.factory.createTupleTypeNode(
                createIndicator(true, parentClassName)(v)
              );
            case "xs:choice":
              return createChoice(true, parentClassName)(v);
          }
        })
      );
      const choiceName = R.pipe(
        v.$$,
        R.map((v) => {
          switch (v["#name"]) {
            case "xs:element":
              return v.$.name;
            case "xs:group":
              return "group";
            case "xs:sequence":
              return "sequence";
            case "xs:choice":
              return "choice";
          }
        }),
        R.join("-or-"),
        R.toCamelCase()
      );
      if (isProperty) {
        return ts.factory.createTypeLiteralNode([
          ts.factory.createPropertySignature(
            undefined,
            choiceName,
            undefined,
            unionTypes
          ),
        ]);
      }
      return ts.factory.createPropertyDeclaration(
        undefined,
        choiceName,
        undefined,
        unionTypes,
        undefined
      );
    };
  }

  function createComplexType(parentClassName?: string) {
    return (v: any) => {
      const className = ts.factory.createIdentifier(
        (parentClassName ?? "") + createClassName(v)
      );
      const attributes = [
        ...(
          v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attributeGroup"] ??
          []
        )
          .concat(v["xs:attributeGroup"] ?? [])
          .flatMap(createAttributeGroup),
        ...(
          v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attribute"] ?? []
        ).concat(v["xs:attribute"] ?? []),
      ];
      return ts.factory.createInterfaceDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        className,
        undefined,
        undefined,
        R.filter(
          [
            ...createIndicator(undefined, createClassName(v))(v),
            createAttributeParameter(attributes),
          ],
          R.isTruthy
        )
      );
    };
  }

  function createAttributeParameter(attributes: any[]) {
    if (attributes.length === 0) return undefined;
    return ts.factory.createPropertyDeclaration(
      undefined,
      xml2js.defaults["0.2"].attrkey ?? "",
      undefined,
      ts.factory.createTypeLiteralNode(
        attributes.map((v) =>
          ts.factory.createPropertySignature(
            undefined,
            createPropertyName(v),
            createUse(v),
            createType(Type)(v)
          )
        )
      ),
      undefined
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
      return typeNode;
    };
  }
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
  // TODO: Refactor
  function createDefault(v: any) {
    if (!v.$.default) return undefined;
    if (v.$.ref?.includes("xlink:")) {
      const xlinkType = tsXlinkTypes.find(
        (xsLink: any) =>
          xsLink.name.escapedText === v.$.ref.replace("xlink:", "")
      );
      return convertDefaultType(v, xlinkType!.type);
    }

    if (v.$.type?.includes("xs:")) {
      const xsType = tsXsTypes.find(
        (xsType: any) => xsType.name.escapedText === v.$.type.replace("xs:", "")
      );
      return convertDefaultType(v, xsType!.type);
    }
    const simpleType = simpleTypes.find(
      (simpleType: any) =>
        simpleType.name.escapedText ===
        R.pipe(v.$.type.replace("xs:", ""), R.toCamelCase(), R.capitalize())
    );
    if (simpleType) {
      const xsType = tsXsTypes.find(
        (xsType: any) =>
          xsType.name.escapedText === simpleType.type.typeName.escapedText
      );
      return convertDefaultType(v, xsType!.type);
    }

    return ts.factory.createStringLiteral(v.$.default);
  }
  function convertDefaultType(v: any, type: ts.TypeNode) {
    switch (type.kind) {
      case ts.SyntaxKind.StringKeyword:
        return ts.factory.createStringLiteral(v.$.default);
      case ts.SyntaxKind.NumberKeyword:
        return ts.factory.createNumericLiteral(v.$.default);
      case ts.SyntaxKind.UnionType:
        switch (type.types.find((type) => type.literal.text === v.$.default)) {
          case ts.SyntaxKind.StringLiteral:
            return ts.factory.createStringLiteral(v.$.default);
          case ts.SyntaxKind.NumericLiteral:
            return ts.factory.createNumericLiteral(v.$.default);
          default:
            return ts.factory.createStringLiteral(v.$.default);
        }
      default:
        return ts.factory.createStringLiteral(v.$.default);
    }
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
