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
    } else {
        document.body.style.transform = "rotate(0deg)";
        document.body.style.transformOrigin = "";
        document.body.style.width = "100%";
        document.body.style.height = "auto";
        document.body.style.position = "relative";
        document.body.style.overflow = "visible";
    }
}

// تطبيق الدالة عند التحميل وأثناء تغيير الحجم
window.addEventListener("resize", enforcePortrait);
window.addEventListener("load", enforcePortrait);
