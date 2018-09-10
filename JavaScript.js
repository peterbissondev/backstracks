(function () {
    
    var Page = new Array();
    var templates = "";
    var readpage = "";
    var editpage = "";

    var M = {

        Home: function (a) {

        },

        SiteMode: function (a) {
            a.textContent = "EditMode";
            document.getElementsByTagName("A2")[0].setAttribute("contentEditable", "true");
        },

        EditMode: function (a) {
            a.textContent = "SiteMode";
            document.getElementsByTagName("A2")[0].setAttribute("contentEditable", "false");
        },

        D6: function (a) {
            a = parseInt(a.textContent.match(/\d+/));
            var b = Math.round(a / 25) + 1; 
            if (a < 10) a = "00" + a;
            if (a > 9 && a < 100) a = "0" + a;
            var c = document.getElementsByTagName("D5")[0].textContent;
            if (c === "SiteMode")
                a = "Chapter" + b + "/pageA" + a;
            else
                if (c === "EditMode") {
                    a = "epageA" + a;
                    
                }

            Page.push(a);
            getPage();
        },

        D7: function (a) {
            var c = document.getElementsByTagName("D6")[0];
            a = parseInt(c.textContent.match(/\d+/)) + parseInt(a);
            if (a < 1) a = 1;
            if (a > 1000) a = 1000;
            c.textContent = "Page " + a + ".";
            M["D6"](c);
        }

    };

    document.onkeyup = document.onclick = function (event) {

        var a = window.getSelection();
        var b = a.anchorNode;
        var c = a.anchorOffset;
        var d = b.textContent.substring(0, c).split(" ").length - 1;
        var e = b.textContent.split(" ");
        var f = b.parentNode.getBoundingClientRect();
        var g = event.pageX - (f.left + window.pageXOffset);
        var h = event.pageY - (f.top + window.pageYOffset);

        if (c > 0 && c < b.textContent.length || c === 0 && b.textContent.length === 1) {

            if (g > 0 && g < f.width && h > 0 && h < f.height) {

                if (b.parentNode.nodeName === "D5") {
                    M[e[d]](b);
                }
                else
                    if (b.parentNode.nodeName === "D6") {
                        M["D6"](b);
                        
                    }
                    else if (b.parentNode.nodeName === "D7") {
                        M["D7"](e[d]);

                    }


            }
        }
    };

    function makePage(z) {

        var a = Object.keys(templates);
        var b = templates[z].target;
        var c = templates[z].nodes;
        var d = templates[z].name;
        var e = templates[z].class;
        var f = templates[z].text;
        //    var d = b.charCodeAt(1) - 1;

        var g, h, j;

        for (var i = 0; i < c.length; i++) {

            if (i === 0) {
                g = b;
            }
            else {

                if (c[i] > c[i - 1]) {
                    g = c[i - 1] + d[i - 1];
                }

                if (c[i] < c[i - 1]) {

                    a = c.charCodeAt(i) - 1;

                    if (a === 64) {
                //        alert(a + "   " + c);
                        g = b;
                    }
                    else {

                        g = String.fromCharCode(a);

                //        alert(g + "   " + c);

                        //    h = c.subString(0, i+1);

                        //    alert(h);
                        h = c.lastIndexOf(g);

                        if (h < 0)
                            g = b;
                        else {
                            g = c[h] + d[h];
                        }
                    }
                }

            }
            a = document.getElementsByTagName(g).length - 1;
            a = document.getElementsByTagName(g)[a];

            if (i === 0)
                a.innerHTML = "";
            j = document.createElement(c[i] + d[i]);
            j.textContent = f[i];
            a.appendChild(j);

        }
    }

    function setPage() {

        var a = Page.shift();
        var b = sessionStorage.getItem(a);

        b = JSON.parse(b);
        if (typeof b !== "object")
            b = JSON.parse(b);

        if (a === "templates") {

            templates = b;

            makePage("main");
            makePage("default");
        }

    }

    function getPage() {

        var a = Page[0];

        if (!sessionStorage.getItem(a)) {

// Must find a way to set page type. Could have to do with page number range at contents except ?
// May have to rethink using the templates and/or page type system.

            if (a.match(/(epageA\d+)/)) {
                sessionStorage.setItem(a, JSON.stringify(templates["default"]));

            }

            else {
 
                var client = new XMLHttpRequest();
                client.onreadystatechange = function () {
                    if (client.status === 200 && client.readyState === 4) {

                        if (JSON.stringify(client.responseText))
                            sessionStorage.setItem(a, JSON.stringify(client.responseText));
                    }
                };
                client.open("GET", "" + a + ".json", false);
                client.send(null);
            }
        }
        setPage();

    }

    window.onload = function () {
//        var c = document.getElementsByTagName("D6")[0];
//        M["D6"](c);

        Page.push("templates");
        getPage();

    };


})();
