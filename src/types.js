/* @flow */

export type SpecRawType = {
  name: string,
  description: string[],
  fieldsData: string[][],
  fieldHeaders: string[],
}

export type SpecRawUnion = {
  name: string,
  description: string[],
  types: string[],
}

export type SpecRaw = {
  types: SpecRawType[],
  unions: SpecRawUnion[],
}

export type MethodSpec = {
  type: 'method',
  name: string,
  description: string[],
  fields: Array<{
    parameters: string,
    type: string,
    required: string,
    description: string,
  }>,
}

export type TypeSpecField = {
  field: string,
  type: string,
  description: string,
}

export type TypeSpec = {
  type: 'typedef',
  name: string,
  description: string[],
  fields: TypeSpecField[],
}

export type UnionSpec = {
  type: 'union',
  name: string,
  description: string[],
  types: string[],
}

export type UnknownSpec = {
  type: 'unknown',
  name: string,
  description: string[],
  fields: Array<{
    [key: string]: string,
  }>,
}

export type Spec = (
  MethodSpec |
  TypeSpec |
  UnionSpec |
  UnknownSpec
)
