function processConvert() {
  let dateInputElement = document.getElementById("time-before-convert");
  let dateInput = dateInputElement.value;
  dateInput = dateInput.replace("T", " ");

  let date = dateInput.split(" ")[0].replaceAll("-", "/");
  let time = dateInput.split(" ")[1];

  let gmtFromSelector = document.getElementById("inlineFormSelectPref");
  let gmtFromTarget = gmtFromSelector.value;

  let gmtTargetSelector = document.getElementById("inlineFormSelectPref");
  let gmtTarget = gmtTargetSelector.value;

  //todo: parse input for "from" GMT, to replace this +0700
  let dateindate = new Date(date + " " + time + " " + "+0700");

  //todo: this dateStyle still ugly bruh
  let options = {
    timeStyle: "long",
    dateStyle: "medium",
    hour12: false,
    timeZone: getTimezone(gmtTarget),
  };
  let intlku = Intl.DateTimeFormat("en", options).format(dateindate);
  console.log(intlku.split(" "));
}

window.onload = function () {
  let convertButton = document.getElementById("time-convert-btn");
  convertButton.addEventListener("click", processConvert);
};

function getTimezone(timezoneInString) {
  // reference:
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  // check if the GMT time contain .30 minute
  //todo: make parser for the .30 one, must use swithcase for this
  if (timezoneInString.includes(".30")) {
  } else {
    // if the GMT time do not contain .30 minute
    // remove the .00
    timezoneInString = timezoneInString.replaceAll(".00", "");
    if (timezoneInString.includes("+")) {
      timezoneInString = timezoneInString.replace("+", "-");
    } else if (timezoneInString.includes("-")) {
      timezoneInString = timezoneInString.replace("-", "+");
    }
    return "Etc/GMT" + timezoneInString;
  }
}

// todo: parse the output to the target date
