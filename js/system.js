class System {
	navigator = window.navigator;
	settings = new Settings();
	audio = new AudioManager;
	modules = {
		path: Filer.path,
		Buffer: Filer.Buffer
	};
	DOMPARSER = new DOMParser();
};