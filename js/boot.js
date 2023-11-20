window.SYSTEM = new System;
window.SYSTEM.fs = new Filer.FileSystem().promises;
window.SYSTEM.appmanager = new AppManager;
window.SYSTEM.appmanager.init()
	.then(() => {
		window.SYSTEM.appmanager.populateRegistry();
	})
	.catch(console.error);

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

	window.SYSTEM.settings.listen('acrylicEnabled', function listenForAcrylicEnabledChange(value) {
		value ? document.body.classList.add('acrylicEnabled') : document.body.classList.remove('acrylicEnabled');
	});
	window.SYSTEM.settings.acrylicEnabled = window.SYSTEM.settings.acrylicEnabled || true;

	window.SYSTEM.settings.listen('desktopBackgroundImage', function listenForDesktopBackgroundImageChange(value) {
		try {
			const url = new URL(value);
			document.body.style.setProperty('--wallpaper', 'url("' + url.toString() + '")');
		} catch (err) {
			if (err instanceof TypeError) {
				document.body.style.removeProperty('--wallpaper');
			} else throw err;
		};
	});
	window.SYSTEM.settings.desktopBackgroundImage = window.SYSTEM.settings.desktopBackgroundImage || 'url("' + '../images/wp' + window.SYSTEM.settings.darkMode + '.jpg' + '")';
	window.SYSTEM.settings.listen('desktopBackgroundFit', function listenForDesktopBackgroundFitChange(value) {
		switch (value) {
			case 'auto':
				document.body.style.backgroundSize = 'auto';
				break;
			case 'cover':
				document.body.style.backgroundSize = 'cover';
				break;
			case 'contain':
				document.body.style.backgroundSize = 'contain';
				break;
			default:
				window.SYSTEM.settings.desktopBackgroundFit = 'cover';
				break;
		};
	});
	window.SYSTEM.settings.desktopBackgroundFit = window.SYSTEM.settings.desktopBackgroundFit;
	window.SYSTEM.settings.listen('desktopBackgroundRepeat', function listenForDesktopBackgroundRepeatChange(value) {
		switch (value) {
			case 'repeat':
				document.body.style.backgroundRepeat = 'repeat';
				break;
			case 'no-repeat':
				document.body.style.backgroundRepeat = 'no-repeat';
				break;
			case 'space':
				document.body.style.backgroundRepeat = 'space';
				break;
			case 'round':
				document.body.style.backgroundRepeat = 'round';
				break;
			default:
				window.SYSTEM.settings.desktopBackgroundRepeat = 'no-repeat';
				break;
		};
	});
	window.SYSTEM.settings.desktopBackgroundRepeat = window.SYSTEM.settings.desktopBackgroundRepeat;

	document.querySelectorAll('controls-flyout').forEach(flyout => flyout.close());
};
