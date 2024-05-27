fetch("https://api.skolverket.se/skolenhetsregistret/v2/school-units", { Host: "api.skolverket.se", Cors: "no-cors" })
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error));


//https://api.skolverket.se/skolenhetsregistret/v1/skolenhet as-chringe skitföretag
//https://opentdb.com/api.php?amount=10