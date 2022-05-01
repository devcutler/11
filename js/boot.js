window.SYSTEM = new System;
window.SYSTEM.fs = new Filer.FileSystem();

window.SYSTEM.fs.exists('/.config/', function (exists) {
	if (exists) {
		window.SYSTEM.fs.exists('/.config/settings.json', function (exists) {
			if (exists) {
				window.SYSTEM.settings.load();
			} else {
				window.SYSTEM.fs.writeFile('/.config/settings.json', JSON.stringify(Settings.defaultConfig), function (err) {
					if (err) throw err;
				});
			};
		});
	} else {
		window.SYSTEM.fs.mkdir('/.config/', function (err) {
			if (err) throw err;
			window.SYSTEM.fs.writeFile('/.config/settings.json', Settings.defaultConfig, function (err) {
				if (err) throw err;
				window.SYSTEM.fs.readFile('/.config/settings.json', 'utf-8', function (err, data) {
					if (err) throw err;
					window.SYSTEM.settings.load();
				});
			});
		});
	};
});