var lec = [
  { no: 1, time: "10 to 11" },
  { no: 2, time: "11 to 12" },
  { no: 3, time: "1 to 2" },
  { no: 4, time: "2 to 3" },
  { no: 5, time: "3 to 4" },
  { no: 6, time: "4 to 5" },
];
str = ``;
lec.forEach(function (value, index) {
  //console.log(value, index);
  str =
    str +
    `
    <div class='1lec' for='${value.no}#${value.time}' onclick='myfunc(this)'>${value.no}<br />${value.time}</div>`;
});

//console.log(str);
arr1 = [];
arr2 = [];

document.getElementById("maindiv").innerHTML = str;

function myfunc(myvar) {
  //console.log(myvar);
  let ans = myvar.attributes.for.value;
  //console.log(ans);

  let ans1 = ans.split("#");
  console.log(ans1);

  let position = arr1.indexOf(ans1[0]);
  console.log(position);
  arr1.push(ans1[0]);
  arr2.push(ans1[1]);
  
  // console.log(arr1);
  // console.log(arr2);
  if (position == -1) 
  {
    arr1.push(ans1[0]);
    arr2.push(ans1[1]);
     msg= "Lecture Booked";
   } 
  else
  {
    msg="Oops!!, Lecture Slot is already booked";
  }

  console.log(arr1);
  console.log(arr2);

  document.getElementById("msg").innerHTML= msg;
  myvar.style.background= "#f00";
}
