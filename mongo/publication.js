db["datasets.dataset"].find({},{"database":1,"accession":1,"dates.publication":1}).sort({"database":1}).forEach(function(e){print(e.database,',',e.accession,',',e.dates.publication)})
