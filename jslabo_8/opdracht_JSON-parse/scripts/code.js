const setup = () => {

    inJSONStringify();

}
window.addEventListener("load", setup);

let student1= {
    voornaam : "Jan",
    familienaam : "Janssens",
    geboorteDatum : new Date("1993-12-31"),
    adres : {
        straat : "Kerkstraat 13",
        postcode : "8500",
        gemeente : "Kortrijk"
    },
    isIngeschreven : true,
    namenVanExen : ["Sofie", "Berta", "Philip", "Albertoooo"], // een array
    aantalAutos : 2
}

const inJSONStringify = () => {
    let student1InJSON = JSON.stringify(student1);
    let student1Normaal = JSON.parse(student1InJSON);
    console.log(JSON.stringify(student1Normaal.familienaam))
}