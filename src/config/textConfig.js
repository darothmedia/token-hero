const fontFam = 'Arial, Helvetica, sans-serif'
const ptsSize = '32px'
const yellow = '#FFFF00'
const red = '#FF0000'
const green = '#00FF00'

export const h1 = {
  fontFamily: fontFam,
  fontSize: '62px',
  fontStyle: 'bold'
}

export const h2 = {
  fontFamily: fontFam,
  fontSize: '52px',
  fontStyle: 'bold'
}

export const h3 = {
  fontFamily: fontFam,
  fontSize: '42px',
  fontStyle: 'bold'
}

export function p(width){
  const config = {
    fontFamily: fontFam,
    fontSize: '26px',
    wordWrap: {
      width: width / 1.5,
    },
    align: 'left',
  }
  return config
}

export const ptsR = {
  fontFamily: fontFam,
  fontSize: ptsSize,
  fontStyle: 'bold',
  fill: red
}

export const ptsY = {
  fontFamily: fontFam,
  fontSize: ptsSize,
  fontStyle: 'bold',
  fill: yellow
}

export const ptsG = {
  fontFamily: fontFam,
  fontSize: ptsSize,
  fontStyle: 'bold',
  fill: green
}

export const ptsCount = {
  fontFamily: fontFam,
  fontSize: ptsSize,
  fontStyle: 'bold',
}
