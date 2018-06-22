const prefixCls = 'h-picker-panel';
const datePrefixCls = 'h-date-picker';

export default {
    props: {
        confirm: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        iconBtnCls (direction, type = '') {
            return [
                `${prefixCls}-icon-btn`,
                `${datePrefixCls}-${direction}-btn`,
                `${datePrefixCls}-${direction}-btn-arrow${type}`,
            ];
        },
        handleShortcutClick (shortcut) {
            if (shortcut.value) this.$emit('on-pick', shortcut.value());
            if (shortcut.onClick) shortcut.onClick(this);
        },
        handlePickClear () {
            this.resetView();
            this.$emit('on-pick-clear');
        },
        handlePickSuccess () {
            this.resetView();
            this.$emit('on-pick-success');
        },
        handlePickClick () {
            this.$emit('on-pick-click');
        },
        handleSelectRange (val,status) {
            this.$emit('on-select-range',val,status);
        },
        resetView(){
            setTimeout(
                () => this.currentView = this.selectionMode,
                500 // 500ms so the dropdown can close before changing
            );
        },
        handleClear() {
            this.dates = this.dates.map(() => null);
            this.rangeState = {};
            this.$emit('on-pick', this.dates);
            this.handleConfirm();
            //  if (this.showTime) this.$refs.timePicker.handleClear();
        },
        handleConfirm(visible) {
            this.$emit('on-pick', this.dates, visible);
        },
        onToggleVisibility(open){
            const {timeSpinner, timeSpinnerEnd} = this.$refs;
            if (open && timeSpinner) timeSpinner.updateScroll();
            if (open && timeSpinnerEnd) timeSpinnerEnd.updateScroll();
        }
    }
};
