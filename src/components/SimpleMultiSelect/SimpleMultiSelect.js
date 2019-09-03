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
      newSearchModelselectItem: {},
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
    focus() {
      /// ???
      if (this.disabled || this.readonly) return;
      this.$nextTick(() => {
        this.isInputFocus = true;
        this.$refs.input.focus();
      });
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

      this.isEnterhide = false;
      if (this.visible) {
        if (_.isKeyMatch(e, "Enter")) {
          e.preventDefault();
          this.hideMenu();
          this.$nextTick(() => {
            this.$refs.input.focus();
            this.isEnterhide = true;
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
              this.handkeSearchBlur();
              this.selectBlockMultiple(this.focusValue, optionitem[0]);
              if (this.filterable) {
                this.$nextTick(() => {
                  this.$refs.input.focus();
                });
              }
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
    }
  },
  watch: {
    selectedResult(val, oldVal) {
      let searchkey = "";
      let selectAry = val.split(",");
      // let oldselectAry=oldVal.split(",");
      let multipleAry = [];
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
        return;
      }
      if (oldVal != "" && val == "" && this.model.length > 0) {
        this.model = [];
        return;
      }
      if (oldVal + "," == val) {
        searchkey = ",";
        this.newModelhandleSearch(searchkey);
        return;
      }
      this.selectedMultiple.forEach(item => {
        multipleAry.push(item["label"]);
      });
      //if(this.isSearchDelete){
      this.newModelSearchDelete(multipleAry);
      // }
      for (let i = 0; i < selectAry.length; i++) {
        if (multipleAry.indexOf(selectAry[i]) < 0) {
          searchkey = selectAry[i];
        }
      }
      if (searchkey == "" && multipleAry.length < selectAry.length) {
        searchkey = selectAry[selectAry.length - 1];
      }
      if (searchkey == "") {
        return;
      }
      this.newModelhandleSearch(searchkey);
    },
    newSearchModelselectItem(changeitem) {
      if (!changeitem) return;
      let label = changeitem["label"];
      let selectVal = changeitem["value"];
      let selectAry = this.selectedResult
        .trim()
        .replace(/^,*|,*$/g, "")
        .split(",");
      let index = selectAry.indexOf(label);
      if (index >= 0) {
        selectAry.splice(index, 1);
      } else {
        if (this.specialIndex) {
          if (selectVal == this.specialVal) {
            selectAry = [];
          }
        }
        selectAry.push(label);
      }
      let str = selectAry.join(",");
      if (str.substr(0, 1) == ",") {
        str = str.substr(1);
      }
      this.selectedResult = str;
    },
    isResetField() {
      if (this.newSearchModel && !this.visible) {
        let multipleAry = [];
        this.selectedMultiple.forEach(item => {
          multipleAry.push(item["label"]);
        });
        this.selectedResult = multipleAry.join(",");
      }
    }
  }
};
