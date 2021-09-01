import React from 'react'

const NumberAbbreviation = props => {
  const {value, precision} = props

  const abbrev = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(value)) / 3)
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1))
  const suffix = abbrev[order]

  // return (value / Math.pow(10, order * 3)).toFixed(precision) + suffix;

  return <div>{Number((value / 10 ** (order * 3)).toFixed(precision)) + suffix}</div>
}

export default NumberAbbreviation
