class Settings extends EventTarget {
	constructor() {
		super();
		Object.defineProperty(this, 'listen', {
			value: function listen(key, cb) {
				this.addEventListener('settingChange', event => {
					if (event.detail.key === key) {
						if (typeof cb === 'function') cb(event.detail.value);
					};
				});
			}.bind(this),
			configurable: false,
			enumerable: false,
			writable: false
		});
		Object.defineProperty(this, 'save', {
			value: function save() {
				window.SYSTEM.fs.writeFile('/.config/settings.json', JSON.stringify(this))
					.then((err) => {
						if (err) throw err;
					});
			}.bind(this),
			configurable: false,
			enumerable: false,
			writable: false
		});
		Object.defineProperty(this, 'load', {
			value: function save() {
				window.SYSTEM.fs.readFile('/.config/settings.json', 'utf-8')
					.then((data) => {
						const newsettings = JSON.parse(data.toString());
						Object.keys(newsettings).forEach(key => {
							this[key] = newsettings[key];
						});
					});
			}.bind(this),
			configurable: false,
			enumerable: false,
			writable: false
		});
		return new Proxy(this, {
			set: function set(target, key, value) {
				target[key] = value;
				this.save();
				this.dispatchEvent(new CustomEvent('settingChange', { detail: { key: key, value: value } }));
			}.bind(this)
		});
	};
};