# gulp-ref

Find reference asserts, join stream pipe to next.

Example

```
-app
 -index.html
 -js
  -script.js
 -css
  -style.css
 -images
  -logo.png
```
```html
<!--index.html-->
<link href="css/style.css" rel="stylesheet">
<script src="js/invalid.js"></script>
<div class="logo"></div>
```
```css
//style.css
.logo { background: url(../images/logo.png); }
```
```js
var ref=require("gulp-ref");
//some task here
gulp.src("app/*.html")
    .pipe(ref())
    .pipe(gulp.dest("dist"));
```
```
-dist
 -index.html
 -css
  -style.css
 -images
  -logo.png
```