# win11

A Windows 11 style experience built with HTML+CSS+JS.

The idea is to make this as fully-functional and extensible (i.e. adding openable "apps" through iframes and things like that) as possible. I also want to make fully functioning "system-like" controls e.g. global volume controls, brightness, settings, etc. I also want to have the ability to create/read/write files, which will be stored permanently with BrowserFS.

The last time I tried to make something like this ([available here](https://github.com/arynthernium/winUI)), I had several inconsistencies and things I wanted to do differently. I also had no real direction for where I wanted to go with the project, and didn't have any idea what things I wanted to do.

### TODO:
- [ ] Login
- [ ] Window manager
- [ ] Taskbar
	- [ ] Apps
		- [ ] Button API
		- [ ] Start menu button
	- [ ] [Notification area](https://devblogs.microsoft.com/oldnewthing/20030910-00/?p=42583)
		- [ ] Notifications
		- [ ] Volume
		- [ ] Date/Time
- [ ] Flyouts
	- [ ] Notifications
	- [ ] Volume control
	- [ ] Date/Time
- [ ] Start menu
	- [ ] Taskbar
	- [ ] Notification area
	- [ ] Start menu
- [x] File system ([Filer](https://github.com/filerjs/filer))
- [ ] Segoe UI + iconography
- [ ] Protocol management
- [x] Network
- [x] Audio manager
- [x] Wallpapers
- [x] Acrylic ([mostly.](https://docs.microsoft.com/en-us/windows/apps/design/style/acrylic))
- [ ] System settings
- [ ] "Native apps"
	- [ ] Terminal emulator ([Xterm.js](https://xtermjs.org/))
	- [ ] File explorer
	- [ ] Notepad
	- [ ] Settings
	- [ ] Media player
	- [ ] Code editor ([github1s](https://github1s.com/))
	- [ ] Rich text editor ([editor.js](https://editorjs.io/))
- [ ] First-time setup

### Copyright statement
<sup>
I do not own, claim, or have any type of hold over Microsoft's copyrights. They own everything related to Windows 11, including but not limited to logos, icons, and design principles. I aim solely to create this project as a proof-of-concept, not to claim ownership over any copyrights. The LICENSE file applies only to any original code I create myself or use from other public-domain or non-restrictive sources.

If you have a copyright issue with any of the contents of this repository, send me an email [arynthernium@gmail.com](mailto:arynthernium@gmail.com)
</sup>

### Open-source
- Filer (https://filer.js.org/)
- OfflineJS (https://www.npmjs.com/package/offline-js)
- css.gg (https://css.gg)