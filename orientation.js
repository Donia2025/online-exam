function enforcePortrait() {
    if (window.innerWidth > window.innerHeight) {
        document.body.style.transform = "rotate(90deg)";
        document.body.style.transformOrigin = "center center";
        document.body.style.width = "100vh";
        document.body.style.height = "100vw";
        document.body.style.position = "fixed";
        document.body.style.top = "0";
        document.body.style.left = "0";
        document.body.style.overflow = "hidden";
        document.documentElement.style.width = "100vh";
        document.documentElement.style.height = "100vw";
    } else {
        document.body.style.transform = "rotate(0deg)";
        document.body.style.transformOrigin = "";
        document.body.style.width = "100%";
        document.body.style.height = "auto";
        document.body.style.position = "relative";
        document.body.style.overflow = "visible";
        document.documentElement.style.width = "";
        document.documentElement.style.height = "";
    }
}

function fixViewport() {
    let viewport = document.querySelector("meta[name=viewport]");
    if (!viewport) {
        viewport = document.createElement("meta");
        viewport.name = "viewport";
        document.head.appendChild(viewport);
    }
    viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
}

window.addEventListener("resize", enforcePortrait);
window.addEventListener("load", () => {
    fixViewport();
    enforcePortrait();
});
