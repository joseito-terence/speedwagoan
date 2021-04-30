// Currency format function.
function currencyFormat(value) {    
  return  Number(value).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR'
  });                                         
}


export { currencyFormat }