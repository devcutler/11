class AppManager {
	#appRegistry = {};
	#apps;
	#openapps = [];
	async init() {
		this.#apps = new Proxy(this.#appRegistry, {
			set: (function set(obj, prop, value) {
				this.#appRegistry[prop] = value;
				window.SYSTEM.fs.writeFile(window.SYSTEM.modules.path.join('/.apps/', prop + '.json'), JSON.stringify(value))
					.then(console.log)
					.catch(console.error);
				return true;
			}).bind(this)
		});
		return window.SYSTEM.fs.stat('/.apps')
			.catch(err => {
				if (err.code === 'ENOENT') {
					window.SYSTEM.fs.mkdir('/.apps')
						.then(async () => {
							return await this.init();
						})
						.catch(console.error);
				};
			});
	};
	populateRegistry() {
		const registry = this.#appRegistry;
		return window.SYSTEM.fs.readdir('/.apps')
			.then(function afterReadAppsDir(dir) {
				dir.forEach(function forEachAppFile(appfile) {
					window.SYSTEM.fs.readFile(window.SYSTEM.modules.path.join('/.apps/', appfile))
						.then(function afterReadAppFile(data) {
							const appdata = JSON.parse(data.toString());
							registry[appdata.id] = appdata;
						})
						.catch(console.error);
				});
			})
			.catch(err => {
				if (err.code === 'ENOENT') this.init();
			});
	};
	register(srcORsrcdoc, id, title, icon) {
		if (!id) id = window.SYSTEM.modules.UUID.generate();
		if (this.#apps[id]) this.#apps?.[id]?.quit?.();
		this.#apps[id] = { srcORsrcdoc, id, title, icon };
		return id;
	};
	get(id) {
		return this.#appRegistry[id];
	};
	getAll() {
		return Object.values(this.#appRegistry);
	};
	getOpen() {
		return this.#openapps;
	};
	open(id) {
		const app = this.get(id);
		const opened = new App(id, app.srcORsrcdoc, app.title, app.icon);
		this.#openapps.push(opened);
		opened.show();
		return opened;
	};
	async close(id) {
		const closed = this.#openapps.splice(this.#openapps.findIndex(app => app.id === id), 1)?.[0];
		return new Promise(((resolve, reject) => {
			try {
				closed.appContentFrame.remove();
				closed.remove();
				resolve(true);
			} catch (err) {
				reject(err);
			};
		}).bind(this));
	};
};