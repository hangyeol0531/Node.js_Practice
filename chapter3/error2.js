const fs = require('fs')

setInterval(() => {
    fs.unlink('./abcdefg.js', (err) =>{
        if(err){
            console.err(err);
        }
    });
}, 1000);