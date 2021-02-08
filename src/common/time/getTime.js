export function getTime() {
  let myDate = new Date();
  let year = myDate.getFullYear();
  let month = pad(myDate.getMonth() + 1, 2);
  let data = pad(myDate.getDate(), 2);
  let hours = pad(myDate.getHours(), 2);
  let minuters = pad(myDate.getMinutes(), 2);
  let seconds = pad(myDate.getSeconds(), 2);
  return (
    year +
    "/" +
    month +
    "/" +
    data +
    " " +
    hours +
    ":" +
    minuters +
    ":" +
    seconds
  );
}
function pad(num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}
