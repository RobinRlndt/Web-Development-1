const setup = () => {
    const text = "De man van An geeft geen hand aan ambetante verwanten";
    const searchStr = "an";

    const countOccurrencesIndexOf = (text, searchStr) => {
        let count = 0;
        let index = text.indexOf(searchStr);
        while (index !== -1) {
            count++;
            index = text.indexOf(searchStr, index + 1);
        }
        return count;
    };

    const countOccurrencesLastIndexOf = (text, searchStr) => {
        let count = 0;
        let index = text.lastIndexOf(searchStr);
        while (index !== -1) {
            count++;
            text = text.substring(0, index);
            index = text.lastIndexOf(searchStr);
        }
        return count;
    };

    console.log("Aantal met indexOf:", countOccurrencesIndexOf(text, searchStr));
    console.log("Aantal met lastIndexOf:", countOccurrencesLastIndexOf(text, searchStr));
}
window.addEventListener("load", setup);