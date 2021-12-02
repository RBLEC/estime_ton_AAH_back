
function dateTime() {

  function pad(number) {
    if ( number < 10 ) {
      return '0' + number;
    }
    return number;
  };

  const today = new Date()

  let year = today.getFullYear();
  let month = today.getMonth()+1;
  let day = pad(today.getDate());
  let hour = today.getHours()
  let minute = pad(today.getMinutes());

  const date = [day, month, year ].join("-");
  const time = [hour, minute].join(" h ").split(".")[0]

  const dateTime = (`le ${date}, à ${time}`);
  console.log(`dateTime.split`, dateTime)

  return dateTime;

  };

module.exports = dateTime;


