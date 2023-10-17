const array = 
  ['divorce'
  ,'mariage'
  ,'depression'
  ,'guerison'
  ,'amour'
  ,'amitie'
  ,'pardon'
  ];

const delay = ms => new Promise(res => setTimeout(res, ms));

const yourFunction = async () => {
//  await delay(1000);
//  console.log("Waited 1s");

for (variable in array) {
  await delay(3000);
  console.log(array[variable])

//  await delay(1000);
//  console.log("Waited an additional 1s");
};
}

yourFunction();
