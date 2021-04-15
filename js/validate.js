function validate(event) {
    // TODO - write custom validation logic to validate the longitude and latitude
    // values. The latitude value must be a number between -90 and 90; the
    // longitude value must be a number between -180 and 180. If either/both are
    // invalid, show the appropriate error message in the form, and stop the
    // form from being submitted. If both values are valid, allow the form to be
    // submitted.
    var form = document.getElementById("observationForm");
    var latitude = form.Latitude.value;
    var longitude = form.Longitude.value;
    var latitudeError = document.getElementById("LatitudeError");
    var longitudeError = document.getElementById("LongitudeError");

    if(isNaN(latitude)|| latitude >90 || latitude <-90){
        latitudeError.textContent="must be a valid Latitude (-90 to 90)";
        longitudeError.textContent="";
        if(isNaN(longitude)|| longitude >180 || longitude <-180){
            longitudeError.textContent="must be a valid Latitude (-180 to 180)";
        }
        return false;
    }
    else if(isNaN(longitude)|| longitude >180 || longitude <-180){
        latitudeError.textContent="";
        longitudeError.textContent="must be a valid Latitude (-180 to 180)";
        return false;
    }
    else {
        latitudeError.textContent="";
        longitudeError.textContent="";
    }
}

// Wait for the window to load, then set up the submit event handler for the form.
window.onload = function() {
    const form = document.querySelector("form");
    form.onsubmit = validate;
};