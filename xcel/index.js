var xlsx = require('node-xlsx');
const fs = require('fs');

var obj = xlsx.parse(__dirname + '/test.xlsx'); // parses a file

const startHorizontalIndex = 4; // start =4
const startVerticalIndex = 7; // start =7

const endHorizontalIndex = 2204;
const endVerticalIndex = 2204;

const dummymatrix = new Array(35);

const data = obj[0]['data'];
const horizontalEntry = 35;
const verticalEntry = 35;

let text = '';

//-----------------------------------------------------------------------------------------------------------------
// //calculate total
// for (let verIndex = 0; verIndex < endVerticalIndex; verIndex++) {
//   let desiredVerIndex = verIndex % verticalEntry;

//   for (let horIndex = 0; horIndex < endHorizontalIndex; horIndex++) {
//     let currentValue =
//       data[startVerticalIndex + verIndex][startHorizontalIndex + horIndex];
//     let desiredHorIndex = horIndex % horizontalEntry;
//     dummymatrix[desiredVerIndex][desiredHorIndex] += currentValue;
//   }
// }
//-----------------------------------------------------------------------------------------------------------------

//calculate row(add from left  to right)
//           atas 35 x N
//        ______________
//        |
//        |
// 35     |
//        |
//        |
for (let i = 0; i < dummymatrix.length; i++) {
  dummymatrix[i] = new Array(35).fill(0);
}
const columnWord = 'THA';
let colId = null;
for (let a = 0; a < endVerticalIndex + startVerticalIndex; a++) {
  if (data[a][2] === columnWord) {
    colId = a;
    break;
  }
}

for (let verIndex = 0; verIndex < verticalEntry; verIndex++) {
  for (let horIndex = 0; horIndex < endHorizontalIndex; horIndex++) {
    let currentValue = data[colId + verIndex][startHorizontalIndex + horIndex];
    let desiredHorIndex = horIndex % horizontalEntry;
    dummymatrix[verIndex][desiredHorIndex] += currentValue;
  }
}

text = '';
for (let i = 0; i < 35; i++) {
  for (let j = 0; j < 35; j++) {
    text += dummymatrix[i][j] + ' ';
  }
  text += '\n';
}

fs.writeFile(`updown${columnWord}.txt`, text, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('updown' + columnWord + ' file was saved!');
});

//-----------------------------------------------------------------------------------------------------------------

// //calculate column (add from top to bottom)
// //           atas 35
// //        ______________
// //        |
// //        |
// //35 x N  |
// //        |
// //        |
for (let i = 0; i < dummymatrix.length; i++) {
  dummymatrix[i] = new Array(35).fill(0);
}
const rowWord = 'THA';
let rowId = null;
for (let b = 0; b < endHorizontalIndex + startHorizontalIndex; b++) {
  if (data[5][b] === rowWord) {
    rowId = b;
    break;
  }
}
for (let verIndex = 0; verIndex < endVerticalIndex; verIndex++) {
  let desiredVerIndex = verIndex % verticalEntry;

  for (let horIndex = 0; horIndex < horizontalEntry; horIndex++) {
    let currentValue = data[startVerticalIndex + verIndex][rowId + horIndex];
    dummymatrix[desiredVerIndex][horIndex] += currentValue;
  }
}
text = '';
for (let i = 0; i < 35; i++) {
  for (let j = 0; j < 35; j++) {
    text += dummymatrix[i][j] + ' ';
  }
  text += '\n';
}

fs.writeFile(`leftRight${columnWord}.txt`, text, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('leftRight' + rowWord + ' file was saved!');
});

//-----------------------------------------------------------------------------------------------------------------
//write to text
// text = '';
// for (let i = 0; i < 35; i++) {
//   for (let j = 0; j < 35; j++) {
//     text += dummymatrix[i][j] + ' ';
//   }
//   text += '\n';
// }

// fs.writeFile('leftRightSin.txt', text, function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('leftRightSin file was saved!');
// });
