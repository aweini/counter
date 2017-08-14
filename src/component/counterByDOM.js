let root = $("#root")
let addCounterBtn = $(".add-counter-btn");
let num = 0;
addCounterBtn.click(function(){
    var counterBox = $(` <div class="counterBox"></div>`);
    var counter = new Counter(counterBox);
    counter.init(root,counterBox);
});

class Counter{
    constructor(counterBox){
        var panel = $(`<div class="panel">
            <button class="addCounter"></button>
            <div class="counterPanel">
            </div>
        </div>`);
        var dashboard = $(`<div class="dashboard">
            <div class="allSel line"><span class="key">HasAll:</span> <span class="val">false</span></div>
            <div class="maximum line"><span class="key">Maximum:</span> <span class="val">null</span></div>
            <div class="allCount line"><span class="key">AllCount:</span> <span class="val">0</span></div>
        </div>`);
        var counter = $(`<div class="counter">
                    <button class="sub"></button>
                    <span class="value">0</span>
                    <button class="add"></button>
                    <button class="addIfOdd"></button>
                    <button class="addAsync"></button>
                </div>`);
        this.el = counterBox;
        counterBox.append(panel, dashboard);
        this.addCounter = counterBox.find(".addCounter");
        this.counterPanel = counterBox.find(".counterPanel");
        this.maximum = dashboard.find(".maximum .val");
        this.allSel = dashboard.find(".allSel .val");
        this.allCount = dashboard.find(".allCount .val");
        //先执行这个num为0，在init
        this.num = num;
        this.counters = [];
        this.calcMax = this.calcMax.bind(this);
        this.calcCount = this.calcCount.bind(this);
        this.calcSel = this.calcSel.bind(this);
        this.asyncState = this.asyncState.bind(this);

        let thiso = this;
        this.addCounter.click(function(){
            console.log(thiso.num);
            let counterContent = counter.clone();
            thiso.counterPanel.append(counterContent);
            var counterDetail = new CounterDetail(counterContent,thiso);
            thiso.counters.push(counterDetail);
            thiso.asyncState();
        });

       
    }
    init(root,counterBox){
        root.append(counterBox);
        num++;
    }
    calcMax(){
        let max = this.counters.slice().sort((a,b)=> b.value - a.value)[0].value;
        this.maximum.text(max);
    }
    calcSel(){
        let sel = this.counters.every(el=>el.value!==0)
        this.allSel.text(sel);
    }
    calcCount(){
        let val = this.counters.reduce((all, el)=> all+el.value, 0)
        this.allCount.text(val)
    }
    asyncState(){
        this.calcCount();
        this.calcMax();
        this.calcSel();
    }
}

class CounterDetail{
    constructor(counterContent,parent){
        this.el = counterContent;
        this.value = 0;
        this.addBtn = this.el.find(".add");
        this.subBtn = this.el.find(".sub");
        this.addIfOddBtn = this.el.find(".addIfOdd");
        this.addAsyncBtn = this.el.find(".addAsync");
        this.valueSpan = this.el.find(".value");
        this.parent = parent;
        var thiso = this;
        // this.addBtn.click(function(){
        //     thiso.value++;
        //     thiso.valueSpan.text(thiso.value);
        //     let max = parent.counters.slice().sort((a,b)=> b.value - a.value)[0].value;
        //     thiso.maximum.text(max);
        // })
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.addIfOdd = this.addIfOdd.bind(this);
        this.addAsync = this.addAsync.bind(this);

        this.addBtn.click(this.increment);
        this.subBtn.click(this.decrement);
        this.addIfOddBtn.click(this.addIfOdd);
        this.addAsyncBtn.click(this.addAsync);
    }

    increment(){
        this.value++;
        this.valueSpan.text(this.value);
        //this.parent调用this还是this.parent
        this.parent.asyncState();
    }

    decrement(){
        this.value--;
        this.valueSpan.text(this.value);
        this.parent.asyncState();
    }
    addIfOdd(){
        if(this.value%2!=0){
            this.value++;
            this.valueSpan.text(this.value);
            this.parent.asyncState();
        }
    }
    addAsync(){
        setTimeout(()=>{
            this.valueSpan.text(++this.value);
            this.parent.asyncState();
        },1000)
    }
    
}
