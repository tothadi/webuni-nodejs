function setPos() {
    const position = document.getElementById('top-nav').offsetHeight;
    document.body.setAttribute('style', `margin-top: ${position}`);
}

window.onload = function(){
    setPos();
}

window.onresize = function(){
    setPos();
}

function showSignIn() {
    document.getElementById('toggleSignIn').click();
    setPos();
}

