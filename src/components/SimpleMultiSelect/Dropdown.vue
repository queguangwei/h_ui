<template>
  <div ref="container" class="h-select-dropdown" style="display: none;">
    <slot></slot>
  </div>
</template>

<script>
import { Popper } from "../../util";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      validator(value) {
        return ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end"].includes(value);
      },
      default: "bottom-start"
    },
    autoPlacement: {
      type: Boolean,
      default: false
    },
    dropWidth: {
      type: [String, Number],
      default: 0
    },
    maxDropWidth: {
      type: [String, Number],
      default: 500
    },
    widthAdaption: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(newVal) {
      this.allowAnimation = true;
      this.update();
    }
  },
  methods: {
    update() {
      const _this = this;
      setStyle(this.$el, { display: "block", visiblity: "hidden" }); // make sure popper calc exactly

      if (this.popper) {
        this.popper.scheduleUpdate();
        return;
      }

      this.$nextTick(() => {
        const placement = (() => {
          if (this.autoPlacement) {
            const { top, bottom, height } = this.$parent.$el.getBoundingClientRect();
            const wh = window.innerHeight;
            return wh - top - height < 210 ? "top-start" : "bottom-start";
          } else {
            return ["top", "bottom"].includes(this.placement) ? `${this.placement}-start` : this.placement;
          }
        })();

        this.popper = new Popper(this.$parent.$refs.display, this.$el, {
          placement,
          eventsEnabled: false, // Whether events (resize, scroll) are initially enabled.
          modifiers: {
            flip: { enabled: false }, // Modifier used to flip the popper’s placement when it starts to overlap its reference element.
            computeStyle: {
              gpuAcceleration: false // If true, it uses the CSS 3D transformation to position the popper. Otherwise, it will use the top and left properties
            },
            applyStyle: { enabled: false },
            applyVueStyle: {
              enabled: true,
              fn(data) {
                const { show, allowAnimation, dropWidth, maxDropWidth, widthAdaption } = _this;
                const {
                  instance: { popper: el },
                  offsets: {
                    popper: { width: cWidth },
                    reference: { width: pWidth }
                  },
                  styles
                } = data;

                if (widthAdaption) {
                  if (parseFloat(dropWidth) > 0) {
                    styles["min-width"] = parseFloat(dropWidth);
                  }
                  if (parseFloat(maxDropWidth) > 0 && parseFloat(maxDropWidth) > parseFloat(dropWidth)) {
                    styles["max-width"] = Math.max(parseFloat(maxDropWidth), pWidth);
                  } else {
                    styles["max-width"] = Math.max(parseFloat(dropWidth), pWidth);
                  }
                } else {
                  styles.width = parseFloat(dropWidth) || pWidth;
                }

                if (show) {
                  setStyle(el, { display: "block", visiblity: "visible", ...styles });
                  if (allowAnimation) {
                    el.classList.add(placement.includes("top") ? "slide-down-enter-active" : placement.includes("bottom") && "slide-up-enter-active");
                  }
                } else {
                  el.classList.add(placement.includes("top") ? "slide-down-leave-active" : placement.includes("bottom") && "slide-up-leave-active");
                }

                function onAnimationEnd() {
                  el.removeEventListener("animationend", onAnimationEnd);
                  el.classList.remove("slide-up-enter-active", "slide-up-leave-active", "slide-down-enter-active", "slide-down-leave-active");
                  if (!show) {
                    setStyle(el, { display: "none" });
                    _this.$emit("on-hide"); // emit on animation end and dropdown panel hidden
                  }
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
          if (["width", "max-width", "min-width", "height", "top", "right", "bottom", "left"].indexOf(prop) !== -1 && is_numeric(styles[prop])) {
            unit = "px";
          }
          element.style[prop] = styles[prop] + unit;
        });
      }
    }
  },
  mounted() {
    // update without animation on dropdown panel is visible
    this.$on("on-static-update", data => {
      if (this.show) {
        this.allowAnimation = false;
        this.update();
      }
    });
  }
};
</script>