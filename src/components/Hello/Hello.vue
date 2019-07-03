<template>
  <div :class="helloclass">
    {{msg}}
  </div>
</template>

<script>
const prefixCls = 'v-hello';
export default {
  name: 'Hello',
  data(){
    return {
      msg: 'hello jane !'
    }
  },
  created () {
    this.msg = 'bye!'
  },
  computed:{
    helloclass(){
      return `${prefixCls}-hello`
    }
  }

}
// 支持多层then链式调用(then中可返回新的promise进行异步流控制)，支持catch及finally
function Promise2(fn) {
  this.onFulfilledCb = null
  this.onRejectedCb = null
  this.onFinallyCb = null
  this.onCatchCb = null
  this.thenResultPromise = null
  this.promiseValue = null
  this.promiseStatus = 'pending' // pending, fulfilled, rejected
  this.timer = null
  var _this = this
  var resolve = function(data) {
    _this.promiseValue = data
    try {
      _this.onFulfilledCb &&
        (_this.thenResultPromise = _this.onFulfilledCb(data))
    } catch (e) {
      _this.onCatchCb && _this.onCatchCb(e)
    }
    _this.onFinallyCb && _this.onFinallyCb()
    _this.promiseStatus = 'fulfilled'
  }

  var reject = function(error) {
    _this.promiseValue = error
    try {
      _this.onRejectedCb
        ? (_this.thenResultPromise = _this.onRejectedCb(error))
        : _this.onCatchCb && _this.onCatchCb(error) // 不处理reject的数据会被catch到的
    } catch (e) {
      _this.onCatchCb && _this.onCatchCb(e)
    }
    _this.onFinallyCb && _this.onFinallyCb()
    _this.promiseStatus = 'rejected'
  }

  if (typeof fn === 'function') {
    // 异步回调串联
    fn(resolve, reject)
  } else {
    resolve()
  }
}

Promise2.prototype = {
  then: function(onFulfilled, onRejected) {
    var _this = this
    onFulfilled && (_this.onFulfilledCb = onFulfilled)
    onRejected && (_this.onRejectedCb = onRejected)
    return new Promise2(function(resolve2, reject2) {
      _this.timer = setInterval(function() {
        // 使用轮循的方式检测then的两个参数函数返回的promise是否已经fulfilled或者rejected
        try {
          if (
            _this.promiseStatus !== 'pending' &&
            _this.thenResultPromise.promiseStatus !== 'pending'
          ) {
            if (_this.thenResultPromise.promiseStatus === 'fulfilled') {
              resolve2(_this.thenResultPromise.promiseValue)
            } else if (
              _this.thenResultPromise.promiseStatus === 'rejected'
            ) {
              reject2(_this.thenResultPromise.promiseValue)
            }
            _this.timer && clearInterval(_this.timer)
          }
        } catch (e) {
          reject2(e)
          _this.timer && clearInterval(_this.timer)
        }
      }, 10)
    })
  },
  catch: function(onCatch) {
    this.onCatchCb = onCatch
    return this // 实现链式调用
  },
  finally: function(onFinally) {
    this.onFinallyCb = onFinally
  }
}
/****************** 测试数据 *******************/
var myPromise = new Promise2(function(resolve, reject) {
  // 当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
  // 在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
  console.log('----------------- 流程开始 --------------------')
  setTimeout(function() {
    resolve('promise初始化resolve成功!') // 代码正常执行！
  }, 500)
})
myPromise
  .then(function(successMessage) {
    return new Promise2(function(resolve, reject) {
      setTimeout(function() {
        console.log(
          'myPromise then 1 收到 resolveMessage:' + successMessage
        )
        reject('from then 1')
      }, 3000)
    })
  })
  .then(
    function(successMessage) {
      return new Promise2(function(resolve, reject) {
        setTimeout(function() {
          console.log(
            'myPromise then 2 收到 resolveMessage:' + successMessage
          )
          resolve('from then 2')
        }, 2000)
      })
    },
    function(failMessage) {
      return new Promise2(function(resolve, reject) {
        setTimeout(function() {
          console.log(
            'myPromise then 2 收到 rejectMessage:' + failMessage
          )
          resolve('from then 2')
        }, 1000)
      })
    }
  )
  .then(function(successMessage) {
    return new Promise2(function(resolve, reject) {
      setTimeout(function() {
        console.log(
          'myPromise then 3 收到 resolveMessage:' + successMessage
        )
        reject('from then 3')
      }, 1000)
    })
  })
  .catch(function(error) {
    console.log('caught rejected data:')
    console.log(error)
  })
  .finally(function() {
    console.log('-----------全部处理完毕！-----------')
  })
</script>
