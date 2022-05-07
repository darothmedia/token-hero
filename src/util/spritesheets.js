const tokenPrefix = '../../img/img_';
const keyboardPrefix = '../../img/keyboard_sheet_'

export const keyboardSheets = [
  {
    key: 'keyboard',
    filepath: keyboardPrefix + 'white' + '.png',
  }, {
    key: 'keyboard_y',
    filepath: keyboardPrefix + 'yellow' + '.png',
  }, {
    key: 'keyboard_g',
    filepath: keyboardPrefix + 'green' + '.png',
  }, {
    key: 'keyboard_r',
    filepath: keyboardPrefix + 'red' + '.png',
  },
]

export const tokenSheets = [
  {
    key: 'alien',
    filepath: tokenPrefix + 'alien' + '.png',
  }, {
    key: 'catbox',
    filepath: tokenPrefix + 'catbox' + '.png',
  }, {
    key: 'dragon',
    filepath: tokenPrefix + 'dragon' + '.png',
  }, {
    key: 'fatcat',
    filepath: tokenPrefix + 'fatcat' + '.png',
  }, {
    key: 'jetpack',
    filepath: tokenPrefix + 'jetpack' + '.png',
  }, {
    key: 'robot',
    filepath: tokenPrefix + 'robot' + '.png',
  }, {
    key: 'ship',
    filepath: tokenPrefix + 'ship' + '.png',
  },
]

export const failToken = {
  key: 'static',
  filepath: tokenPrefix + 'static' + '.png',
}