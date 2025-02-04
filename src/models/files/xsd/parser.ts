/* eslint-disable @typescript-eslint/no-explicit-any */

import * as xml2js from "xml2js";
import fs from "fs";
import * as R from "remeda";
import * as ts from "typescript";

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
  const AttributeGroup = ts.factory.createIdentifier("AttributeGroup");
  const Group = ts.factory.createIdentifier("Group");

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
                    ts.factory.createTypeReferenceNode(
                      v.includes("xs:")
                        ? v.replace("xs:", "")
                        : R.pipe(v, R.toCamelCase(), R.capitalize())
                    )
                  )
                )
              )
            : ts.factory.createTypeReferenceNode(
                union.$.memberTypes.replace("xs:", "")
              )
          : ts.factory.createTypeReferenceNode(
              base.includes("xs:")
                ? base.replace("xs:", "")
                : R.pipe(base, R.toCamelCase(), R.capitalize())
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

  const tsGroup = result["xs:schema"]["xs:group"].map(createTsGroup);
  const tsAttributeGroup = result["xs:schema"]["xs:attributeGroup"].map(
    createTsAttributeGroup
  );
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
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      Group,
      ts.factory.createModuleBlock(tsGroup)
    )
  );
  tsNodes.push(
    ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      AttributeGroup,
      ts.factory.createModuleBlock(tsAttributeGroup)
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
  function createTsGroup(v: any) {
    return ts.factory.createTypeAliasDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      createClassName(v),
      undefined,
      ts.factory.createIntersectionTypeNode(createIndicator()(v))
    );
  }
  function createTsAttributeGroup(v: any) {
    return ts.factory.createTypeAliasDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      createClassName(v),
      undefined,
      ts.factory.createIntersectionTypeNode([
        ...(v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attribute"] ?? [])
          .concat(v["xs:attribute"] ?? [])
          .map((v: any) =>
            ts.factory.createTypeLiteralNode([
              ts.factory.createPropertySignature(
                undefined,
                createPropertyName(v),
                createUse(v),
                createType(Type)(v)
              ),
            ])
          ),
        ...(
          v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attributeGroup"] ??
          []
        )
          .concat(v["xs:attributeGroup"] ?? [])
          .map(createType(AttributeGroup)),
      ])
    );
  }
  function createIndicator(parentClassName?: string) {
    return (v: any) => {
      return [
        ...(v["xs:element"]?.map(createElement(parentClassName)) ?? []),
        ...(v["xs:choice"]?.flatMap(createChoice(parentClassName)) ?? []),
        ...(v["xs:group"]?.flatMap(createType(Group)) ?? []),
        ...(v["xs:sequence"]?.flatMap(createIndicator(parentClassName)) ?? []),
        ...(v["xs:simpleContent"]?.map(createSimpleContent) ?? []),
      ];
    };
  }

  function createSimpleContent(v: any) {
    return createElement()({
      $: {
        name: v["xs:extension"][0].$.base,
        type: v["xs:extension"][0].$.base,
      },
    });
  }
  function createElement(parentClassName?: string) {
    return (v: any) => {
      return ts.factory.createTypeLiteralNode([
        ts.factory.createPropertySignature(
          undefined,
          createPropertyName(v),
          undefined,
          v["xs:complexType"]
            ? (() => {
                v.$.type = v.$.name;
                complexTypes.push(
                  createComplexType(parentClassName)({
                    ...v["xs:complexType"][0],
                    $: v.$,
                  })
                );
                return createOccurs(
                  v,
                  ts.factory.createTypeReferenceNode(
                    ts.factory.createIdentifier(
                      parentClassName + createClassName(v)
                    )
                  )
                );
              })()
            : createType(Type)(v)
        ),
      ]);
    };
  }
  function createChoice(parentClassName?: string) {
    return (choiceV: any) =>
      ts.factory.createUnionTypeNode(
        choiceV.$$.flatMap((v: any) => {
          v.$ = { ...v.$, ...choiceV.$ };
          switch (v["#name"]) {
            case "xs:element":
              return createElement(parentClassName)(v);
            case "xs:group":
              return createType(Group)(v);
            case "xs:sequence":
              return createIndicator(parentClassName)(v);
            case "xs:choice":
              return createChoice(parentClassName)(v);
          }
        })
      );
  }

  function createComplexType(parentClassName?: string) {
    //TODO: complexContent
    return (v: any) => {
      const a = R.filter(
        [
          ...createIndicator(createClassName(v))(v),
          createAttributeParameter(v),
        ],
        R.isTruthy
      );
      return ts.factory.createTypeAliasDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        ts.factory.createIdentifier(
          (parentClassName ?? "") + createClassName(v)
        ),
        undefined,
        ts.factory.createIntersectionTypeNode(
          R.isEmpty(a) ? [ts.factory.createNull()] : a
        )
      );
    };
  }

  function createAttributeParameter(v: any) {
    const attributes = [
      ...(v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attribute"] ?? [])
        .concat(v["xs:attribute"] ?? [])
        .map((v: any) =>
          ts.factory.createTypeLiteralNode([
            ts.factory.createPropertySignature(
              undefined,
              createPropertyName(v),
              createUse(v),
              createType(Type)(v)
            ),
          ])
        ),
      ...(
        v["xs:simpleContent"]?.[0]["xs:extension"][0]["xs:attributeGroup"] ?? []
      )
        .concat(v["xs:attributeGroup"] ?? [])
        .map(createType(AttributeGroup)),
    ];
    if (R.isEmpty(attributes)) return undefined;
    return ts.factory.createTypeLiteralNode([
      ts.factory.createPropertySignature(
        undefined,
        xml2js.defaults["0.2"].attrkey ?? "",
        undefined,
        ts.factory.createIntersectionTypeNode(attributes)
      ),
    ]);
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
      return createOccurs(v, typeNode);
    };
  }
  function createOccurs(v: any, typeNode: ts.TypeNode) {
    v.$ ??= {};
    v.$.maxOccurs ??= "1";
    v.$.minOccurs ??= "1";
    if (v.$.maxOccurs === "1") return typeNode;
    if (v.$.maxOccurs === "unbounded" || parseInt(v.$.maxOccurs) > 1) {
      return ts.factory.createArrayTypeNode(typeNode);
    }
    return typeNode;
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
