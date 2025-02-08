function enforcePortrait() {
    if (window.innerWidth > window.innerHeight) {
        document.body.style.transform = "rotate(90deg)";
        document.body.style.width = "100vh";
        document.body.style.height = "100vw";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
    } else {
        document.body.style.transform = "rotate(0deg)";
        document.body.style.width = "100%";
        document.body.style.height = "auto";
        document.body.style.overflow = "visible";
        document.body.style.position = "relative";
    }
}

window.addEventListener("resize", enforcePortrait);
window.addEventListener("load", enforcePortrait);