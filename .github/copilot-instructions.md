## Import

### This repository uses Remeda instead of Ramda

incorrect

```
import * as R from "ramda"
```

correct

```
import * as R from "remeda"
```

### How to Import Core

incorrect

```
import { Core } from "@core/core";
import * as Core from "../../core";
import * as Core from "../core";
```

correct

```
import * as Core from "core"
```

# Naming

## Do not omit or abbreviate names for variable names, function parameters, callback arguments, or loop variables.

incorrect

```
const ts = new Timesignature()
this.timesignatures.map((ts) => ts)

const ks = new Keysignature()
this.keysignatures.map((keysig) => keysig)

glyphs((g)=> g)
```

correct

```
const timesignature = new Timesignature()
this.timesignatures.map((timesignature) => timesignature)

const keysignature = new Keysignature()
this.keysignatures.map((keysignature) => keysignature)

glyphs.map((glyph) => glyph)
```
