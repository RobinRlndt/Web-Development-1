const setup = () => {
    // dit zal naar onderen afronden bv.
    Math.floor( 7.67 )
    // geeft 7
    Math.floor( -7.34 )
    // geeft -8!

    // dit zal naar boven afronden bv.
    Math.ceil( 7.34 )
    // geeft 8
    Math.ceil( -7.67 )
    // geeft -7!

    // dit zal gewoon afronden
    Math.round(7.34)
    // geeft 7
}
window.addEventListener("load", setup);