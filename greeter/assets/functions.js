window.onload = function(){
    const position = document.getElementById('top-nav').offsetHeight;
    document.body.setAttribute('style', `margin-top: ${position}`);
}

window.onresize = function(){
    const position = document.getElementById('top-nav').offsetHeight;
    document.body.setAttribute('style', `margin-top: ${position}`);
}

function showSignIn() {
    document.getElementById('toggleSignIn').click();
}

