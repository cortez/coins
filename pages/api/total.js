// fetch('https://api.coincap.io/v2/assets')
//   .then(response => response.json())
//   .then(data => {
//     // Do something with the data here
//     console.log(data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

fetch('https://coins.cortez.link/api/users')
  .then(response => response.json())
  .then(data => {
    let cashTotal = data.reduce((total, user) => total + user.cash, 0);

    let result = { totalCash: cashTotal };
    console.log(JSON.stringify(result));
  })
  .catch(error => {
    console.error(error);
  });