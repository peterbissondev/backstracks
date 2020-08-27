(function () {

    var lpage = "A001";
    var serverlock = 0;
    var nextprev = 1;

    document.oncontextmenu = function (event) {
        var a = event.target;
        var b = window.getComputedStyle(a).cursor;

        if (b === "text") {
///            alert(event.target.textContent);  Could find text range concern.
            b = window.getSelection().anchorOffset;
            b = a.textContent.substring(0, b).split(" ").length - 1;
            a = a.textContent.split(" ");
 //           alert(a[b]);
            window.open("https://www.bing.com/search?q=" + a[b], "new");

        }
        return false;
    }


    document.onclick = function (event) {

         var a = event.target;
        var b = window.getComputedStyle(a).cursor;
        var c = document.getElementById("ipage");

        if (lpage.match(/B/))
            localStorage.setItem(lpage, c.innerHTML);


        if (b === "pointer") {

            switch (a.textContent) {

                case "Home":

                    var d = document.getElementById("mode").textContent;

                    if (d === "Site Mode") {
                        setPageNum(1, 0);
                    }

                    break;

                case "Site Mode": a.textContent = "Edit Mode";
                    setAttrs("contenteditable", "true");
                    setAttrs("style", "cursor:text");
                    lpage = lpage.replace("A", "B");
                    getpage();
                    break;

                case "Edit Mode": a.textContent = "Code Mode";
                    b = c.innerHTML;
                    a = b.match(/\<\/\w+\>/g);
                    b = b.split(/\<\/\w+\>/g);
                    var d = "";
                    for (var i = 0; i < b.length - 1; i++) {
                        d = d + b[i] + a[i] + "\r\n\n";
                    }
                    c.innerText = d;

                    break;

                case "Code Mode": a.textContent = "Site Mode";
                    localStorage.setItem(lpage, c.innerText.replace(/[\r\n]/g, ""));
                    setAttrs("contenteditable", "false");
                    setAttrs("style", "cursor:alias");
                    c.innerHTML = c.textContent.replace(/[\r\n]/g,"");
                    lpage = lpage.replace("B", "A");
                    getpage();
                    break;

                case " > ":
                    document.getElementById("nextprev").textContent = "Next";
                    nextprev = 1;
                    setPageNum(parseInt(lpage.match(/\d+/)), 1);
                    break;

                case " < ":
                    document.getElementById("nextprev").textContent = "Prev";
                    nextprev = 0;
                    setPageNum(parseInt(lpage.match(/\d+/)), 1);
                    break;

                case "Next": a.textContent = "Prev"; nextprev = 0; break;

                case "Prev": a.textContent = "Next"; nextprev = 1; break;

                case "1": setPageNum(parseInt(lpage.match(/\d+/)), 1); break;

                case "10": setPageNum(parseInt(lpage.match(/\d+/)), 10); break;

                case "100": setPageNum(parseInt(lpage.match(/\d+/)), 100); break;

                case "Copy": localStorage.setItem("copy", c.innerHTML); break;

                case "Paste":
                    if (!localStorage.getItem("copy")) {
                        c.innerHTML = "<p>Use copy followed by paste to create a page template.</p>"
                    }
                    else
                        c.innerHTML = localStorage.getItem("copy");
                    break;

                case "Clear":
                    localStorage.removeItem(lpage);
                    c.innerHTML = "<p>Use copy followed by paste to create a page template. Hint: Copy a Site Mode page to an Edit Mode page.</p>"
                    break;

                case "Clear All": /* Removes all local storage */
                    localStorage.clear();
                    break;

                case "Server Off": serverlock = 1; a.textContent = "Server On"; break;

                case "Server On": serverlock = 0; a.textContent = "Server Off"; break;
                
                default: break;
            }

        }
        else if (b === "alias") {

            b = window.getSelection().anchorOffset;
            b = a.textContent.substring(0, b).split(" ").length - 1;
            a = a.textContent.split(" ");
            window.open("https://www.bing.com/search?q=" + a[b], "new");

        }

    }


    function setAttrs(g, h) {
        document.getElementById("ipage").setAttribute(g, h);
    }


    function setPageNum(a, b) {

        if (nextprev) {
            a = a + b;
            if (a > 998) {
                a = 999;
                document.getElementById("nextprev").textContent = "Prev";
                nextprev = 0;
            }
        }
        else
            if (!nextprev) {
                a = a - b;
                if (a < 2) {
                    a = 1;
                    document.getElementById("nextprev").textContent = "Next";
                    nextprev = 1;
                }
            }


        document.getElementById("pageNum").textContent = " Page " + a + ".";

        if (a < 10)
            a = "00" + a;
        if (a >= 10 && a <= 99)
            a = "0" + a;

        lpage = lpage.match(/[AB]/) + a;

        getpage();

    }







    function getpage() {

        var c = document.getElementById("ipage");

        if (lpage.match(/B\d{3}/)) {

            if (!localStorage.getItem(lpage)) {
                c.innerHTML = "<p>Use copy followed by paste to create a page template. Hint: Copy a Site Mode page to an Edit Mode page.</p>"

            }
            else
                c.innerHTML = localStorage.getItem(lpage);
        }


        if (lpage.match(/A\d{3}/)) {

            if (!localStorage.getItem(lpage) || serverlock) {

                var client = new XMLHttpRequest();
                client.onreadystatechange = function () {
                    if (client.status === 200 && client.readyState === 4) {
                        localStorage.setItem(lpage, client.responseText);
                        c.innerHTML = localStorage.getItem(lpage);
                    }
                    else
                        c.innerHTML = "<p class=\"topic\">This page has yet to be published at the server.<p>";
                    //    alert("server");
                }
                client.open("GET", "" + lpage + ".html", false);
                client.send(null);
            }
            else
                c.innerHTML = localStorage.getItem(lpage);
        }




    }


    window.onload = function () {

        getpage();

    }

})();
