## Import

### Don't use Ramda

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

## Naming

- Don't omit naming
  incorrect

```
const ts = new Timesignature()
this.timesignatures.map((ts) => ts)
```

correct

```
const timesignature = new Timesignature()
this.timesignatures.map((timesignature) => timesignature)
```
