#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');

//SOLUTION NUMBER 2
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if(err){
//                 reject(err);
//             }

//             resolve(stats);
//         })
//     });
// }

//SOLUTION NUMBER 3
//const lstat = util.promisify(fs.lstat);

//SOLUTION NUMBER 4
const { lstat } = fs.promises;

fs.readdir(process.cwd(), async (err, filenames) => {

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
    // const allStats = Array(filenames.length).fill(null);

    // for (let filename of filenames){
    //     const index = filenames.indexOf(filename);

    //     fs.lstat(filename, (err, stats) => {
    //         if(err){
    //             console.log(err);
    //         }

    //         allStats[index] = stats;

    //         //if every value in array is truthy - then entire statement will evaluate to true
    //         const ready = allStats.every((stats) => {
    //             return stats;
    //         });

    //         if(ready){
    //             allStats.forEach((stats, index) => {
    //                 console.log(filenames[index], stats.isFile());
    //             });
    //         }

    //     });
    // }
    //END SOLUTION NUMBER 1


    //NON PROMISE ALL SOLUTION
    // for(let filename of filenames){
    //     try{
    //         const stats = await lstat(filename);

    //         console.log(filename, stats.isFile());
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
    //END NON PROMISE ALL SOLUTION

    const statPromises = filenames.map(filename => {
        return lstat(filename);
    });

    const allStats = await Promise.all(statPromises);


    for (let stats of allStats){
        const index = allStats.indexOf(stats);

        if(stats.isFile()){
            console.log(filenames[index]);
        }else{
            console.log(chalk.bold(chalk.blue(filenames[index])));
        }
    }

});



