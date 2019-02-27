
function Iscroll(box, v) {
    if (!v) {
        v = {
            scrollY: true
        };
    }
    var div = document.querySelector(box);
    // console.log(div);

    var ul = div.firstElementChild;

    var startY;
    var startX;
    var currentY = 0; // 记录Y轴总位移
    var currentX = 0; // 记录X轴总位移
    ul.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    })
    ul.addEventListener("touchmove", function (e) {
        var distanceY = e.touches[0].clientY - startY;
        var distanceX = e.touches[0].clientX - startX;
        if (v.scrollY && v.scrollX) {
            ul.style.transition = "none";
            ul.style.transform = "translate(" + (currentX + distanceX) + "px," + (currentY + distanceY) + "px)";

        } else if (v.scrollY) {
            ul.style.transition = "none";
            ul.style.transform = "translateY(" + (currentY + distanceY) + "px)";
        } else if (v.scrollX) {
            ul.style.transition = "none";
            ul.style.transform = "translateX(" + (currentX + distanceX) + "px)";
        }
    })
    ul.addEventListener("touchend", function (e) {
        var distanceY = e.changedTouches[0].clientY - startY;
        var distanceX = e.changedTouches[0].clientX - startX;
        currentY += distanceY;
        currentX += distanceX;
        if (v.scrollY && v.scrollX) {
            X();
            Y();
        } else if (v.scrollY) {
            Y();
        } else if (v.scrollX) {
            X();
        }
    })

    function X() {
        if (currentX > 0) {
            currentX = 0;
            ul.style.transition = "all .5s";
            ul.style.transform = "translateX(0px)";
        }
        // 下边的临界点 minY
        // minY = -(ul的高度 - div的高度);
        var minX = -(ul.offsetWidth - div.offsetWidth);
        if (currentX < minX) {
            currentX = minX;
            ul.style.transition = "all .5s";
            ul.style.transform = "translateX(0px)";
        }
    }
    function Y() {
        // 上边的临界点
        if (currentY > 0) {
            currentY = 0;
            ul.style.transition = "all .5s";
            ul.style.transform = "translateY(0px)";
        }
        // 下边的临界点 minY
        // minY = -(ul的高度 - div的高度);
        var minY = -(ul.offsetHeight - div.offsetHeight);
        if (currentY < minY) {
            currentY = minY;
            ul.style.transition = "all .5s";
            ul.style.transform = "translateY(0px)";
        }
    }
};
