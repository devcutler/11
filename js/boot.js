window.SYSTEM = new System;
window.SYSTEM.fs = new Filer.FileSystem().promises;

Object.defineProperty(window.SYSTEM.fs, 'ready', {
	get() {
		return this.a + 1;
	},
	set(value) {
		window.SYSTEM.fs.onread;
	}
});

window.SYSTEM.settings.load();

window.onload = () => {
	window.SYSTEM.settings.listen('darkMode', function listenForDarkModeChange(value) {
		value ? document.body.classList.add('dark') : document.body.classList.remove('dark');
	});
	window.SYSTEM.settings.darkMode = window.SYSTEM.settings.darkMode !== undefined ? window.SYSTEM.settings.darkMode : false; // doesn't register event when initializing settings

	const screenOverlay = document.querySelector('.screen-overlay');
	window.SYSTEM.settings.listen('screenBrightness', function listenForScreenBrightnessChange(value) {
		screenOverlay.style.opacity = value !== undefined ? (mirror(value, 0, 100) / 100) * 70 + '%' : '';
	});
	window.SYSTEM.settings.screenBrightness = window.SYSTEM.settings.screenBrightness !== undefined ? window.SYSTEM.settings.screenBrightness : 100; // doesn't register event when initializing settings
};
