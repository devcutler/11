class AudioManager {
	_audionodes = [];
	_volume = 1.0;
	get volume() {
		return this._volume;
	};
	set volume(value) {
		this._volume = value;
		for (const node of this._audionodes) {
			console.log(node);
			node.volume = this._volume;
		};
	};
	manage(element) {
		this._audionodes.push(element);
		element.volume = this._volume;
	};
	constructor() {
		document.arrive('audio,video', (element) => {
			this.manage(element);
		});
	};
};