use ddi_db
var img = cat("dbGaP.img")
var rr = img.substring (0, img.length-1)
print("file content:")
print(rr)
db["databases"].update({_id:"dbGaP"},{$set:{image:new BinData(0,rr)}})
