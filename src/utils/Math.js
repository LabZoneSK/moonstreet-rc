export function roundNumber(number, decimals, radix = 10) {
  const newnumber = Number(`${number} `).toFixed(parseInt(decimals, radix));
  return parseFloat(newnumber);
}

export function otherMath() {
  /* Not implemented yet. */
  return false;
}
