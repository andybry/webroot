# Eva Core

## Editing

Make sure, when you wish to edit, you edit the files found in src, not dist.

Once you have edited the files, you can update the dist and demo files by running:

```shell
$ rake build:all
```

or

```shell
$ rake
```

## Eva Rails

[Eva Rails](https://github.com/whichdigital/eva_rails) allows Eva to be quickly integrated in to the rails asset pipeline. In order for eva-core to play nicely with eva_rails a manifest of required external dependencies must be manually maintained. This manifest can be found in `manifest.yml`. This file must contain all external dependencies that are required. Otherwise these files will not be avaiable in the asset pipeline when in Rails.

## URL Path Shim

Because Rails uses helpers to define paths for assets, if you want to use certain eva-core modules (such as `font-face.scss`) that use these helpers, you will need to use `url-path-shim.scss`.

For example:

```sass
@import "url-path-shim.scss";

$font-path: "assets/fonts/";

@font-face {
  font-family: "stserifbookRegular";
  src: font-url("st_semibold-webfont.eot");
}
```

Which compiles to:

```css
@font-face {
  font-family: "stserifbookRegular";
  src: url("assets/fonts/st_semibold-webfont.eot");
}
```

In your main.scss file, you will need to add paths to assets, fonts, images and audio. If you aren't using any of the corresponding helpers, you don't need to add the path.

```sass
$asset-path: "assets/";
$image-path: "assets/images/";
$audio-path: "assets/audio/";
$font-path:  "assets/fonts/";
```

## Changelog

* 0.9.0 - dropdown selector placeholder added
* 0.8.0 - *POSSIBLE BREAKING CHANGE* - typography uses semibold font for <strong>
* 0.7.4 - update the path for bower components in the demo
* 0.7.3 - add guard rake for compiling on change
* 0.6.3 - correct path to center stylesheets
* 0.6.2 - add images
* 0.6.1 - populate dist
* 0.6.0 - styleguide CSS and JS added
* 0.5.1 - trend icons swapped
* 0.5.0 - added 'stable trend' icon
* 0.4.0 - use placeholder classes not mixins
* 0.3.0 - modified link and toggle styles. Added trend up / down glyphs to icon font. Extracted icon placeholder classes
* 0.2.0 - populated src folder
* 0.1.0 - Updated colours to match Digital guidelines
* 0.0.0
