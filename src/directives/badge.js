import { directiveConfig } from '../util/tools'
//小角标
const dot = 'dot'
function directive (el, binding) {
  const config = directiveConfig(
    binding,
    {
      icon: false,
      left: false,
      inner: false
    }
  )
  if (config.inner) el.classList.add('badge-inner')
  if (config.icon) el.classList.add('badge-icon')
  if (config.left) el.classList.add('badge-left')
  if (config.value == 'dot') el.classList.add('badge-dot')

  if(config.value == 'dot'){
    el.dataset.badge = ''
  }else if(config.value >=100) {
    el.dataset.badge = '99+';
  }else {
    el.dataset.badge=config.value
  }
  el.classList.add('badge')
}

export default {
  bind: directive,
  inserted:directive,
  updated: directive,
  componentUpdated: directive,
  unbind: (el) => {
    el.removeAttribute('data-badge')
    el.classList.remove('badge')
  }
}