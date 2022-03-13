window.onload = function () {
    let convertButton = document.getElementById("time-convert-btn");
    convertButton.addEventListener("click", processConvert);

    let switchElement = document.getElementById("time-exchange-icon");
    switchElement.onclick = function () {
        let gmtBeforeElement = document.getElementById("fromInlineFormSelectPref");
        let gmtAfterElement = document.getElementById("targetInlineFormSelectPref");

        let beforeValue = gmtBeforeElement.value;
        let afterValue = gmtAfterElement.value;

        gmtBeforeElement.value = afterValue;
        gmtAfterElement.value = beforeValue;
        //console.log("SWITCHED");
    }
};

function processConvert() {
    let dateInput = getValueFromId("time-before-convert");
    let gmtFrom = getValueFromId("fromInlineFormSelectPref");
    let gmtTarget = getValueFromId("targetInlineFormSelectPref");

    let timeAfterConvert = document.getElementById("time-after-convert");

    let errorText = document.getElementById("time-error-text");
    if (dateInput == "") {
        errorText.textContent = "Please select the time you want to convert from!";
        timeAfterConvert.style.color = "rgba(33, 37, 41, 0.4)";
        return;
    } else if (gmtFrom == "default") {
        errorText.textContent =
            "Please select the time zone you want to convert from!";
        timeAfterConvert.style.color = "rgba(33, 37, 41, 0.4)";
        return;
    } else if (gmtTarget == "default") {
        errorText.textContent =
            "Please select the time zone you want to convert to!";
        timeAfterConvert.style.color = "rgba(33, 37, 41, 0.4)";
        return;
    } else {
        errorText.textContent = "";
        timeAfterConvert.style.color = "rgba(33, 37, 41, 1)";
    }

    dateInput = dateInput.replace("T", " ");
    let date = dateInput.split(" ")[0].replaceAll("-", "/");
    let time = dateInput.split(" ")[1];

    let dateindate = new Date(date + " " + time + " " + getTimezoneForFrom(gmtFrom));

    //console.log(dateindate);
    let options = {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: getTimezoneForTarget(gmtTarget),
        hc: "h23"
    };
    let targetDate = Intl.DateTimeFormat("en-GB", options).format(dateindate);
    setTargetDate(targetDate);
}

function getTimezoneForTarget(timezoneInString) {
    // reference:
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    // check if the GMT time contain .30 minute
    //todo: make parser for the .30 one, must use swithcase for this
    if (timezoneInString.includes(".00") === false) {
        switch (timezoneInString) {
            case "+3.30":
                return "Asia/Tehran";
            case "+4.30":
                return "Asia/Kabul";
            case "+5.30":
                return "Asia/Kolkata";
            case "+5.45":
                return "Asia/Kathmandu";
            case "+6.30":
                return "Asia/Yangon";
            case "+8.45":
                return "Australia/Eucla";
            case "+9.30":
                return "Australia/Darwin";
            case "+10.30":
                return "Australia/Lord_Howe";
        }
    } else {
        // if the GMT time do not contain .30 minute
        // remove the .00
        timezoneInString = timezoneInString.replaceAll(".00", "");
        if (timezoneInString.includes("+")) {
            timezoneInString = timezoneInString.replace("+", "-");
        } else if (timezoneInString.includes("-")) {
            timezoneInString = timezoneInString.replace("-", "+");
        }
        //console.log("Etc/GMT" + timezoneInString);
        return "Etc/GMT" + timezoneInString;
    }
}

function getTimezoneForFrom(timezoneInString) {
    // this will conver timezoneString to format that fit the Date() argument
    // example +8.00 => +800
    timezoneInString = timezoneInString.replaceAll(".", "");
    return timezoneInString;
}

function setTargetDate(targetDate) {
    //console.log("targetdate: " + targetDate);
    let dateTargetElement = document.getElementById("time-after-convert");

    let splitted = targetDate.split(", ");

    let date = splitted[0];
    let time = splitted[1];

    date = date.replaceAll("/", "-");
    date = date.split("-");
    let day = date[0];
    let month = date[1];
    let year = date[2];

    dateTargetElement.value = year + "-" + month + "-" + day + "T" + time;
}

function getValueFromId(id) {
    let element = document.getElementById(id);
    return element.value;
}
