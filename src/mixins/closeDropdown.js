export default {
  mounted() {
    // if(window['eventObj'] == null) {
    //   window['eventObj'] = new CustomEvent('eventName', {
    //     detail: { title: 'closeDropdownEvent'},
    //   });
    // }
    // window.addEventListener(window['eventName'], ()=>{
    //   console.log('alert')
    // }, false)

    // window.customEvent = document.createEvent('Event')
    // window.customEvent.initEvent('closeDropdown', false, false)
    // 场外-表格内render的下拉框在弹出后滚动收起，以解决设置transfer滚动时下拉框不跟随表格移动
    if(window.isOIS) {
      window.addEventListener('closeDropdown', ()=> {
        this.fold()
      }, false)
    }
  }
}
