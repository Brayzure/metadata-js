# Metadata Viewer for Node.js v0.0.1
A simple, no-dependencies metadata viewer for audio files.

Please note this is an early alpha, and as such has several (known) bugs.

## To-Do List
- Fix uncommon bug in reading tags that contain null bytes in the middle of data for some reason.
- Add support for metadata tags that are not in utf-8 (most common tags are in utf-8).
- Add safeguard that will prevent non-mp3 files from being read, and add ability to bypass said safeguard. Will later facilitate auto-detection of metadata format.
- Add support for MP4-type metadata (m4a, alac, etc.).
- Add support for Vorbis comments (ogg and flac).

## Install
Place `id3.js` into your project's directory, then require it: `var id3 = require('path/to/id3.js');`

## Usage
```var id3 = require("./id3.js");

var file = "path\\to\\file";

id3.tags(file,function(data){
	console.log(data);
});```

`data` is an object with every tag it could find.

Example:
```{
	TALB: 'Into The Sun',
	TCON: 'Dubstep',
	TIT2: 'Into The Sun',
	TPE2: 'Bassnectar',
	TPOS: '1/1',
	TRCK: '3/17',
	TSSE: 'Lavf55.19.100',
	TYER: '2015',
	USLT: 'eng'
}```

Title (TIT2), Artist (TPE2), and Album (TALB) will always be present, but will be set to `null` if no data could be found.

## License

MIT License

Copyright (c) 2016 Tyler Ricketts

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.