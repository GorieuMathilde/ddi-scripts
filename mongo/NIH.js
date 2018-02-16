use ddi_db
var img = cat("NIH.img")
var rr = img.substring (0, img.length-1)
print("file content:")
print(rr)
db["databases"].update({_id:"NCBI"},{$set:{image:new BinData(0,rr)}})
