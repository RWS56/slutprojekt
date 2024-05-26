function requestNewData() {
    fetch("https://opensky-network.org/api/states/all")
        .then(response => response.json())
        .then(r => {
            /*data = r;
            for (let i in data) {
                console.log(i);
            }*/
            console.log(JSON.stringify(r));
        })
        .catch(error => console.log(error))
}

requestNewData();