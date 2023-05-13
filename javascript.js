'use strict';

// how to run
// '<script src="./javascript.js"></script>' in .html
// 'node ./javascript.js' in shell

// switch
let switch_var = 2;
switch (switch_var) {
    case 1: 
        console.log(1);
        break;
    case 2: {
        console.log(2);
        break;
    }
    case 3: console.log(3); break;
    default:
        console.log('not in');
        break;
}

// closure simulated class
// ...

// class
// ...

// closure simulated module
// ...

// iterator
// ...

// async iterator
// ...

// 元编程+proxy
// ...



class EventBus {
    constructor() {
        this.map = new Map();
    }

    on(event, fn) {
        if (this.map.has(event)) {
            this.map.get(event).push(fn);
        }
        else {
            this.map.set(event, [fn]);
        }
    }

    emit(event, payload) {
        if (this.map.has(event)) {
            this.map.get(event).forEach(e => {
                e(payload);
            });
        }
        else {
            console.log('wrong');
        }

    }

    off(event) {
        if (this.map.has(event)) {
            this.map.set(event, []);
        }
        else {
            console.log('wrong');
        }
        

    }
}

let bus = new EventBus();
bus.on("click", (e) => console.log(e));
bus.on("click", () => console.log('HEHE'));
bus.emit('click', "payload");
bus.off('click');


Function.prototype.newCall = function (ctx, ...args) {
    ctx.fn = this;
    let result = ctx.fn(...args);
    delete ctx.fn;
    return result;
}
Function.prototype.newBind = function (ctx, ...args) {
    ctx.fn = this;

    return function (...inArgs) {
        return ctx.fn(...args, ...inArgs);
    }
}


function diy(y) {
    return this.x + y;
}
console.log(diy.call({ x: 1 }, 100));
console.log(diy.apply({ x: 1 }, [100]));
let bindDiy = diy.bind({ x: 1 });
console.log(bindDiy(100));

console.log('......');
console.log(diy.newCall({ x: 1 }, 100));
let newBindDiy = diy.newBind({ x: 1 }, 100, 200);
console.log(newBindDiy());

let a = () => this.x;
console.log(a.newCall({ x: 1 }));


function trueCurrying(fn, ...args) {

    if (args.length >= fn.length) {

        return fn(...args)

    }

    return function (...args2) {

        return trueCurrying(fn, ...args, ...args2)

    }
}


function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(this, args);
        }, delay)
    }

}
function throttling(fn, delay) {
    let flag = true;
    return function(...args) {
        if (flag) {
            flag = false;
            setTimeout(function() {
                fn.apply(this, args);
                flag = true;
            }, delay)
        }
    }

}


function fn() {
    console.log("hehe");
}

