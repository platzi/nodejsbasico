const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const ops = require("./src/fileops");

// let incValue;


// fs.readFile("./resources/number.txt", "utf8", (err, text) => {
//     if (err) throw err;
//     // console.log(text);
//     const numbers = text.split("\n").map(n => Number(n));
//     console.log(numbers); 
//     console.log(ops.incrementValues(numbers));
//     incValue = ops.incrementValues(numbers);

//     fs.writeFile("./resources/number.txt", incValue.join("\n"), (err, result) => {
//         if (err) throw err;
//     });
    
// });

const readFile = (path) => {
    return new Promise(( resolve, rejects ) => {
        fs.readFile(path, "utf8", (err, list) => {
            if(err) rejects(err)
            resolve(list.split("\n"));
        });
    });
}

const writeFile = (path, values) => {
    return new Promise(( resolve, rejects ) => {
        fs.writeFile(path, values, (err, data) => {
            if(err) rejects(err);
            resolve(true)
        });
    }); 
}


const main = function() {
    readFile('./resources/name.txt')
      .then(async (res) => {
        const namesWrite = ops.callNames(res);
        console.log(namesWrite);
        const save = await writeFile('./resources/name2.txt', namesWrite.join("\n"))
        console.log(save);
      })
    .catch((err) =>console.log(err));
  }

// console.log(main())
main()
