for(var i=0;i<26;i++) {
    var character = String.fromCharCode(97+i);
    $("#alphabets").append(`<button type="button" id="${character}" class="btn btn-outline-primary clickable">${character}</button>`);
}