class Controls {
	static Button = class Button extends HTMLButtonElement {
		/**
		 * @param {('inline'|'block')} spacing
		 * @param {window.Constants.Icons|string} inner
		 * @param {Function} onclick
		 */
		constructor(spacing = 'inline', inner = 'Click me!', onclick) {
			super();

			if (inner) {
				this.innerHTML = inner;
				if (typeof inner === 'string' && (inner.startsWith('<svg') || inner.startsWith('<img'))) {
					this.setAttribute('controls-button-type', 'icon');
				};
			};

			this.setAttribute('is', 'controls-button');

			this.setAttribute('controls-alignment', spacing);
			this.addEventListener('click', onclick);
		};
	};
	static Slider = class Slider extends HTMLInputElement {
		/**
		 * @param {('inline'|'block'|'inline-block')} spacing
		 * @param {Number} min
		 * @param {Number} max
		 * @param {Number} value
		 * @param {Function} onmove
		 */
		constructor(spacing = 'inline', min = 0, max = 100, value = 0, onmove) {
			super();

			this.type = 'range';

			this.min = min || this.getAttribute('min');
			this.max = max || this.getAttribute('max');
			this.value = value || this.getAttribute('value');

			this.setAttribute('is', 'controls-slider');

			this.classList.add('controls-slider');
			this.classList.add('controls-spacing-' + spacing);

			this.addEventListener('input', onmove);
		};
	};
};

customElements.define('controls-button', Controls.Button, { extends: 'button' });
customElements.define('controls-slider', Controls.Slider, { extends: 'input' });