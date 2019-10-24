import {
  TextHighlightRules,
  oop
} from 'monaco-ace-tokenizer'

export {
  registerRulesForLanguage
} from 'monaco-ace-tokenizer'

var StoryHighlightRules = function () {
  this.$rules = {
    'start': [{
      'token': 'comment',
      'regex': '(###)',
      'push': 'multi_line_comment__1'
    },
    {
      'token': 'comment',
      'regex': '(#.*)'
    },
    {
      'token': 'keyword.control.flow',
      'regex': '((?!\\W)(break|as|catch|returns?|continue|is|not|else|finally|if|then|try|when|while|foreach|and|or)(\\s|$))'
    },
    {
      'token': 'keyword.operator.assignment',
      'regex': '(=)'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\()',
      'push': 'scope__1'
    },
    {
      'token': 'support.function',
      'regex': '((?!\\W)(function)(?=\\s))',
      'push': 'function__1'
    },
    {
      'token': 'constant.numeric',
      'regex': '\\b((0([box])[0-9a-fA-F]+)|([0-9]+(\\.[0-9]+)?(e[+\\-]?[0-9]+)?))\\b'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\'{3})",
      'push': 'string_single_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\"{3})',
      'push': 'string_double_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\')",
      'push': 'string_single__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\")',
      'push': 'string_double__1'
    },
    {
      'token': 'punctuation.definition',
      'regex': '(\\{)',
      'push': 'map__1'
    },
    {
      'token': 'support.type',
      'regex': '((?!\\W)(int|string|boolean|map|list|object)((?=\\W)|$))'
    },
    {
      'token': 'support.constant',
      'regex': '(null)'
    },
    {
      'token': 'punctuation.definition.array',
      'regex': '(\\[)',
      'push': 'list__1'
    },
    {
      'token': 'source.regexp',
      'regex': '(\\/(?![\\s=/*+{}?])(\\\\.|.)*?/[igmy]{0,4}(?![a-zA-Z0-9]))'
    },
    {
      'token': 'constant.other',
      'regex': '((true|false)(?!(\\s*\\=|\\w)))'
    },
    {
      'token': 'comment',
      'regex': '(#.*)'
    },
    {
      'token': 'variable.parameter',
      'regex': '([\\w_]+(?=\\s*:))',
      'push': 'keyvalue__1'
    },
    {
      'token': 'variable.other',
      'regex': '([\\w_]+[\\w_-]*/[\\w_]+[\\w_-]*)'
    },
    {
      'token': 'source.constant',
      'regex': '((\\d+[smhdwqy])+)(?!(\\s*\\=|\\w))'
    },
    {
      'token': 'meta.identifier',
      'regex': '([\\w_]+)'
    },
    {
      'token': 'meta.identifier',
      'regex': '(\\.[\\w_]+)'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\()',
      'push': 'scope__1'
    },
    {
      'token': 'keyword.operator.comparison',
      'regex': '(<\\=|>\\=|\\=\\=|<|>|\\!\\=)'
    },
    {
      'token': 'keyword.operator.arithmetic',
      'regex': '(\\!|\\+|\\-|\\*|\\*\\*|/|//|%|<<|>>|&|\\||\\^|~|(?!^)@)'
    },
    {
      'token': 'invalid',
      'regex': '([^\\s])'
    },
    {
      defaultToken: 'text'
    }
    ],
    'function__1': [{
      'token': 'entity.name.function',
      'regex': '((?!function\\s*)\\w+)',
      'next': 'pop'
    },
    {
      defaultToken: 'support.function'
    }
    ],
    'keytype__1': [{
      'token': 'variable.parameter.function',
      'regex': '((?!\\s*:\\s*(int|string|boolean|map|list|object)))',
      'next': 'pop'
    },
    {
      'token': 'support.type',
      'regex': '((?!\\W)(int|string|boolean|map|list|object)((?=\\W)|$))'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(:)'
    },
    {
      defaultToken: 'text'
    }
    ],
    'keyvalue__1': [{
      'token': 'constant.character.punctuation',
      'regex': '(:)',
      'next': 'pop'
    },
    {
      defaultToken: 'variable.parameter'
    }
    ],
    'list__1': [{
      'token': 'punctuation.definition.array',
      'regex': '(\\])',
      'next': 'pop'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\,)'
    },
    {
      'token': 'constant.numeric',
      'regex': '\\b((0([box])[0-9a-fA-F]+)|([0-9]+(\\.[0-9]+)?(e[+\\-]?[0-9]+)?))\\b'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\'{3})",
      'push': 'string_single_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\"{3})',
      'push': 'string_double_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\')",
      'push': 'string_single__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\")',
      'push': 'string_double__1'
    },
    {
      'token': 'punctuation.definition',
      'regex': '(\\{)',
      'push': 'map__1'
    },
    {
      'token': 'support.type',
      'regex': '((?!\\W)(int|string|boolean|map|list|object)((?=\\W)|$))'
    },
    {
      'token': 'support.constant',
      'regex': '(null)'
    },
    {
      'token': 'punctuation.definition.array',
      'regex': '(\\[)',
      'push': 'list__1'
    },
    {
      'token': 'source.regexp',
      'regex': '(\\/(?![\\s=/*+{}?])(\\\\.|.)*?/[igmy]{0,4}(?![a-zA-Z0-9]))'
    },
    {
      'token': 'constant.other',
      'regex': '((true|false)(?!(\\s*\\=|\\w)))'
    },
    {
      'token': 'comment',
      'regex': '(#.*)'
    },
    {
      'token': 'variable.parameter',
      'regex': '([\\w_]+(?=\\s*:))',
      'push': 'keyvalue__1'
    },
    {
      'token': 'variable.other',
      'regex': '([\\w_]+[\\w_-]*/[\\w_]+[\\w_-]*)'
    },
    {
      'token': 'source.constant',
      'regex': '((\\d+[smhdwqy])+)(?!(\\s*\\=|\\w))'
    },
    {
      'token': 'meta.identifier',
      'regex': '([\\w_]+)'
    },
    {
      'token': 'meta.identifier',
      'regex': '(\\.[\\w_]+)'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\()',
      'push': 'scope__1'
    },
    {
      'token': 'keyword.operator.comparison',
      'regex': '(<\\=|>\\=|\\=\\=|<|>|\\!\\=)'
    },
    {
      'token': 'keyword.operator.arithmetic',
      'regex': '(\\!|\\+|\\-|\\*|\\*\\*|/|//|%|<<|>>|&|\\||\\^|~|(?!^)@)'
    },
    {
      'token': 'invalid',
      'regex': '([^\\s])'
    },
    {
      defaultToken: 'text'
    }
    ],
    'map__1': [{
      'token': 'punctuation.definition',
      'regex': '(\\})',
      'next': 'pop'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\,)'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\:)'
    },
    {
      'token': 'constant.numeric',
      'regex': '\\b((0([box])[0-9a-fA-F]+)|([0-9]+(\\.[0-9]+)?(e[+\\-]?[0-9]+)?))\\b'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\'{3})",
      'push': 'string_single_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\"{3})',
      'push': 'string_double_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\')",
      'push': 'string_single__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\")',
      'push': 'string_double__1'
    },
    {
      'token': 'punctuation.definition',
      'regex': '(\\{)',
      'push': 'map__1'
    },
    {
      'token': 'support.type',
      'regex': '((?!\\W)(int|string|boolean|map|list|object)((?=\\W)|$))'
    },
    {
      'token': 'support.constant',
      'regex': '(null)'
    },
    {
      'token': 'punctuation.definition.array',
      'regex': '(\\[)',
      'push': 'list__1'
    },
    {
      'token': 'source.regexp',
      'regex': '(\\/(?![\\s=/*+{}?])(\\\\.|.)*?/[igmy]{0,4}(?![a-zA-Z0-9]))'
    },
    {
      'token': 'constant.other',
      'regex': '((true|false)(?!(\\s*\\=|\\w)))'
    },
    {
      'token': 'comment',
      'regex': '(#.*)'
    },
    {
      'token': 'variable.parameter',
      'regex': '([\\w_]+(?=\\s*:))',
      'push': 'keyvalue__1'
    },
    {
      'token': 'variable.other',
      'regex': '([\\w_]+[\\w_-]*/[\\w_]+[\\w_-]*)'
    },
    {
      'token': 'source.constant',
      'regex': '((\\d+[smhdwqy])+)(?!(\\s*\\=|\\w))'
    },
    {
      'token': 'meta.identifier',
      'regex': '([\\w_]+)'
    },
    {
      'token': 'meta.identifier',
      'regex': '(\\.[\\w_]+)'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\()',
      'push': 'scope__1'
    },
    {
      'token': 'keyword.operator.comparison',
      'regex': '(<\\=|>\\=|\\=\\=|<|>|\\!\\=)'
    },
    {
      'token': 'keyword.operator.arithmetic',
      'regex': '(\\!|\\+|\\-|\\*|\\*\\*|/|//|%|<<|>>|&|\\||\\^|~|(?!^)@)'
    },
    {
      'token': 'invalid',
      'regex': '([^\\s])'
    },
    {
      defaultToken: 'text'
    }
    ],
    'multi_line_comment__1': [{
      'token': 'comment',
      'regex': '(###[^\\n]*)',
      'next': 'pop'
    },
    {
      defaultToken: 'comment'
    }
    ],
    'placeholder__1': [{
      'token': 'string.punctuation',
      'regex': '(\\s*\\})',
      'next': 'pop'
    },
    {
      'token': 'constant.numeric',
      'regex': '\\b((0([box])[0-9a-fA-F]+)|([0-9]+(\\.[0-9]+)?(e[+\\-]?[0-9]+)?))\\b'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\'{3})",
      'push': 'string_single_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\"{3})',
      'push': 'string_double_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\')",
      'push': 'string_single__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\")',
      'push': 'string_double__1'
    },
    {
      'token': 'punctuation.definition',
      'regex': '(\\{)',
      'push': 'map__1'
    },
    {
      'token': 'support.type',
      'regex': '((?!\\W)(int|string|boolean|map|list|object)((?=\\W)|$))'
    },
    {
      'token': 'support.constant',
      'regex': '(null)'
    },
    {
      'token': 'punctuation.definition.array',
      'regex': '(\\[)',
      'push': 'list__1'
    },
    {
      'token': 'source.regexp',
      'regex': '(\\/(?![\\s=/*+{}?])(\\\\.|.)*?/[igmy]{0,4}(?![a-zA-Z0-9]))'
    },
    {
      'token': 'constant.other',
      'regex': '((true|false)(?!(\\s*\\=|\\w)))'
    },
    {
      'token': 'comment',
      'regex': '(#.*)'
    },
    {
      'token': 'variable.parameter',
      'regex': '([\\w_]+(?=\\s*:))',
      'push': 'keyvalue__1'
    },
    {
      'token': 'variable.other',
      'regex': '([\\w_]+[\\w_-]*/[\\w_]+[\\w_-]*)'
    },
    {
      'token': 'source.constant',
      'regex': '((\\d+[smhdwqy])+)(?!(\\s*\\=|\\w))'
    },
    {
      'token': 'meta.identifier',
      'regex': '([\\w_]+)'
    },
    {
      'token': 'meta.identifier',
      'regex': '(\\.[\\w_]+)'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\()',
      'push': 'scope__1'
    },
    {
      'token': 'keyword.operator.comparison',
      'regex': '(<\\=|>\\=|\\=\\=|<|>|\\!\\=)'
    },
    {
      'token': 'keyword.operator.arithmetic',
      'regex': '(\\!|\\+|\\-|\\*|\\*\\*|/|//|%|<<|>>|&|\\||\\^|~|(?!^)@)'
    },
    {
      'token': 'invalid',
      'regex': '([^\\s])'
    },
    {
      defaultToken: 'text'
    }
    ],
    'scope__1': [{
      'token': 'constant.character.punctuation',
      'regex': '(\\))',
      'next': 'pop'
    },
    {
      'token': 'constant.numeric',
      'regex': '\\b((0([box])[0-9a-fA-F]+)|([0-9]+(\\.[0-9]+)?(e[+\\-]?[0-9]+)?))\\b'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\'{3})",
      'push': 'string_single_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\"{3})',
      'push': 'string_double_triple__1'
    },
    {
      'token': 'storage.type.string',
      'regex': "(\\')",
      'push': 'string_single__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\")',
      'push': 'string_double__1'
    },
    {
      'token': 'punctuation.definition',
      'regex': '(\\{)',
      'push': 'map__1'
    },
    {
      'token': 'support.type',
      'regex': '((?!\\W)(int|string|boolean|map|list|object)((?=\\W)|$))'
    },
    {
      'token': 'support.constant',
      'regex': '(null)'
    },
    {
      'token': 'punctuation.definition.array',
      'regex': '(\\[)',
      'push': 'list__1'
    },
    {
      'token': 'source.regexp',
      'regex': '(\\/(?![\\s=/*+{}?])(\\\\.|.)*?/[igmy]{0,4}(?![a-zA-Z0-9]))'
    },
    {
      'token': 'constant.other',
      'regex': '((true|false)(?!(\\s*\\=|\\w)))'
    },
    {
      'token': 'comment',
      'regex': '(#.*)'
    },
    {
      'token': 'variable.parameter',
      'regex': '([\\w_]+(?=\\s*:))',
      'push': 'keyvalue__1'
    },
    {
      'token': 'variable.other',
      'regex': '([\\w_]+[\\w_-]*/[\\w_]+[\\w_-]*)'
    },
    {
      'token': 'source.constant',
      'regex': '((\\d+[smhdwqy])+)(?!(\\s*\\=|\\w))'
    },
    {
      'token': 'meta.identifier',
      'regex': '([\\w_]+)'
    },
    {
      'token': 'meta.identifier',
      'regex': '(\\.[\\w_]+)'
    },
    {
      'token': 'constant.character.punctuation',
      'regex': '(\\()',
      'push': 'scope__1'
    },
    {
      'token': 'keyword.operator.comparison',
      'regex': '(<\\=|>\\=|\\=\\=|<|>|\\!\\=)'
    },
    {
      'token': 'keyword.operator.arithmetic',
      'regex': '(\\!|\\+|\\-|\\*|\\*\\*|/|//|%|<<|>>|&|\\||\\^|~|(?!^)@)'
    },
    {
      'token': 'invalid',
      'regex': '([^\\s])'
    },
    {
      defaultToken: 'text'
    }
    ],
    'string_double__1': [{
      'token': 'storage.type.string',
      'regex': '(\\")',
      'next': 'pop'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\\\{)'
    },
    {
      'token': 'string.punctuation',
      'regex': '(\\{\\s*)',
      'push': 'placeholder__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(.)'
    },
    {
      defaultToken: 'text'
    }
    ],
    'string_double_triple__1': [{
      'token': 'storage.type.string',
      'regex': '(\\"{3})',
      'next': 'pop'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\\\{)'
    },
    {
      'token': 'string.punctuation',
      'regex': '(\\{\\s*)',
      'push': 'placeholder__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(.)'
    },
    {
      defaultToken: 'text'
    }
    ],
    'string_single__1': [{
      'token': 'storage.type.string',
      'regex': "(\\')",
      'next': 'pop'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\\\{)'
    },
    {
      'token': 'string.punctuation',
      'regex': '(\\{\\s*)',
      'push': 'placeholder__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(.)'
    },
    {
      defaultToken: 'text'
    }
    ],
    'string_single_triple__1': [{
      'token': 'storage.type.string',
      'regex': "(\\'{3})",
      'next': 'pop'
    },
    {
      'token': 'storage.type.string',
      'regex': '(\\\\{)'
    },
    {
      'token': 'string.punctuation',
      'regex': '(\\{\\s*)',
      'push': 'placeholder__1'
    },
    {
      'token': 'storage.type.string',
      'regex': '(.)'
    },
    {
      defaultToken: 'text'
    }
    ]
  }
  this.normalizeRules()
}

oop.inherits(StoryHighlightRules, TextHighlightRules)

export default StoryHighlightRules
