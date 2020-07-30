<template>
	<div class="cl-scroll" ref="container" @wheel.prevent="handleScroll">
		<div class="scroll-wrapper" ref="wrapper" :style="{ left: left + 'px' }">
			<slot></slot>
		</div>
	</div>
</template>

<script>
const padding = 15;

export default {
	name: "cl-scroll",

	data() {
		return {
			left: 0
		};
	},

	methods: {
		handleScroll(e) {
			const eventDelta = e.wheelDelta || -e.deltaY * 3;
			const $container = this.$refs.container;
			const $containerWidth = $container.offsetWidth;
			const $wrapper = this.$refs.wrapper;
			const $wrapperWidth = $wrapper.offsetWidth;

			if (eventDelta > 0) {
				this.left = Math.min(0, this.left + eventDelta);
			} else {
				if ($containerWidth - padding < $wrapperWidth) {
					if (this.left < -($wrapperWidth - $containerWidth + padding)) {
						this.left = this.left;
					} else {
						this.left = Math.max(
							this.left + eventDelta,
							$containerWidth - $wrapperWidth - padding
						);
					}
				} else {
					this.left = 0;
				}
			}
		},
		moveToTarget($target) {
			const $container = this.$refs.container;
			const $containerWidth = $container.offsetWidth;
			const $targetLeft = $target.offsetLeft;
			const $targetWidth = $target.offsetWidth;

			if ($targetLeft < -this.left) {
				// tag in the left
				this.left = -$targetLeft + padding;
			} else if (
				$targetLeft + padding > -this.left &&
				$targetLeft + $targetWidth < -this.left + $containerWidth - padding
			) {
			} else {
				// tag in the right
				this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.cl-scroll {
	white-space: nowrap;
	position: relative;
	overflow: hidden;
	width: 100%;

	.scroll-wrapper {
		position: absolute;
	}
}
</style>
