export const SingleSelectApi = {
  props: {
    animated: {
      type: Boolean,
      default: true
    },
    accuFilter: {
      type: Boolean,
      default: true
    },
    // Block中判断用
    isSingleSelect:{
      type:Boolean,
      default:true,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: [String, Number, Array],
      default: ''
    },
    placeholder: {
      type: String
    },
    remote: {
      type: Boolean,
      default: false
    },
    remoteMethod: {
      type: Function,
      default(key, done) {
        done()
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String
    },
    labelInValue: {
      type: Boolean,
      default: false
    },
    placement: {
      validator(value) {
        return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'].includes(value)
      },
      default: 'bottom'
    },
    width: {
      type: [String, Number]
    },
    transfer: {
      type: Boolean,
      default: false
    },
    autoPlacement: {
      type: Boolean,
      default: false
    },
    widthAdaption: {
      type: Boolean,
      default: false
    },
    dropWidth: {
      type: [String, Number]
    },
    maxDropWidth: {
      type: [String, Number],
      default: 500
    },
    keepInputValue: {
      type: Boolean,
      default: false
    },
    showFirstLabelOnly: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: [String, Number],
      default: 0,
      validator(value) {
        let num = parseInt(value)
        return num <= 32767 && num >= -1
      }
    }
  },
  methods: {
    //外部调用收起下拉面板
    fold() {
      this.visible = false
    }
  }
}
