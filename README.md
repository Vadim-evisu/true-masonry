
### 🎲 True Grid Adaptive Masonry.

*`true-masonry`* Is a Vue Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to a quick, reliable solution that also has great browser support along with fast rendering performance ..just as Vue.js intended.

Supported Browswers with CSS Grid


😄 What does this do
- Responsive! ..always
- CSS powered (Faster to render)
- Allows for Gaps (Gutters) between elements

🏳️ What doesn't this do
- Works with elements with different widths
- Sorting based on height - This kills performance, so if you don't need it we're here for you

### Example
[CodeSandbox DEMO](https://codesandbox.io/s/truemasonry-zs8zr)

### 😲 Simple Usage

Add `true-masonry` to your project:

By script..

### Install
`npm install true-masonry --save-dev` 
`yarn add true-masonry --dev`

```JS
import Vue from 'vue'
import TrueMasonry from 'true-masonry'

Vue.use(TrueMasonry);
```


### Resposive Breakpoints

Different columns and gutter sizes can be specified by passing an object containing key's of the window widths and their values representing the number of columns or gutter size. To have a fallback value, use the `default` key.

_note:_ The `cols=` attribute needs to use Vues bind method to evaluate objects. Instead of `cols=""` use either `v-bind:cols="{ 700: 3 }"` or the shorthand `:cols="{ 700: 3 }"`

### Usage
Your content must be wrapped to div tag after cols in loop!!!

```HTML
<true-masonry
  :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
  :gutter="{default: '30px', 700: '15px'}"
  >
  <div v-for="(item, index) in items" :key="index">Item: {{index + 1}}
    <div>
      Content
    </div>
  </div>
</true-masonry>
```
```PUG
true-masonry(:gap="{init: 26, 700: 13}", :cols="{init: 5, 1200: 4, 1000: 3, 700: 2, 400: 1}", :has-imgs="true")
  .col.px-4.rounded-lg.bg-gray-900(v-for="comment in comments")
    .div
      p Your Content
```

In the above example, the number of columns will default to 4. When the window's is between 1000px and 700px, the number of columns will be 3. The key represents the `max-width` of the window, and `true-masonry` will use the largest key that satisfies this.


## Options

Props
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tag</td>
      <td>String</td>
      <td>String</td>
      <td>Defalt wrapper tag</td>
    </tr>
    <tr>
      <td>Cols</td>
      <td>Object, Number, String</td>
      <td>2</td>
      <td>Quantity of columns</td>
    </tr>
    <tr>
      <td>Gap</td>
      <td>Object, Number, String</td>
      <td>0</td>
      <td>Gap between columns</td>
    </tr>
    <tr>
      <td>hasImgs</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Await all images for creating masonry</td>
    </tr>
  </tbody>
</table>

