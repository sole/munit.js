// munit.js // microunit testing for javascript //
// http://github.com/sole/munit.js
var MUNIT = MUNIT || {
	VERSION : 2,
	RESULT_YAY: 'yay',
	RESULT_BOO: 'boo',

	prettyFormat: function(testResults) {
		var resultElement = document.createElement('div'),
			th = '',
			tr = '';

		['result', 'test', 'message'].forEach(function(text) {
			th += '<th>' + text + '</th>';
		});

		testResults.forEach(function(result) {
			tr += '<tr class="' + result.result + '" title="' + result.testCode + '">'
				+ '<td>' + result.result + '</td>'
				+ '<td>' + result.test + '</td>'
				+ '<td>' + result.message + '</td>'
				+ '</tr>';
		});

		resultElement.innerHTML = '<table><thead><tr>' + th + '</tr></thead><tbody>' + tr + '</tbody></table>';
		return resultElement.childNodes;
	}
};

MUNIT.AssertException = function(message) {
	this.message = message;
}

MUNIT.Test = function(tests) {

	tests = tests || [];

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
