
// function sendLike(event) {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open('GET', `/greet/like/${event.target.parentNode.value}`, true);
// 	xhr.setRequestHeader('Content-Type', 'application/json');
// 	xhr.send();
// 	xhr.onreadystatechange = () => {
// 		if (xhr.readyState === 4 && !xhr.status) {
// 			// Handle error
// 			console.log('FAILED');
// 		} else if (xhr.readyState === 4 && xhr.status === 200) {

// 			console.log(JSON.parse(xhr.response));
// 			if (xhr.response.likerCount === 0 && !xhr.response.likes ) {
// 				event.target.parentNode.parentNode.parentNode.lastChild.setAttribute('style', 'display: none');
// 			}
// 			console.log(event.target.parentNode.parentNode.parentNode.children)
// 			//event.target.parentNode.parentNode.parentNode.childNodes.find(e=> e==='p').innerHTML = xhr.response.likerCount
// 			//your logic to update the page. No reloading will happen
// 		}
// 	};
// }

function test(scroll) {
	console.log(scroll);
}
