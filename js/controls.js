class Controls {
	static Button = class Button extends HTMLButtonElement {
		/**
		 * @param {('inline'|'block'|'inline-block')} spacing
		 * @param {window.Constants.Icons|string} inner
		 * @param {Function} onclick
		 */
		constructor(spacing = 'inline', inner = 'Click me!', onclick) {
			super();

			this.innerHTML = inner;

			this.classList.add('controls-button');
			this.classList.add('controls-spacing-' + spacing);
			this.addEventListener('click', onclick);
		};
	};
	static Slider = class Slider extends HTMLInputElement {
		/**
		 * @param {('inline'|'block'|'inline-block')} spacing
		 * @param {Number} min
		 * @param {Number} max
		 * @param {Number} first
		 * @param {Function} onmove
		 */
		constructor(spacing = 'inline', min = 0, max = 100, first = 0, onmove) {
			super();

			this.type = 'range';

			this.min = min;
			this.max = max;
			this.value = first;

			this.classList.add('controls-slider');
			this.classList.add('controls-spacing-' + spacing);

			this.addEventListener('input', onmove);
		};
	};
};

customElements.define('controls-button', Controls.Button, { extends: 'button' });
customElements.define('controls-slider', Controls.Slider, { extends: 'input' });