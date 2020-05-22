#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (err, filenames) => {

    if(err){
        console.log(err);
        //throw new Error(err);
    }

    //BAD CODE HERE!!!! (callbacks not run immediately, order in which callbacks invoked completely unknown to us)
    for (let filename of filenames){
        fs.lstat(filename, (err, stats) => {
            if(err){
                console.log(err);
            }

            console.log(filename, stats.isFile());
        });
    }
    //BAD CODE COMPLETE!!!

    


});