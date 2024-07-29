/* eslint-disable prettier/prettier */
// my-data.js
// export const DATA = [
//   {x: 1, y: 10},
//   {x: 2, y: 20},
//   {x: 3, y: 30},
//   {x: 4, y: 40},
//   {x: 5, y: 50},
//   {x: 6, y: 60},
//   {x: 7, y: 70},
//   {x: 8, y: 80},
//   {x: 9, y: 90},
//   {x: 10, y: 100},
// ];

export const DATA = {
  labels: [8, 12, 16, 17, 17.3, 19, 20],
  datasets: [
    {
      data: [98, 100, 102, 0, 75],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
};
