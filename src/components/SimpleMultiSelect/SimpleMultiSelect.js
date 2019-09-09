import SelectTable from "../SelectTable/SelectTable.vue";
import _ from "../../util";
export default {
  name: "SimpleMultiSelect",
  mixins: [SelectTable],
  props: {
    block: {
      default: true
    },
    newSearchModel: {
      type: Boolean,
      default: true
    },
    accuFilter: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    isString: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedResult: "",
      isCopy: false,
      newSearchCheckAll: false,
      newSearchUnCheckAll: false,
      isResetField: false,
      isEnterhide: false
    };
  },
  methods: {
    showdrop() {
      return;
    },
    handleFocus(e) {
      e.target.selectionStart = 0;
      e.target.selectionEnd = this.selectedResult.length;
    },
    handleSearchBlur() {
      this.selectedResult = this.selectedMultiple.map(item => item.label).join();
    },
    keyup() {
      return;
    },
    handleKeydown(e) {
      if (_.isKeyMatch(e, "Esc")) {
        this.hideMenu();
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }

      if (this.visible) {
        if (_.isKeyMatch(e, "Enter")) {
          e.preventDefault();
          this.hideMenu();
          this.$nextTick(() => {
            this.$refs.input.focus();
          });
        }

        if (window.isO45) {
          if (_.isKeyMatch(e, "Down")) {
            e.preventDefault();
            this.navigateOptions("next");
          }
          if (_.isKeyMatch(e, "Up")) {
            e.preventDefault();
            this.navigateOptions("prev");
          }
          if (_.isKeyMatch(e, "Space")) {
            e.preventDefault();
            const index = this.focusIndex - 1;
            if (index < 0) {
              return false;
            }

            // 设置 focusInit 后直接回车取不到 focusValue
            if (!this.focusValue) {
              this.focusValue = this.availableOptions[index].value;
            }
            if (this.availableOptions[index].disabled) {
              return;
            }

            if (this.isBlock) {
              const optionitem = this.options.filter(item => item.value === this.focusValue);
              this.selectBlockMultiple(this.focusValue, optionitem[0]);
              this.$nextTick(() => {
                this.handleSearchBlur();
                this.filterable && this.$refs.input.focus();
              });
              return;
            }

            this.findChild(child => {
              if (!this.multiple) {
                child.$refs.table.enterSingle(index, true);
              } else {
                child.$refs.table.enterSelect(index, true);
              }
            });
          }
          return false;
        }
      }

      if (this.visible || this.isInputFocus) {
        this.handleBack(e);
      }
    },
    broadcastQuery(keyword) {
      this.broadcast("Block", "on-query-change", keyword);
      if (this.isSelectFilter) {
        this.findChild(({ cloneData }) => {
          this.selectHead = cloneData.length > 0 && cloneData.every(({ selected, hidden }) => selected && !hidden);
        });
      }
    }
  },
  watch: {
    selectedResult(val, oldVal) {
      const multipleAry = this.selectedMultiple.map(item => item.label);
      const resultAry = val === "" ? [] : val.split(",");
      const keywords = resultAry.filter(item => !multipleAry.includes(item));

      if (this.isCopy) {
        this.$emit("on-paste", { oldval: oldVal, newval: val });
        this.isCopy = false;
        return;
      }

      if (this.newSearchCheckAll) {
        this.newSearchCheckAll = false;
        return;
      }

      if (this.newSearchUnCheckAll) {
        this.newSearchUnCheckAll = false;
        return;
      }

      if (this.isMultiSpecial) {
        this.isMultiSpecial = false;
        return;
      }

      if (this.isResetField) {
        this.isResetField = false;
      }

      if (oldVal != "" && val == "" && this.model.length > 0) {
        this.model = [];
        return;
      }

      // sync selectedMultiple
      this.newModelSearchDelete(multipleAry);

      // run newModelhandleSearch
      if (keywords.length > 0) {
        this.newModelhandleSearch(keywords[keywords.length - 1]);
      }
    },
    isResetField(newVal) {
      if (newVal && this.newSearchModel && !this.visible) {
        this.selectedResult = this.selectedMultiple.map(item => item.label).join();
      }
    },
    dropVisible(newVal) {
      // run search bar handler on fold
      if (!newVal) {
        this.handleSearchBlur();
        this.focusIndex = this.focusInit;
      }
    }
  }
};
