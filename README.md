- generate json as const

```
echo -E "export default $(cat ./src/models/core/metadata.json) as const;" > ./src/models/core/metadata.json.d.ts
```
