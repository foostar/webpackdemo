require('./common.css')
var $ = require("jQuery")
console.log($)
$(function(){
    //document.write("<div>没错，这就是首页</div>")
    $("<div>没错，这就是首页</div>").appendTo($("body"))
})