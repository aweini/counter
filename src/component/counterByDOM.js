$root = $('#root')
$addCounter = $(".addCounter")

class Counter {
    //
    constructor(){
        this.el = `<div class="counterBox" style="margin: 40px;">
            <div class="panel">
                <button class="addCounter"></button>
                <div class="counterPanel">
                    <div class="counter">
                        <button class="sub"></button>
                        <span>0</span>
                        <button class="add"></button>
                        <button class="addIfOdd"></button>
                        <button class="addAsync"></button>
                    </div>
                    
                </div>
            </div>

            <div class="dashboard">
                <div class="allSel line"><span class="key">HasAll:</span> <span class="val">false</span></div>
                <div class="maximum line"><span class="key">Maximum:</span> <span class="val">null</span></div>
                <div class="allCount line"><span class="key">AllCount:</span> <span class="val">0</span></div>
            </div>
        </div>`
       // rooter.append(this.el);
    }

    init(){
        return this.el;
    }
    
}

var counter1 = new Counter();
$root.append(counter1.init());