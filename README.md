# About Lyricsync
An .lrc file creator/generator.
This lrc generator website/browser application allows you to paste in the lyrics to a song, upload the song and then listen to the song and synchronise the lyrics line by line in order to generate an .lrc file which can be used by music players.
In order to get started, either use the online version at https://dbkarman.github.io/lyricsync/ or simply download all the files in the repository and open up "index.html" in a web browser, preferably a Chromium one such as Google Chrome/Edge.
If you need any help, simply visit https://github.com/DBKarman/lyricsync/discussions or email me at github.dbkarman@gmail.com.
This project is maintained by only me, DBKarman. I will try to update and improve this as frequently as possible to fix buggs and add improvements but there is only so much one man can do.
Any feedback would be much appreciated :)

# How to use
Lyricsync is written in HTML, CSS and JS. Either visit https://dbkarman.github.io/lyricsync/ for an github hosted version or download all the source code and run index.html in a browser. 
No files are saved locally and no cookies are saved in the browser.
The app generates a .lrc file which can be used by music players to display lyrics synced to the music.

# .lrc Files
The .lrc file is just a file with some ID tags and lyrics. Opening in a text editor would show you the app.
```
[ar: *Lyrics artist* ]
if (album name exists) [al: *albumName* ]
[ti: *songName* ]
[tool: github-DBKarman-Lyricsync ]
[length: *length of song in the format minutes:seconds.miliseconds*]

[mm:ss.xx]last lyrics line
[mm:ss.xx]last lyrics line
[mm:ss.xx]last lyrics line
[mm:ss.xx]last lyrics line
```
