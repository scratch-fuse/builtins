import { Lexer, Parser } from '@scratch-fuse/core'
import { Context, Module, ModuleInfo } from '@scratch-fuse/compiler'
import fuse from './builtin.fuse'

export const Sb3ModulesRaw = fuse

export const Sb3Modules = (() => {
  const lexer = new Lexer(Sb3ModulesRaw)
  const parser = new Parser(lexer)
  const program = parser.parse()
  const module: Module = {
    name: '',
    parent: null,
    functions: new Map(),
    variables: new Map(),
    externs: new Map(),
    children: new Map()
  }
  const context = new Context(module)
  context.compile(program)
  module.children.forEach((childModule: ModuleInfo) => {
    if ('parent' in childModule) childModule.parent = null
  })
  return module.children
})()
