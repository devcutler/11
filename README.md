# 11

### A Windows 11 style experience built with HTML+CSS+JS.

## Abstract

The idea is to make this as fully-functional and extensible (i.e. adding openable "apps" through iframes and things like that) as possible. I also want to make fully functioning "system-like" controls e.g. global volume controls, brightness, settings, etc. I also want to have the ability to create/read/write files, which will be stored permanently with BrowserFS.

The last time I tried to make something like this ([available here](https://github.com/arynthernium/winUI)), I had several inconsistencies and things I wanted to do differently. I also had no real direction for where I wanted to go with the project, and didn't have any idea what things I wanted to do.

Issues, PRs, discussion, and ideas are welcome.

## TODO
- [ ] Login
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
- [x] Segoe UI font
- [ ] Protocol management
- [ ] Network
- [x] Audio manager
- [ ] Speech
	- [ ] Synthesis
	- [ ] Recognition
- [ ] Wallpapers (custom as well)
- [x] Acrylic ([mostly.](https://docs.microsoft.com/en-us/windows/apps/design/style/acrylic))
- [ ] Mica ([mostly.](https://docs.microsoft.com/en-us/windows/apps/design/style/mica))
- [x] System settings
- [x] App Windows
- [ ] "Native" apps
	- [ ] Terminal emulator ([Xterm.js](https://xtermjs.org/))
	- [ ] File explorer
	- [ ] Notepad
	- [ ] Settings
	- [ ] Media player
	- [ ] Code editor ([monaco](https://github.com/microsoft/monaco-editor))
	- [ ] Rich text editor ([editor.js](https://editorjs.io/))
- [ ] First-time setup

## Copyright statement
I do not own, claim, or have any type of hold over Microsoft's copyrights. They own everything related to Windows 11, including but not limited to logos, icons, and design principles. I aim solely to create this project as a proof-of-concept, not to claim ownership over any copyrights. The LICENSE file applies only to any original code I create myself or use from other public-domain or non-restrictive sources.

If you have a copyright issue with any of the contents of this repository, send me an email [arynthernium@gmail.com](mailto:arynthernium@gmail.com)

## Open-source
- [Filer](https://filer.js.org/)
- [arrive.js](https://github.com/uzairfarooq/arrive)

## Resources
These are resources that Microsoft uses in Windows 11 that I am using in this project to best replicate the Windows 11 experience. These are official and I do not claim any sort of copyright hold over them. They are solely Microsoft's.
- [Segoe UI](https://docs.microsoft.com/en-us/typography/font-list/segoe-ui)
- [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons)
- [Wallpapers](https://drive.google.com/drive/folders/1JgF9H97Xn8MojslgF4LPXSlbLLfK2Ekn)

## Contributing
Not that I expect anyone to, or even expect anyone to see this, but if you want to contribute, just drop a PR. I'll take a look and take action whenever I see it. If it works well within my scope I'll merge it in.