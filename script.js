// Parker Howell
// Week 6 - CS 290

// Event Listener for Get Weather button
// get valus of City Name and Zip Code when Get Weather clicked
document.getElementById("subButton").addEventListener("click", function(){
   var theCity = document.getElementById("city").value;
   var theZip = document.getElementById("zip").value;
   //console.log(theCity);

   // use whichever had data
   if((theCity != "") || (theZip != "")){
      if(theCity != ""){  // use city name
         var url = "http://api.openweathermap.org/data/2.5/weather?q=";
         url += theCity;
         url += "&appid=fa7d80c48643dfadde2cced1b1be6ca1";
         //console.log(url);
      } else {  // use zip code
         var url = "http://api.openweathermap.org/data/2.5/weather?zip=";
         url += theZip;
         url += ",us&appid=fa7d80c48643dfadde2cced1b1be6ca1";
      }

      // setup asynchronous call
      var req = new XMLHttpRequest();
      req.open("GET", url, true);

      req.addEventListener("load", function(){
         var response = JSON.parse(req.responseText);
         //console.log(response);
         //console.log(response.main.humidity);

         // populate HTML elements with returned data
         document.getElementById("cName").textContent = response.name;
         document.getElementById("humid").textContent = response.main.humidity;

         // conversion formula from:
         // http://chemistry.about.com/od/temperature/a/How-To-Convert-Kelvin-To-Fahrenheit.htm
         var kelvin = response.main.temp;
         var farenheit = ((kelvin - 273) * 1.8 + 32).toFixed(1);
         farenheit += " degrees Farenheit";
         document.getElementById("temp").textContent = farenheit;
      });
      req.send(null);
   }
});

// Event Listener for POST Test button
// gets contents of textarea
document.getElementById("postButton").addEventListener("click", function(){
   var theText = document.getElementById("textBlock").value;
   //console.log(theText);

   // setup asynchronous call
   var req = new XMLHttpRequest();
   req.open("POST", "http://httpbin.org/post", true);
   req.setRequestHeader('Content-Type', 'application/json');
   req.addEventListener("load", function(){
      var response = JSON.parse(req.responseText);
      //console.log(response);

      // populate HTML elements with returned data
      var data = response.data;
      document.getElementById("data").textContent = data;
      var output = JSON.parse(data);
      document.getElementById("output").textContent = output;
   });
   req.send(JSON.stringify(theText));
});