const setup = () => {


    const print = () => {
            console.log("hallo");
    }
    setTimeout(print, 5000);
}
window.addEventListener("load", setup);