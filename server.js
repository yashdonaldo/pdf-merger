const express = require('express');
const app = express()
const path = require('path');
const multer  = require('multer')
const fs = require('fs');
const {mergepdfs}  = require('./merger')

const upload = multer({ dest: 'uploads/' })


app.use('/static', express.static('public'))
const port = 3000

app.get('/' , (req, res)=>{
    res.sendFile(path.join(__dirname, "template/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    console.log(req.files)
    let d = await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // let t = new Date().getMinutes();
    // let t2 = new Date().getMinutes();
    // console.log(t)
    setTimeout(() => {
        
        fs.unlink(`public/${d}.pdf`, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
    }, 60000);    
    }
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

  )
  

app.listen(port, ()=>{
    console.log('The server start at http://localhost:'+ port)
})