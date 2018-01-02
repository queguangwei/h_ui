import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
// 判断变量类型
// 注：typeof及instanceof仅针对简单变量
function is(type, val) {
    if (val && val != '') {
        return Object.prototype.toString.call(val) === ("[object " + type + "]");
    }
}
export { is };
// 查找组件的父组件
function findComponentParent(content, componentName, componentNames) {
    if (is("String", componentName)) {
        componentNames = [componentName]
    } else {
        componentNames = componentName
    }
    let parent = content.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) {
            name = parent.$options.name;
        }
    }
    return parent
}
export { findComponentParent };
// 查找子组件
function findComponentChildren(content, componentName) {
    let childrens = content.$children;
    let children = null;
    if (childrens.length) {
        for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i];
            const name = child.$options.name
            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentChildren(child, componentName);
                if (children) break;
            }
        }

    }
    return children;
}
export { findComponentChildren }
// 查找所有子组件
function findComponentsChildren(content, componentName) {
    let childrens = content.$children;
    let childrenComponents = [];
    if (childrens.length) {
        childrens.forEach(child => {
            let name = child.$options.name
            if (name === componentName) {
                childrenComponents.push(child)
            }
            let childCh = child.$children
            if (childCh.length) {
                let findChildCh = findComponentsChildren(child, componentName)
                if (findChildCh) {
                    childrenComponents.concat(findChildCh)
                }

            }
        })
    }
    return childrenComponents
}
export { findComponentsChildren }
// 特殊字符匹配 :-_
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
// 对mozilla进行特殊判断，即firefox
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

// 将:-_等变成驼峰式，如foo-bar变成fooBar
function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        // 开头的不大写，其余的大写，转成驼峰式
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1'); //对moz进行特殊处理
}

// 监测DOM变化
export const MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || false;

function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}
