import { createStore } from 'redux';
//web应用是一个状态机，视图与状态是一一对应的
//所有的状态 保存在一个对象里面

//reducer
//Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
//Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
//store.dispatch方法会触发 Reducer 的自动执行。
//为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法

//Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出
//最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。Object.assign()
//这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象
function counter(state={value:0},action){
    let {type} = action;
    switch(type){
        case 'INCREMENT':
            return Object.assign({}, state ,{
                value: state.value+6
            });
        default :
            return state;
    }
}
//创建store
//store是保存数据的地方，你可以把他看成一个容器。整个应用只能有一个store
let store = createStore(counter);

//触发
//State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。
//Action 就是 View 发出的通知，表示 State 应该要发生变化了。
//Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置

//store.dispatch是view发出action的唯一方法
//store.dispatch接受一个 Action 对象作为参数，将它发送出去
$(document).click(()=>{
    store.dispatch({
        type: 'INCREMENT',
        value: 6
    });
})
//订阅
//store对象包涵所有数据，如果想得到某个时点的数据，就要对store生成快照。
//这种时点的数据集合叫state，当前时刻的state可以通过store.getState()拿到
//Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
//显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入subscribe的参数函数里，就会实现 View 的自动渲染。
//store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

let curt = store.getState();
store.subscribe(()=>{
    let pre = curt;
    curt = store.getState();
    console.log(pre,curt, pre==curt);
})