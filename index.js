
//Adding all the dependecies
var fs = require('fs');
var exifp = require('exif-parser');

//finding the number of arguments passed
let argln = process.argv.length;

//checking if we have 3 arguments so that code can execute with path provided
try{
if(argln !== 3) 
{throw `You need to provide path to photo directory: 
Please Follow Call Syntax: 
    node index.js /path/to/photo/directory/`;
}
}catch(e){ console.log(e); return}

//storing last argument which is path to photo directory/folder
var path = process.argv[2];

//Function which will print image name in decending order of the ISO speed, 
//If the ISO speed are same then, images will be sorted according to occurance in the folder from top to bottom
function dirrd(dir){

    //dictinoary for storing image name with thier ISO speed
    let photos = {};
    //Array for storing ISO speeds
    let iso = [];
    //Final array which stores sorted images in decending order of ISO speed
    let sortedphotos = []

    fs.readdirSync(dir).forEach(file => {
        let buf = fs.readFileSync(dir+'/'+file);
        let ISO = exifp.create(buf).parse().tags.ISO;
        photos[file] = ISO;
        iso.push(ISO);
    })
    
    //decending order ISO
    iso = iso.sort((a,b)=>b-a);
        
    for(var i in iso){
        
        img = Object.keys(photos).find(key => photos[key] == iso[i]);
        sortedphotos.push([img,iso[i]])
        delete photos[img];

        }

    return sortedphotos;

}

//try catch for valid path check
try{
console.log(dirrd(path));
}catch(E){
    console.error(`
Please Enter valid path with all forward slash(/)
    example: node index.js C:/path/to/photo/directory

or you can copy photo folder beside index.js file and just write the folder name:
    node index.js foldername`);
}