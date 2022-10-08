import {autoHyphen} from "./module.js";

$(function(){
    $('#phone').on('input', (e) => {
        autoHyphen(e.target);
    })
})