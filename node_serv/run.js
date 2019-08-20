var http = require("http");

function getLoginDetails(response) {
	console.log("getLoginDetails()");
	http.get('http://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20190127&json', function(res) {
        // Continuously update stream with data
		console.log(res);
		response.writeHead(200, {'Content-Type': 'text/plain'});  
		response.end('Hello World\n');
		
		
		//console.log(response);
		//console.log(body);
    });
}

http.createServer(function (request, response) {
	console.log("getLoginDetails()1");
   getLoginDetails(response);
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain

}).listen(8081);

// Console will print the message
//console.log('Server running at http://127.0.0.1:8081/');

