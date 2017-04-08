(function () {

    var M = new Array();

    M[0] = function (a) {
        return a;
    }


    document.onclick = function (event) {

        var a = document.getSelection();
        var b = a.anchorOffset;
        var c = a.anchorNode.textContent;
        var d = c.substring(0, b);
        var k = a.anchorNode.parentNode;
        var f = window.getComputedStyle(k, null).getPropertyValue("font-size");
        var g = window.getComputedStyle(k, null).getPropertyValue("font-weight");
        var h = a.anchorNode.parentNode.clientWidth;

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.font = f + "Segoe UI";
        ctx.fontWeight = g;
        var textWidth = ctx.measureText(d).width;
        var word = "";


        if (window.getComputedStyle(k, null).getPropertyValue("text-align") == "left") {

            s = Math.abs((event.pageX - k.offsetLeft) - (textWidth % h));
            if (s <= 10) {
                word = c.split(" ");
                alert(word[d.split(" ").length - 1].match(/\b.*\b/));
            }

            else
                if (s <= 30 && k.nodeName.toLowerCase() == "p") {
                    word = c.split(" ");
                    alert(word[d.split(" ").length - 1].match(/\b.*\b/));
                }

                else
                    return
        }
        else
            if (window.getComputedStyle(k, null).getPropertyValue("text-align") == "right") {
                
                alert(h - textWidth + "  :  " + (event.pageX - k.offsetLeft));
            }
    }


})();
