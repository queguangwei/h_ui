<template>
  <div ref="container" class="h-select-dropdown" :style="containerStyle">
    <slot></slot>
  </div>
</template>

<script>
import { Popper } from "../../util";
export default {
  props: {
    placement: {
      type: String,
      validator(value) {
        return ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end"].includes(value);
      },
      default: "bottom-start"
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    containerStyle() {
      return {
        display: "none"
      };
    }
  },
  watch: {
    show(newVal) {
      this.update();
    }
  },
  methods: {
    update() {
      const _this = this;
      setStyle(this.$el, { display: "block", visiblity: "hidden" });

      if (this.popper) {
        this.popper.scheduleUpdate();
        return;
      }

      this.$nextTick(() => {
        this.popper = new Popper(this.$parent.$refs.display, this.$el, {
          placement: this.placement,
          modifiers: {
            computeStyle: { gpuAcceleration: false },
            applyStyle: { enabled: false },
            applyVueStyle: {
              enabled: true,
              fn(data) {
                const { show, placement } = _this;
                const { instance, styles } = data;
                const { popper: el } = instance;

                if (show) {
                  setStyle(el, { display: "block", visiblity: "visible", ...styles });
                  el.classList.add(placement.includes("top") ? "slide-down-enter-active" : placement.includes("bottom") && "slide-up-enter-active");
                } else {
                  el.classList.add(placement.includes("top") ? "slide-down-leave-active" : placement.includes("bottom") && "slide-up-leave-active");
                }

                function onAnimationEnd() {
                  el.removeEventListener("animationend", onAnimationEnd);
                  el.classList.remove("slide-up-enter-active", "slide-up-leave-active", "slide-down-enter-active", "slide-down-leave-active");
                  !show && setStyle(el, { display: "none" });
                }
                el.addEventListener("animationend", onAnimationEnd);
              },
              order: 900
            }
          }
        });
      });

      /**
       * Set the style to the given popper
       * @function
       * @ignore
       * @argument {Element} element - Element to apply the style to
       * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
       */
      function setStyle(element, styles) {
        function is_numeric(n) {
          return n !== "" && !isNaN(parseFloat(n)) && isFinite(n);
        }
        Object.keys(styles).forEach(function(prop) {
          var unit = "";
          // add unit if the value is numeric and is one of the following
          if (["width", "height", "top", "right", "bottom", "left"].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
            unit = "px";
          }
          element.style[prop] = styles[prop] + unit;
        });
      }
    }
  }
};
</script>