<template>
    <form :class="classes"><slot></slot></form>
</template>
<script>
    import { oneOf } from  '../../util/tools';

    const prefixCls = 'h-form';

    export default {
        name: 'Form',
        props: {
            model: {
                type: Object
            },
            rules: {
                type: Object
            },
            labelWidth: {
                type: Number
            },
            labelPosition: {
                validator (value) {
                    return oneOf(value, ['left', 'right', 'top']);
                },
                default: 'right'
            },
            inline: {
                type: Boolean,
                default: false
            },
            showMessage: {
                type: Boolean,
                default: true
            },
            cols: {
                type: [String, Number]
            }
        },
        data () {
            return {
                fields: []
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-label-${this.labelPosition}`,
                    {
                        [`${prefixCls}-inline`]: this.inline,
                        [`${prefixCls}-row`]: this.cols && parseInt(this.cols) <= 12,
                    }
                ];
            }
        },
        methods: {
            resetFields() {
                this.fields.forEach(field => {
                    field.resetField();
                });
            },
            validate(callback) {
                let valid = true;
                let count = 0;
                this.fields.forEach(field => {
                    if (field.$children && field.$children.length > 0) {
                        for(let fidleChild of field.$children) {
                            if (fidleChild.disabled) {
                                return 
                            }
                        }
                    }
                    field.validate('', errors => {
                        if (errors) {
                            valid = false;
                        }
                        if (typeof callback === 'function' && ++count === this.fields.length) {
                            callback(valid);
                        }
                    });
                });
            },
            validateField(prop, cb) {
                const field = this.fields.filter(field => field.prop === prop)[0];
                if (!field) { throw new Error('[HUI warn]: must call validateField with valid prop string!'); }

                field.validate('', cb);
            }
        },
        watch: {
            rules() {
                this.validate();
            }
        },
        created () {
            this.$on('on-form-item-add', (field) => {
                if (field) this.fields.push(field);
                return false;
            });
            this.$on('on-form-item-remove', (field) => {
                if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
                return false;
            });
        }
    };
</script>
