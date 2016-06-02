<!DOCTYPE html>
<html>
<head>
<title>autoresizing textarea</title>
<style type="text/css">
textarea {
    border: 0 none white;
    overflow: hidden;
    padding: 0;
    outline: none;
    background-color: #D0D0D0;
    resize: none;
}
</style>
<script type="text/javascript">
var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function init () {
    var text = document.getElementById('text');
    function resize () {
        text.style.height = 'auto';
        text.style.height = text.scrollHeight+'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change',  resize);
    observe(text, 'cut',     delayedResize);
    observe(text, 'paste',   delayedResize);
    observe(text, 'drop',    delayedResize);
    observe(text, 'keydown', delayedResize);

    text.focus();
    text.select();
    resize();
}
</script>
</head>
<body onload="init();">
<textarea rows="1" style="height:1em;" id="text"></textarea>
</body>
</html>