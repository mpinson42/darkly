var result = [];
function openlink(url, text){

	var test = text.match(/>[a-z]+\/</g);
	if (test === null) { result.push(text); return 0};
	test = test.map(e=>(url + e.replace('<', '').replace('>', '')));
	test.forEach(function(e,i) {
   		var req = new XMLHttpRequest();
    	req.open('GET', test[i], false); 
    	req.send(null);
    	if (req.status === 200) {
			openlink(test[i], req.responseText)
    	}

    	req = new XMLHttpRequest();
    	req.open('GET', test[i] + 'README', false); 
    	req.send(null);
    	if (req.status === 200) {
			if(req.responseText.indexOf(" ") == -1)
			{
				console.log(req.responseText)
				exit()
			}
    	}
	})
}

openlink(document.URL, document.body.outerHTML);