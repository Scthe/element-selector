# Element selector ([DEMO](https://scthe.github.io/element-selector))

Select an existing element on the page. While might seem niche, I’ve lost count of how many times I had to reimplement this functionality over the years.

### User flow

1. Click the purple button in the bottom-right corner.
2. You are now in element select mode. Hover over page elements and enjoy fancy effects (it's `box-shadow` with a huge spread-radius btw.).
3. 'Click' some page element to select it.
4. The button in the bottom-right corner turns into a popup with data about the selected element.

https://github.com/Scthe/element-selector/assets/9325337/625e87de-b0c0-465b-b74c-58155923aaf5

## Usage

1. `yarn install`
1. `yarn start` <- dev server
1. Go to [http://localhost:8000/](http://localhost:8000/)

**Other commands:**

- `yarn build`. Builds prod version into `build`.
- `yarn preview`. Builds prod version into `build`, starts [http-server](https://www.npmjs.com/package/http-server).
- `yarn clean`. Remove all files from `build`.
- `yarn lint`. Runs linter. It's a small project, but I have no patience to deal with raw JS.

And if I forget yarn commands again: [Yarn recipes](https://yarnpkg.com/getting-started/recipes).

## References

- Example page for tests is from [tailwindcomponents/e-commerce](https://github.com/tailwindcomponents/e-commerce) ([MIT](https://github.com/tailwindcomponents/e-commerce/blob/master/LICENSE.md)).
- Some animation interpolation curves based on [codrops](https://tympanus.net/codrops/).
