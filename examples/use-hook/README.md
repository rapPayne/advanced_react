# The use hook

The `use` hook allows reading of Promises. It waits until the Promise is resolved
and then draws the component.

## Observations
- If you don't have a `<Suspense>` at all, it loops endlessly.
- If you have the `<Suspense>` in the same component as the fetch, it loops endlessly.
- Both of these are prolly because the `use` has to look __up__ into it's nesting ancestry in order to find the `<Suspense>`. It needs the `<Suspense>` for some reason.
- `use()` requires that we send a promise. If you execute the function *in* the use. it makes the call twice, probably because the promise is recreated on the second render. Instead, make the call and return a Promise. Then pass it into the use:
```javascript
// 🚫 No! Makes the call twice
const people = use(fetchData());
```
```javascript
// 👍 Yes. Makes the call once
const promise = fetchData();
const people = use(promise);
```


