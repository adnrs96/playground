# Endpoint to upload
when http server listen path:"/" method:"post" as req
    id = awesome id
    content = req.files.values()[0].body
    req write content:"https://{app.hostname}/?id={id}\n"
    req finish  # Go asynchronous

    file write path:id :content
    wilzbach/schedule schedule name:"expire" delay:60 data:{"id":id}

# Endpoint to download
when http server listen path:"/" as req
    try
        { id } = req.queryParams
        content = file read path:id
        req write :content
        req finish
        file removeFile path:id
    catch
        req setStatus code:404
        req write content:"Not found"

# Delayed trigger to delete
when wilzbach/schedule event triggered name:"expire" as ev
    { id } = ev.data to Map[string,string]
    try
        file removeFile path:id
