//** function not used **/
findLongestCommonSubstring = function(a,b) {
  var longest = "";
  // loop through the first string
  for (var i = 0; i < a.length; ++i) {
    // loop through the second string
    for (var j = 0; j < b.length; ++j) {
      // if it's the same letter
      if (a[i] === b[j]) {
        var str = a[i];
        var k = 1;
        // keep going until the letters no longer match, or we reach end
        while (i+k < a.length && j+k < b.length // haven't reached end
               && a[i+k] === b[j+k]) { // same letter
          str += a[i+k];
          ++k;
        }
        // if this substring is longer than the longest, save it as the longest
        if (str.length > longest.length) { longest = str }
      }
    }
  }
  return longest;
};

interlap = function(a,b) {
  // loop through the first string
  var long;
  var short;

  if(a.length < b.length){
    long = b;
    short = a;
  }else{
    long = a;
    short = b;
  }

  if(short.length < 0.7 * long.length){
	return false;
  }
 
  if(short === long){
	return false;
  }

  if(short.length < 10){
	return false;
  }
 
  var n = 0.8 * short.length;
  var i1 = 0.2 * short.length;
  var i2 = 0.8 * short.length;

  if(!long.includes(short.substring(i1,i2))){
    return false;
  }

  for(var i = 0; i< short.length-n; ++i ){
    var s = short.substring(i, i+n);
    if(long.includes(s)){
	return true;
    }
  }
  return false;
};

var i=0;
var names = [];

db["datasets.dataset"].find({}).sort({name:1}).forEach(function(d){
   names.push({name:d.name, accession: d.accession, database: d.database});
})
 
for(var j=0; j!=names.length; j++ ){
 i = i +1;
 print(i);

 for(var k=j+1; k!=names.length; k++){
 if(names[j].database == names[k].database)
	continue;
	

 if(interlap(names[j].name,names[k].name)){
    print(names[j].database, names[j].accession, names[j].name);
    print(names[k].database, names[k].accession, names[k].name);

    db.mergeCandidates.insertOne({database:names[j].database,accession:names[j].accession,database1:names[k].database,accession1:names[k].accession });
   }
 }

}

