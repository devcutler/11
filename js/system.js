class Settings {
	// this will store all the settings in this object
	// however, some settings will need to execute code on change, thus the getter/setter pairs
	raw = {
		// example value for dark mode setting
		darkMode: false
	};

	// example setter/getter for dark mode setting
	get darkMode() {
		return this.raw.darkMode;
	};
	set darkMode(value) {
		this.raw.darkMode = value;
		if (this.darkMode) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		};
	};
};

class System {
	navigator = window.navigator;
	settings = new Settings;
	audio = new AudioManager;
};