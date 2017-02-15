var app = function(){

  var getCountry = function(event) {
    chosenCountryId = this.value;//a global variable chosen array accessible for other functions below
  }

  var populateDropdown = function(countries){// fills the dropdown with countries and their details

    var dropdown = document.getElementById('countries-drop');//gets the dropdown and sets it to a variable
    var countryIndex = 0;//creates a country's id - every country gets its id equal to its actual index num from countries array
    
    for(var country of countries){
      var option = document.createElement('option');
      option.value = countryIndex;//the value refers to the INDEX NUM of a country !!!!!!!!!!!!!!!!!!!!!!!!!!
      option.innerText = country.name;//name displaying the name of a country on the dropdown
      dropdown.appendChild(option);//attaching the newly created option to the dropdown
      countryIndex++;//incrementing the var declared above the function
    }

    var getCountry = function(){

      var li1 = document.getElementById('name');//hardcoded ul-li's referring to particular details
      var li2 = document.getElementById('capital');
      var li3 = document.getElementById('population');
      var country = countries[this.value]//getting the country out of the array. Every sinlge country has its VALUE === INDEX NUM!
      var name = document.createElement('li');
      li1.innerText = "COUNTRY:    " + country.name;
      var capital = document.createElement('li');
      li2.innerText = "CAPITAL:    " + country.capital;
      var population = document.createElement('li');
      li3.innerText = "POPULATION:    " + country.population;
    }

    dropdown.onchange = getCountry; //once the option from the dropdown is chosen, the getCountry methods runs
  }

  var requestCompleteDropdown = function(){
    if(this.status != 200) return;//it the status is OK, go!/otherwise stop!
    var jsonString = this.responseText;//the strings of JSON data/contents from the URL
    var countries = JSON.parse(jsonString);//brings the data back to the java script version/ array!
    populateDropdown(countries);//calls the method that populates the dropdown
    
  }

  var makeRequest = function(url, callback){ //it's like writing a message
    var request = new XMLHttpRequest();// setting the XMLHttpRequest "tool" that establishes the connection with the url we specify
    request.open("GET", url);//define the request - GET (receive) REQUEST with the URL (built in XMLHttp method)
    request.onload = callback;//what should happen when the data is loaded? => callback!
    request.send();//sends the GET REQUEST
  }

  var url = "https://restcountries.eu/rest/v1";//the URL
  makeRequest(url, requestCompleteDropdown);//method(URL, when the requested data is loaded, run requestComeleteDropdown that brings the data and runs the populate dropdown method)

}

window.onload = app; //runs the app