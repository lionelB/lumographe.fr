import FontFaceObserver from "fontfaceobserver"

const montserratObserver = new FontFaceObserver("montserrat")
// const playfairObserver = new FontFaceObserver("playfair_displayregular")
const ebgaramondObserver = new FontFaceObserver("ebgaramond")

montserratObserver.check().then(() => document.body.classList.add("font-montserrat"))
ebgaramondObserver.check().then(() => document.body.classList.add("font-ebgaramond"))


