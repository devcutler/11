class Flyout extends HTMLElement {
	open() {
		this.style[this.getAttribute('fold')] = this.getAttribute('fold') !== 'bottom' ? '0px' : '48px';

		document.addEventListener('click', this.focusListener);
	};
	close() {
		this.style[this.getAttribute('fold')] =
			`calc(0px - ${this.getBoundingClientRect()[
			(this.getAttribute('fold') === 'left' ||
				this.getAttribute('fold') === 'right')
				? 'width' : (
					(this.getAttribute('fold') === 'top' ||
						this.getAttribute('fold') === 'bottom') ? 'height' : 'width')
			]}px - calc(${window.getComputedStyle(this).margin
			} + ${window.getComputedStyle(this).margin
			}))`;
	};
	focusListener = function focusListener(event) {
		if (!this.contains(event.target)) {
			document.removeEventListener('click', this.focusListener);
			this.close();
		};
	}.bind(this);
};

customElements.define('controls-flyout', Flyout);