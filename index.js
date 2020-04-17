var Twitter = require('twitter');
const axios = require('axios').default;
 
var client = new Twitter({
  consumer_key: 'Boniqvl6SGL6yaq9sn8ZqIOhb',
  consumer_secret: 'yws4HCJYx5WVdVdNUV0tJ6DcCv5qPb62sLd6y3ptSg2PIrADej',
  access_token_key: '1251234426039779328-j01BCDrMaDxrUO8HMCS63Euu5vU7ts',
  access_token_secret: 'YifiYpoq4sDequoyGKKHKRZiiXkBmxuMUkuflEvtlZyac'
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {
    //console.log(tweets);
  }
});

const post = (message) => {
    client.post('statuses/update', {status: message})
        .then(function (tweet) {
            console.log(tweet);
    })
        .catch(function (error) {
            throw error;
    })
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 


async function updateTimeLine() {
    console.log('Posting Tweet');
    while(true){
        axios.get("https://thevirustracker.com/free-api?global=stats")
        .then((message) => {
            //console.log(message.data.results[0].total_cases)
            const trueData = message.data.results[0]; 
            var output = "Total Corona Cases: " + trueData.total_cases
            output += "\nTotal Recovered: " + trueData.total_recovered
            output += "\nCases Today: " + trueData.total_new_cases_today
            output += "\nDeaths Today: " + trueData.total_new_deaths_today
            output += "\nSTAY SAFE, and follow for more updates."
            //console.log(output)
            post(output)
        }).catch(err => {console.log(err)})
        console.log("Waiting")
        await sleep(60000)
    }
}

updateTimeLine(); 