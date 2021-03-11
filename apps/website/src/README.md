# Node CLI to generate the favicon

Thanks to <https://realfavicongenerator.net/>

Install cli-real-favicon:

```bash
npm install -g cli-real-favicon
```

Create a file named faviconDescription.json and populate it with:

```json
{
  "masterPicture": "logo.png",
  "iconsPath": "/",
  "design": {
    "ios": {
      "pictureAspect": "noChange",
      "assets": {
        "ios6AndPriorIcons": false,
        "ios7AndLaterIcons": false,
        "precomposedIcons": false,
        "declareOnlyDefaultIcon": true
      }
    },
    "desktopBrowser": {
      "design": "raw"
    },
    "windows": {
      "pictureAspect": "noChange",
      "backgroundColor": "#ffc40d",
      "onConflict": "override",
      "assets": {
        "windows80Ie10Tile": false,
        "windows10Ie11EdgeTiles": {
          "small": false,
          "medium": true,
          "big": false,
          "rectangle": false
        }
      }
    },
    "androidChrome": {
      "pictureAspect": "noChange",
      "themeColor": "#ffffff",
      "manifest": {
        "display": "standalone",
        "orientation": "notSet",
        "onConflict": "override",
        "declared": true
      },
      "assets": {
        "legacyIcon": false,
        "lowResolutionIcons": false
      }
    },
    "safariPinnedTab": {
      "pictureAspect": "silhouette",
      "themeColor": "#5bbad5"
    }
  },
  "settings": {
    "compression": 2,
    "scalingAlgorithm": "Mitchell",
    "errorOnImageTooSmall": false,
    "readmeFile": false,
    "htmlCodeFile": false,
    "usePathAsIs": false
  }
}
```

Generate your icons:

```bash
mkdir outputDir
real-favicon generate faviconDescription.json faviconData.json favicons
```

Inject the HTML code in your pages:

```bash
real-favicon inject faviconData.json favicons *.html
```

Check for updates (to be run from time to time, ideally by your CI):

```bash
real-favicon check-for-update --fail-on-update faviconData.json
```
