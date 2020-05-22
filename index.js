#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (err, filenames) => {

    if(err){
        console.log(err);
        //throw new Error(err);
    }

    //BAD CODE HERE!!!! (callbacks not run immediately, order in which callbacks invoked completely unknown to us)
    // for (let filename of filenames){
    //     fs.lstat(filename, (err, stats) => {
    //         if(err){
    //             console.log(err);
    //         }

    //         console.log(filename, stats.isFile());
    //     });
    // }
    //BAD CODE COMPLETE!!!


    //SOLUTION NUMBER 1
    const allStats = Array(filenames.length).fill(null);

    for (let filename of filenames){
        const index = filenames.indexOf(filename);

        fs.lstat(filename, (err, stats) => {
            if(err){
                console.log(err);
            }

            allStats[index] = stats;

            //if every value in array is truthy - then entire statement will evaluate to true
            const ready = allStats.every((stats) => {
                return stats;
            });

            if(ready){
                allStats.forEach((stats, index) => {
                    console.log(filenames[index], stats.isFile());
                });
            }

        });
    }
       //END SOLUTION NUMBER 1





});