# blimp-widgets

Collection of widgets used with conjunction with blimp web.

This is composed of two environments

## Creating a Widget

1. Create a new folder for your widget under `src/components`
2. Write your widget
3. Update `src/index.js` to include an import and export for your widget

For example:

```
import HelloWorld from './components/HelloWorld';
export {
  HelloWorld
}
```

## Testing Widget Usage

1. Open one terminal and run
`cd blimp-live-widgets && npm start`

This will detect changes in the widgets/react components and update accordingly.

2. Open another terminal to run the test app:
`cd blimp-live-widgets/example && npm start`

3. Edit `example/src/App.js` to include your widget

4. Launch a web browser and load localhost:3000
(This will update automatically as you make changes to the widget)


## Testing Widget Usage in Another (local) directory

```
cd blimp-live-widgets
npm link
```

In project you want to use widget in:

```
npm link blimp-live-widgets
```

Example Usage:

```
import {ExampleComponent, HelloWorld} from 'blimp-live-widgets'
```

## Publishing to npm

```
cd blimp-live-widgets
npm publish
```
