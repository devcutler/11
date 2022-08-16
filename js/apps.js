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
	#theme = 'dark';
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
		if (value) {
			if (value.startsWith('<svg')) {
				const svgnode = window.SYSTEM.DOMPARSER.parseFromString(value, 'image/svg+xml').documentElement;
				this.appicon.replaceChildren(svgnode);
				this.#icon = svgnode;
			} else {
				const imgnode = createNode('img', { src: value });
				this.appicon.replaceChildren(imgnode);
				this.#icon = imgnode;
			};
		} else if (value === null || value === undefined) {
			const svgnode = window.SYSTEM.DOMPARSER.parseFromString(window.Constants.Icons.Window.window, 'image/svg+xml').documentElement;
			this.appicon.replaceChildren(svgnode);
			this.#icon = svgnode;
		};
	};
	get theme() {
		return this.#theme;
	};
	set theme(value) {
		if (value === 'dark') {
			this.appContentFrame.contentDocument.body.classList.add('dark');
			return this.#theme = value;
		} else if (value === 'light') {
			this.appContentFrame.contentDocument.body.classList.remove('dark');
			return this.#theme = value;
		} else {
			return new SyntaxError('Invalid theme name.');
		};
	};
	appicon;
	titlebar;
	appcontrols;
	appContentFrame;
	constructor(id, srcORsrcdoc, title, icon) {
		super();

		this.id = id;

		this.style.height = this.#height;
		this.style.width = this.#width;

		this.titlebar = createNode('div', { class: 'app-window-titlebar' });

		this.appicon = createNode('div', { class: 'app-window-titlebar-icon' });
		this.icon = icon;

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

		if (srcORsrcdoc === '' || srcORsrcdoc === null || srcORsrcdoc === undefined) {
			srcORsrcdoc = 'https://aryn.dev/placeholder';
		};
		try {
			const url = new URL(srcORsrcdoc);
			this.appContentFrame.setAttribute('src', url.toString());
		} catch (err) {
			if (err instanceof TypeError) {
				this.appContentFrame.setAttribute('srcdoc', srcORsrcdoc);
			} else throw err;
		};

		this.appendChild(this.appContentFrame);

		if (title !== undefined) this.title = title;
		if (icon !== undefined) this.icon = icon;

		minimise.onclick = this.hide.bind(this);
		maximise.onclick = this.fullscreen.bind(this);
		close.onclick = this.quit.bind(this);

		dragElement(this);
		this.classList.add('acrylic');
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

					this.appContentFrame.addEventListener('load', (() => {
						this.appContentFrame.contentDocument.head.appendChild(createNode('link', { rel: 'stylesheet', href: window.location.toString() + 'css/appui.css' }));
						this.appContentFrame.contentDocument.body.classList.add('dark');
						const iconsrc = this?.appContentFrame?.contentDocument?.querySelector('link[rel="icon"]')?.getAttribute('href');
						if (iconsrc) this.icon = iconsrc;
					}).bind(this));
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
		return window.SYSTEM.appmanager.close(this.id);
	};
};

customElements.define('app-window', App);