class App extends HTMLElement {
	#ready = false;
	#updateReady(value) {
		this.#ready = value;
		if (this.#showWaitingForReady) {
			return this.show();
		};
	};
	#showWaitingForReady = false;
	#width = 800;
	#height = 600;
	#title = 'Untitled Window';
	#icon = window.Constants.Icons.Window.window;
	get width() {
		return this.#width;
	};
	set width(value) {
		this.style.width = value;
		this.#width = value;
	};
	get height() {
		return this.#height;
	};
	set height(value) {
		this.style.height = value;
		this.#height = value;
	};
	get title() {
		return this.#title;
	};
	set title(value) {
		this.#title = value;
		this.apptitle.innerHTML = value;
	};
	get icon() {
		return this.#icon;
	};
	set icon(value) {
		this.#icon = value;
		this.appicon.innerHTML = value ? (value.startsWith('<svg') ? value : '<img src="' + value + '">') : window.Constants.Icons.Window.window;
	};
	appicon;
	titlebar;
	appcontrols;
	appContentFrame;
	constructor(srcdoc) {
		super();

		this.style.height = this.#height;
		this.style.width = this.#width;

		this.titlebar = createNode('div', { class: 'app-window-titlebar' });

		this.appicon = createNode('div', { class: 'app-window-titlebar-icon' });
		this.appicon.innerHTML = this.icon;

		this.apptitle = createNode('p', { class: 'app-window-titlebar-title' }, this.title);
		this.titlebar.appendChild(this.appicon);
		this.titlebar.appendChild(this.apptitle);

		this.appcontrols = createNode('div', { class: 'app-window-titlebar-controls' });
		const minimise = createNode('button', {
			class: 'app-window-titlebar-controls-minimise'
		}, window.Constants.Icons.WindowControls.minimise);
		const maximise = createNode('button', {
			class: 'app-window-titlebar-controls-maximise'
		}, window.Constants.Icons.WindowControls.maximise);
		const close = createNode('button', {
			class: 'app-window-titlebar-controls-close'
		}, window.Constants.Icons.WindowControls.close);
		this.appcontrols.appendChild(minimise);
		this.appcontrols.appendChild(maximise);
		this.appcontrols.appendChild(close);

		this.titlebar.appendChild(this.appcontrols);
		this.appendChild(this.titlebar);

		this.appContentFrame = createNode('iframe', { class: 'app-contentframe' });
		this.appContentFrame.allow = 'fullscreen';
		this.appContentFrame.srcdoc = srcdoc;

		this.appendChild(this.appContentFrame);

		const iconsrc = this?.appContentFrame?.contentDocument?.querySelector('link[rel="icon"]')?.getAttribute('href');


		minimise.onclick = this.hide.bind(this);
		maximise.onclick = this.fullscreen.bind(this);
		close.onclick = this.quit.bind(this);

		dragElement(this);
		this.style.display = 'flex';
		this.shadow = true;
		this.#updateReady(true);
		return this;
	};
	/**
	 * Show the app window, and return a promise that fulfills when the app is ready and shown.
	 * Will not show until the app is ready.
	 * @returns {Promise}
	 */
	async show() {
		return new Promise(((resolve, reject) => {
			try {
				this.#showWaitingForReady = true;
				if (this.#ready = true) {
					this.style.display = 'flex';
					document.getElementById('apps-container').appendChild(this);
					this.title = this?.appContentFrame?.contentDocument?.title || this.#title;
				};
				resolve(this);
			} catch (err) {
				reject(err);
			};
		}).bind(this));
	};
	/**
	 * Hide the app window, and return a promise that fulfills when the app is hidden.
	 * @returns {Promise}
	 */
	async hide() {
		return new Promise(((resolve, reject) => {
			try {
				this.style.display = 'none';
				resolve(true);
			} catch (err) {
				reject(err);
			};
		}).bind(this));
	};
	async fullscreen() {
		return this.appContentFrame.requestFullscreen();
	};
	/**
	 * Quit the app, closing the app window, and return a promise that fulfills when the app is no longer running.
	 * @returns {Promise}
	 */
	async quit(code) {
		return new Promise(((resolve, reject) => {
			try {
				const response = this.appContentFrame.contentWindow.dispatchEvent('beforeunload');
				if (response) {
					resolve(true);
				} else {
					reject(false);
				};
			} catch (err) {
				reject(err);
			};
		}).bind(this));
	};
};

customElements.define('app-window', App);