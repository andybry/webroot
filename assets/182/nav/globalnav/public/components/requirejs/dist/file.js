var fs=require("fs"),path=require("path"),file,prop;function mkDir(a){if(!fs.existsSync(a)){fs.mkdirSync(a,511)}}function mkFullDir(b){var c=b.split("/"),a="",d=true;c.forEach(function(e){a+=e+"/";d=false;if(e){mkDir(a)}})}file={backSlashRegExp:/\\/g,getLineSeparator:function(){return"/"},exists:function(a){return fs.existsSync(a)},parent:function(b){var a=b.split("/");a.pop();return a.join("/")},absPath:function(a){return path.normalize(fs.realpathSync(a).replace(/\\/g,"/"))},normalize:function(a){return path.normalize(a)},isFile:function(a){return fs.statSync(a).isFile()},isDirectory:function(a){return fs.statSync(a).isDirectory()},getFilteredFileList:function(c,n,b){var a=[],o,k,l,f,h,g,d,j,m,e;o=c;k=n.include||n;l=n.exclude||null;if(fs.existsSync(o)){f=fs.readdirSync(o);for(h=0;h<f.length;h++){e=f[h];d=path.join(o,e);g=fs.statSync(d);if(g.isFile()){if(b){if(d.indexOf("/")===-1){d=d.replace(/\\/g,"/")}}j=true;if(k){j=d.match(k)}if(j&&l){j=!d.match(l)}if(j&&!e.match(/^\./)){a.push(d)}}else{if(g.isDirectory()&&!e.match(/^\./)){m=this.getFilteredFileList(d,n,b);a.push.apply(a,m)}}}}return a},copyDir:function(h,b,a,j){a=a||/\w/;var c=file.getFilteredFileList(h,a,true),f=[],d,e,g;for(d=0;d<c.length;d++){e=c[d];g=e.replace(h,b);if(file.copyFile(e,g,j)){f.push(g)}}return f.length?f:null},copyFile:function(a,d,c){var b;if(c){if(fs.existsSync(d)&&fs.statSync(d).mtime.getTime()>=fs.statSync(a).mtime.getTime()){return false}}b=path.dirname(d);if(!fs.existsSync(b)){mkFullDir(b)}fs.writeFileSync(d,fs.readFileSync(a,"binary"),"binary");return true},readFile:function(b,a){if(a==="utf-8"){a="utf8"}if(!a){a="utf8"}return fs.readFileSync(b,a)},saveUtf8File:function(b,a){file.saveFile(b,a,"utf8")},saveFile:function(d,b,c){var a;if(c==="utf-8"){c="utf8"}if(!c){c="utf8"}a=path.dirname(d);if(!fs.existsSync(a)){mkFullDir(a)}fs.writeFileSync(d,b,c)},deleteFile:function(d){var c,a,b;if(fs.existsSync(d)){b=fs.statSync(d);if(b.isDirectory()){c=fs.readdirSync(d);for(a=0;a<c.length;a++){this.deleteFile(path.join(d,c[a]))}fs.rmdirSync(d)}else{fs.unlinkSync(d)}}}};for(prop in file){if(file.hasOwnProperty(prop)){exports[prop]=file[prop]}};