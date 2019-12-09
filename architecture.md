## Architecture

In order to allow contributions easily, we're thinking the architecture of the studio in a way that allow us to prevent merging conflicts.
Multiple folders are present inside src:

- `app`: contains the app views and statefull-necessities plugins (routes, storage)
- `editor`: contains editor-related components
  - `core`: contains the core elements for using monaco-editor inside storyscript, taking care of the plugins
  - `plugin-*`: contains the independent plugins we develop and use inside monaco-editor to make it our own
- `internal`: contains a set of stateless resources used in the `app`
  - `plugins`: contains the external plugins used in the studio
  - `components`: contains the reusable components we are using in the app
  - `directives`: contains the directives we use in the studio

> Every directory has its `types` directories that can be loaded using `&/something` from anywhere across the repository


paths are defined so you can load files accross folders as if they were modules;
- `@app/something` will load `src/app/views/something.vue` or `src/app/something`
- `@editor/view` will load `src/editor/core/views/view.vue`
- `@editor-plugin/collab` will load `src/editor/plugin-collab/index.ts`
- `@internal/components/Text.vue` will load `src/internal/components/Text.vue`
- `@internal/directives/Something` will load `src/internal/directives/Something.ts`
- `@internal/plugins/plug` can load `src/internal/plugins/plug/index.ts` or `src/internal/plugins/plug.ts`
> :information_source: the `@/*` alias is still in place to load any `src/*` resource, if necessary, but can be deprecated later, and should not be used often, for consistency purposes


### Diagram

```
.
├── src
│   ├── app
│   │   ├── router
│   │   ├── store
│   │   ├── types
│   │   ├── views
│   │   ├── registerServiceWorker.ts
│   │   ├── serviceWorker.js
│   │   └── main.ts
│   ├── editor
│   │   ├── core
│   │   │   ├── plugins
│   │   │   ├── types
│   │   │   └── views
│   │   └── plugin-something
│   │       ├── src
│   │       ├── types
│   │       └── index.ts
│   └── internal
│       ├── components
│       ├── directives
│       ├── plugins
│       └── types
└── (...)
```
