let access_key = 'WUZSIL1KHFI0GUPS';
let stockDates = [];

function stockData(symbol) {
	fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ symbol + '&interval=60min&apikey=' + access_key)
	.then(function (response) {
	    if (response.status !== 200) {
	        console.log(
	          "Looks like there was a problem. Status Code: " + response.status);
	        return;
	    }
		response.json().then(function (data) {
			for (let key in data['Time Series (Daily)']) {
			 	stockDates.unshift([key, parseFloat(data['Time Series (Daily)'][key]['1. open'])]);
			}
			Highcharts.stockChart('container', {
		        title: {
		            text: symbol + " Stock Price",
		            align: "left"
		        },
		        series: [{
		            name: symbol,
		            data: stockDates,
		            tooltip: {
		                valueDecimals: 2
		            }
		        }]
       		}); 
		}); 
	});   
}

function showStockChart() {
	let symbol = document.getElementById("index").value;
	stockData(symbol);
}
    




