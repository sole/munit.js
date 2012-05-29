// munit.js // microunit testing for javascript //
// http://github.com/sole/munit.js
var MUNIT = MUNIT || {
	VERSION : 2,
	RESULT_YAY: 'yay',
	RESULT_BOO: 'boo',

	prettyFormat: function(testResults) {
		var table = document.createElement('table'),
			trHead = document.createElement('tr');

		['result', 'test', 'message'].forEach(function(text) {
			var th = document.createElement('th');
			th.appendChild(document.createTextNode(text));
			trHead.appendChild(th);
		});

		table.appendChild(trHead);

		testResults.forEach(function(result) {
			var tr = document.createElement('tr');
			tr.className = (result.result === MUNIT.RESULT_YAY ? 'yay' : 'boo');

			var tdResult = document.createElement('td');
						tdResult.appendChild(document.createTextNode(result.result));
			tr.appendChild(tdResult);

			var tdTest = document.createElement('td');
			tdTest.appendChild(document.createTextNode(result.test));
			tr.appendChild(tdTest);

			var tdMessage = document.createElement('td');
			tdMessage.appendChild(document.createTextNode(result.message));
			tr.appendChild(tdMessage);
			tr.title = result.testCode;

			table.appendChild(tr);
		});

		return table;
	}
};

MUNIT.AssertException = function(message) {
	this.message = message;
}

MUNIT.Test = function(tests) {

	var tests = tests || [];

	this.assertTrue = function(value) {

		if(value !== true) {
			throw new MUNIT.AssertException('Expected true, got ' + value);
		}
	}

	this.assertEquals = function(expectedValue, actualValue) {
		if(expectedValue != actualValue) {
			throw new MUNIT.AssertException('Expected ' + expectedValue + ', got ' + actualValue);
		}
	}

	this.onSetup = function() {}
	this.onTearDown = function() {}

	this.runTests = function(params) {
		var munitTest = this,
			results = tests.map(function(test) {

			var result = MUNIT.RESULT_BOO,
				message = '';
			
			try {
				munitTest.onSetup();
				test.call(munitTest);
				munitTest.onTearDown();
				result = MUNIT.RESULT_YAY;
			} catch(e) {
				message = e.message;
			}

			return ({
				test: test.name,
				result: result,
				message: message,
				testCode: test.toString() 
			});
		});

		return results;
	}
}
