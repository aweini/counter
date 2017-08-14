let root = $("#root");
let addDraggerBtn = $(".add-dragger-btn");
let counter = 1;
addDraggerBtn.click(function(){
    console.log("lelelelle");
   var dragger = $(`<div class="dragger">${counter}</div>`)
   root.append(dragger);
   var oDragger = new Dragger(dragger);
   counter++;
});

class Dragger{
    constructor(dragger){
        this.el = dragger;
        this.distanceX = 0;
        this.distanceY = 0;
        this.num = counter;
        var thiso = this;
        this.el.mousedown(function(ev){
            ev = ev || window.event;
            console.log("mousedown")
            console.log(ev)
            console.log(ev.clientX, ev.clientY);
            thiso.distanceX = ev.clientX - thiso.el.offset().left;
            thiso.distanceY = ev.clientY - thiso.el.offset().top;
            $(document).mousemove(function(ev){
                ev = ev || window.event;
                console.log("mousemove")
                console.log(thiso.num);
                console.log(ev.clientX,ev.clientY);
                thiso.el.css("left", ev.clientX - thiso.distanceX);
                thiso.el.css("top", ev.clientY - thiso.distanceY);
            })
            $(document).mouseup(function(){
                console.log("mouseup");
                // document.onmousemove = null;
                //document.onmouseup = null;
                $(document).unbind("mousemove");
                $(document).unbind("mouseup");
                //$(document).mousedown(null);
                 //$(document).mousemove(null);
                // $(document).mouseup(null);
            })
            //return false;
        })
       

    }


}


