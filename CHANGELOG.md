# sonner-svelte

## 0.3.2

### Patch Changes

- chore: merge icons into single file ([`fe7f44d`](https://github.com/devloop01/sonner-svelte/commit/fe7f44dda5aacda8397e121e3f82d3c08d418075))

- fix: promise toast not showing ([#33](https://github.com/devloop01/sonner-svelte/pull/33))

- chore: remove `context` stuff ([#29](https://github.com/devloop01/sonner-svelte/pull/29))

## 0.3.1

### Patch Changes

- fix: unexpected remove on hover when duration set to 0, remove `duration === 0` checks ([#27](https://github.com/devloop01/sonner-svelte/pull/27))

## 0.3.0

### Minor Changes

- feat: rename `class` props. eg. `className` &rarr; `class` & `classNames` &rarr; `classes` ([#25](https://github.com/devloop01/sonner-svelte/pull/25))

## 0.2.7

### Patch Changes

- fix: toastOptions `classNames` not applying ([`d834640`](https://github.com/devloop01/sonner-svelte/commit/d834640e0351085a9708b39adde7c68434c11ff2))

## 0.2.6

### Patch Changes

- fix: replace `classix` utility ([`4f51196`](https://github.com/devloop01/sonner-svelte/commit/4f511961a3f04489d43e31a7b78b107aa1fa3147))

## 0.2.5

### Patch Changes

- feat: add other styling related markup and props i.e. `classNames`, `style` etc. ([`4826eca`](https://github.com/devloop01/sonner-svelte/commit/4826ecadd2a1360fe250bfc556e2b5869c3c288c))

- fix: remove `props` from `ToastOptions` type ([`dbb1a22`](https://github.com/devloop01/sonner-svelte/commit/dbb1a2292cf1944f01b2c5214ea6a5f6c6cdee12))

- chore: remove type `ToastOptions` from package export ([`91bcecf`](https://github.com/devloop01/sonner-svelte/commit/91bcecfb77ca35b5c04f6be615e2947f527deb9f))

- feat: add `className`, `style` prop in `<Toaster />` ([`5e38493`](https://github.com/devloop01/sonner-svelte/commit/5e38493f72f14d1965a1805e7e56d2870d60c134))

- fix: loading toast duration ([`606d563`](https://github.com/devloop01/sonner-svelte/commit/606d563bc6810b319b4f2fc561ab467c0e46ac7d))

- feat: export types - `ToastOptions`, `ToastTheme`, `ToastDirection` from package ([`fe715e4`](https://github.com/devloop01/sonner-svelte/commit/fe715e47b1c9b82c3b41b5f3f51dd303413da4fe))

- fix: `Toast` types ([`1119972`](https://github.com/devloop01/sonner-svelte/commit/1119972dcc7169077430330ca47f10f2c003a300))

## 0.2.4

### Patch Changes

- fix: `ToastOptions` type ([`a02ea25`](https://github.com/devloop01/sonner-svelte/commit/a02ea2548f4dc524a63c45f2335dd31ee06339f4))

- chore: replace `closeDelay` with `duration` ([`3f6fe05`](https://github.com/devloop01/sonner-svelte/commit/3f6fe059cd2dc82e74f823b088a9408baf5b15d6))

- feat: add `onDismiss` & `onAutoClose` method options ([`6f78203`](https://github.com/devloop01/sonner-svelte/commit/6f78203a548f0c21a40a9239780a74255c96e64a))

- fix: remove `data-dismissible` from `<Toaster />` ([`01650d5`](https://github.com/devloop01/sonner-svelte/commit/01650d5fe3a27bc901e134a31d62f930cbd11b52))

- feat: add `finally` option in `toast.promise` ([`06aeda5`](https://github.com/devloop01/sonner-svelte/commit/06aeda5aa8971df7efe4bd06c66bfad98de80509))

- chore: rename `delete` option to `dismiss` ([`f7ac37f`](https://github.com/devloop01/sonner-svelte/commit/f7ac37fd03ff0197f3dd4eab89c5c9cab7d91004))

## 0.2.3

### Patch Changes

- feat: default export `toast` method ([`ccfe5e5`](https://github.com/devloop01/sonner-svelte/commit/ccfe5e593a579ebaee81d169a195fb21d7f7ff37))

- fix: custom gap `:hover` glitch ([`055806f`](https://github.com/devloop01/sonner-svelte/commit/055806f9edec1427dde97697cfc1919a03485348))

- feat: add `loadingIcon` prop ([`4f0d124`](https://github.com/devloop01/sonner-svelte/commit/4f0d1244210b7d4a2a682f94f01ca6790b0783e9))

- fix: `<Toaster />` prop defaults ([`160942f`](https://github.com/devloop01/sonner-svelte/commit/160942f8f1138ce5811343ccac9cfcd33b21363d))

- feat: add `unstyled` toast option ([`ba776c3`](https://github.com/devloop01/sonner-svelte/commit/ba776c3b0c22b3ae88580a4ae040956875e1759a))

## 0.2.2

### Patch Changes

- fix: remove `<Toaster />` when no `toasts` ([`b2d9289`](https://github.com/devloop01/sonner-svelte/commit/b2d928965c8fdeed210ed3b57395c6da46fd011e))

- feat: export neccesary types ([`8a79ac0`](https://github.com/devloop01/sonner-svelte/commit/8a79ac0428fea9c7da1585f10438f384667462f5))

- feat: create headless (unstyled) toasts using `toast.custom` ([`e6297ec`](https://github.com/devloop01/sonner-svelte/commit/e6297ec1df650c4971ce583ad4e01634294d4473))

- chore: remove unwanted comments ([`850a915`](https://github.com/devloop01/sonner-svelte/commit/850a915988fb3ebc2c62dc3b5fc831d698028760))

## 0.2.1

### Patch Changes

- feat: add toast type - `promise` ([`afb12c2`](https://github.com/devloop01/sonner-svelte/commit/afb12c2a4c2464a351089fee237ef0ca424a3580))

## 0.2.0

### Minor Changes

- feat: add toast types - `action`, `cancel`, `custom` ([`278b538`](https://github.com/devloop01/sonner-svelte/commit/278b538aa8711267ddc178207be78c1038340307))

## 0.1.7

### Patch Changes

- feat: add `portal` option ([`eee94ca`](https://github.com/devloop01/sonner-svelte/commit/eee94ca0ef85103d1c69c76d002b7e46d60a81f7))

## 0.1.6

### Patch Changes

- chore: return cleanup function from `onMount` ([`b4ca5e5`](https://github.com/devloop01/sonner-svelte/commit/b4ca5e5e0094d2707df3a89aa09ef82ad03c9280))

- chore: improve module imports ([`5c428f6`](https://github.com/devloop01/sonner-svelte/commit/5c428f69d76b450bbac3921dbf978c262b0f8427))

- chore: update internal file routes ([`17cfa06`](https://github.com/devloop01/sonner-svelte/commit/17cfa06aad4a404f26437b386bf8eacee3bdaed7))

- chore: update internal types ([`7517e3d`](https://github.com/devloop01/sonner-svelte/commit/7517e3dd891940cf5e2bd9a0dedf3f135a6bc58d))

## 0.1.5

### Patch Changes

- chore: refactor timeout logic on interaction ([#11](https://github.com/devloop01/sonner-svelte/pull/11))

## 0.1.4

### Patch Changes

- fix: lib imports file extensions ([#9](https://github.com/devloop01/sonner-svelte/pull/9))

## 0.1.3

### Patch Changes

- fix: pause timer when interacting ([#7](https://github.com/devloop01/sonner-svelte/pull/7))

## 0.1.2

### Patch Changes

- chore: remove unwanted deps ([`5b692cc`](https://github.com/devloop01/sonner-svelte/commit/5b692cc8a7d794e636980ef904561cbd991aaa9d))

## 0.1.1

### Patch Changes

- fix: use portal to render `<Toaster/>` ([#4](https://github.com/devloop01/sonner-svelte/pull/4))

- feat: add portal action ([#4](https://github.com/devloop01/sonner-svelte/pull/4))

## 0.1.0

### Minor Changes

- feat: add toast lib ([#2](https://github.com/devloop01/sonner-svelte/pull/2))
