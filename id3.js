var fs = require("fs");

exports.tags = function load(file,callback){
	fs.readFile(file, function(err, file){
		var file2 = new Buffer(file, 'binary').toString('utf-8').split('\n');
		for(var t=0;t<file2.length;t++){
			file2[t] = file2[t].trim();
		}
		for(var j=0;j<file2.length;j++){
			str = toHex(file2[j]);
			var loc = str.indexOf('54495432');
			if(loc!=-1){
				var dat;
				for(var f=j-5;f<j+20;f++){
					dat = dat + "\0" + file2[f];
				}
				var ret = parse(dat);
				j = file2.length;
			}
		}
		callback(ret);
	});
}

function parse(str){
	var data = {
		TIT2: null,
		TPE2: null,
		TALB: null
	};
	for(var i=0;i<tags.length;i++){
		var pos = str.indexOf(tags[i].id);
		if(pos!=-1){
			var test = toHex(str[pos+7]);
			var flag=1;
			var end = str.indexOf('\0',pos+11);
			var tagCheck = str.substring(end-4,end);
			for(var q=0;q<tags.length;q++){
				if(tagCheck==tags[q].id){
					flag = 0;
					q = tags.length;
				}
			}
			if(flag){
				data[tags[i].id] = str.substring(pos+11,end);
			}
			else{
				data[tags[i].id] = str.substring(pos+11,end-4);
			}
		}
	}
	return data;
}

function toHex(str) {
	var hex = '';
	if(str){
		for(var i=0;i<str.length;i++) {
			var t = str.charCodeAt(i).toString(16);
			if(t.length==1){
				hex += '0'+t;
			}
			else{
				hex += ''+t;
			}
		}
	}
	
	return hex;
}

var tags = [
    {
        "id": "AENC",
        "name": "Audio encryption"
    },
    {
        "id": "APIC",
        "name": "Attached picture"
    },
    {
        "id": "COMM",
        "name": "Comments"
    },
    {
        "id": "COMR",
        "name": "Commercial frame"
    },
    {
        "id": "ENCR",
        "name": "Encryption method registration"
    },
    {
        "id": "EQUA",
        "name": "Equalization"
    },
    {
        "id": "ETCO",
        "name": "Event timing codes"
    },
    {
        "id": "GEOB",
        "name": "General encapsulated object"
    },
    {
        "id": "GRID",
        "name": "Group identification registration"
    },
    {
        "id": "IPLS",
        "name": "Involved people list"
    },
    {
        "id": "LINK",
        "name": "Linked information"
    },
    {
        "id": "MCDI",
        "name": "Music CD identifier"
    },
    {
        "id": "MLLT",
        "name": "MPEG location lookup table"
    },
    {
        "id": "OWNE",
        "name": "Ownership frame"
    },
    {
        "id": "PRIV",
        "name": "Private frame"
    },
    {
        "id": "PCNT",
        "name": "Play counter"
    },
    {
        "id": "POPM",
        "name": "Popularimeter"
    },
    {
        "id": "POSS",
        "name": "Position synchronisation frame"
    },
    {
        "id": "RBUF",
        "name": "Recommended buffer size"
    },
    {
        "id": "RVAD",
        "name": "Relative volume adjustment"
    },
    {
        "id": "RVRB",
        "name": "Reverb"
    },
    {
        "id": "SYLT",
        "name": "Synchronized lyric/text"
    },
    {
        "id": "SYTC",
        "name": "Synchronized tempo codes"
    },
    {
        "id": "TALB",
        "name": "Album/Movie/Show title"
    },
    {
        "id": "TBPM",
        "name": "BPM (beats per minute)"
    },
    {
        "id": "TCOM",
        "name": "Composer"
    },
    {
        "id": "TCON",
        "name": "Content type"
    },
    {
        "id": "TCOP",
        "name": "Copyright message"
    },
    {
        "id": "TDAT",
        "name": "Date"
    },
    {
        "id": "TDLY",
        "name": "Playlist delay"
    },
    {
        "id": "TDRC",
        "name": "Recording time"
    },
    {
        "id": "TENC",
        "name": "Encoded by"
    },
    {
        "id": "TEXT",
        "name": "Lyricist/Text writer"
    },
    {
        "id": "TFLT",
        "name": "File type"
    },
    {
        "id": "TIME",
        "name": "Time"
    },
    {
        "id": "TIT1",
        "name": "Content group description"
    },
    {
        "id": "TIT2",
        "name": "Title/songname/content description"
    },
    {
        "id": "TIT3",
        "name": "Subtitle/Description refinement"
    },
    {
        "id": "TKEY",
        "name": "Initial key"
    },
    {
        "id": "TLAN",
        "name": "Language(s)"
    },
    {
        "id": "TLEN",
        "name": "Length"
    },
    {
        "id": "TMED",
        "name": "Media type"
    },
    {
        "id": "TOAL",
        "name": "Original album/movie/show title"
    },
    {
        "id": "TOFN",
        "name": "Original filename"
    },
    {
        "id": "TOLY",
        "name": "Original lyricist(s)/text writer(s)"
    },
    {
        "id": "TOPE",
        "name": "Original artist(s)/performer(s)"
    },
    {
        "id": "TORY",
        "name": "Original release year"
    },
    {
        "id": "TOWN",
        "name": "File owner/licensee"
    },
    {
        "id": "TPE1",
        "name": "Lead performer(s)/Soloist(s)"
    },
    {
        "id": "TPE2",
        "name": "Band/orchestra/accompaniment"
    },
    {
        "id": "TPE3",
        "name": "Conductor/performer refinement"
    },
    {
        "id": "TPE4",
        "name": "Interpreted, remixed, or otherwise modified by"
    },
    {
        "id": "TPOS",
        "name": "Part of a set"
    },
    {
        "id": "TPUB",
        "name": "Publisher"
    },
    {
        "id": "TRCK",
        "name": "Track number/Position in set"
    },
    {
        "id": "TRDA",
        "name": "Recording dates"
    },
    {
        "id": "TRSN",
        "name": "Internet radio station name"
    },
    {
        "id": "TRSO",
        "name": "Internet radio station owner"
    },
    {
        "id": "TSIZ",
        "name": "Size"
    },
    {
        "id": "TSRC",
        "name": "ISRC (international standard recording code)"
    },
    {
        "id": "TSSE",
        "name": "Software/Hardware and settings used for encoding"
    },
    {
        "id": "TYER",
        "name": "Year"
    },
    {
        "id": "TXXX",
        "name": "User defined text information frame"
    },
    {
        "id": "UFID",
        "name": "Unique file identifier"
    },
    {
        "id": "USER",
        "name": "Terms of use"
    },
    {
        "id": "USLT",
        "name": "Unsychronized lyric/text transcription"
    },
    {
        "id": "WCOM",
        "name": "Commercial information"
    },
    {
        "id": "WCOP",
        "name": "Copyright/Legal information"
    },
    {
        "id": "WOAF",
        "name": "Official audio file webpage"
    },
    {
        "id": "WOAR",
        "name": "Official artist/performer webpage"
    },
    {
        "id": "WOAS",
        "name": "Official audio source webpage"
    },
    {
        "id": "WORS",
        "name": "Official internet radio station homepage"
    },
    {
        "id": "WPAY",
        "name": "Payment"
    },
    {
        "id": "WPUB",
        "name": "Publishers official webpage"
    },
    {
        "id": "WXXX",
        "name": "User defined URL link frame"
    }
];
