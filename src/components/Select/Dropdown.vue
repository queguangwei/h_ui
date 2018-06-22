<template>
  <div class="h-select-dropdown" :style="styles" @click="handleClick"><slot></slot></div>
</template>
<script>
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
import { getStyle } from '../../util/tools';
const Popper = isServer ? function() {} : require('../../util/popper.js');
export default {
	name: 'Drop',
	props: {
		placement: {
			type: String,
			default: 'bottom-start'
		},
		className: {
            type: String
        },
        dropWidth:{
        	type:[String,Number]
        }
	},
	data () {
		return {
			popper: null,
			width: ''
		};
	},
	computed: {
		styles () {
			let style = {};
			if (this.width) style.width = `${this.width}px`;
			return style;
		}
	},
	methods: {
		handleClick(event){
			this.$emit('click', event);
		},
		update () {
			if (isServer) return;
			if (this.popper) {
				this.$nextTick(() => {
						this.popper.update();
				});
			} else {
				this.$nextTick(() => {
					this.popper = new Popper(this.$parent.$refs.reference, this.$el, {
						gpuAcceleration: false,
						placement: this.placement,
						boundariesPadding: 0,
						forceAbsolute: true,
						boundariesElement: 'body'
					});
					this.popper.onCreate(popper => {
						this.resetTransformOrigin(popper);
					});
				});
			}
			if (this.$parent.$options.name === 'Select'|| this.$parent.$options.name === 'SelectTree' || this.$parent.$options.name === 'SelectTable') {
				if (!this.dropWidth) {
					this.width = parseInt(getStyle(this.$parent.$el, 'width'));
				}else{
					this.width = this.dropWidth;
				}
			}
		},
		destroy () {
			if (this.popper) {
				this.resetTransformOrigin(this.popper);
				setTimeout(() => {
						this.popper.destroy();
						this.popper = null;
				}, 300);
			}
		},
		resetTransformOrigin(popper) {
			let placementMap = {top: 'bottom', bottom: 'top'};
			let placement = popper._popper.getAttribute('x-placement').split('-')[0];
			let origin = placementMap[placement];
			popper._popper.style.transformOrigin = `center ${ origin }`;
		}
	},
	created () {
		this.$on('on-update-popper', this.update);
		this.$on('on-destroy-popper', this.destroy);
	},
	beforeDestroy () {
		if (this.popper) {
			this.popper.destroy();
		}
	}
};
</script>
