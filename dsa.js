$(document).ready(function() {

	var requestAnimationFrame =  
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(callback) {
			return setTimeout(callback, 1);
		};

	var data = [];

	$('#btnRandom').on('click', function(){
		init();
	});

	$('#btnBubble').on('click', function(){
		$('#txtLines').val('');
		$('#txtFinal').val('');
		$('#txtBigO').val('');

		$('#txtBigO').val(bubblesort(data));
		$('#txtFinal').val(data.toString());
	});

	$('#btnMerge').on('click', function(){
		$('#txtLines').val('');
		$('#txtFinal').val('');
		$('#txtBigO').val('');

		$('#txtBigO').val(mergesort(data, 0, data.length - 1));
		$('#txtFinal').val(data.toString());
	});

	$('#btnQuick').on('click', function(){
		$('#txtLines').val('');
		$('#txtFinal').val('');
		$('#txtBigO').val('');

		$('#txtBigO').val(quicksort(data, 0, data.length - 1));
		$('#txtFinal').val(data.toString());
	});

	function bubblesort(d) {
		var o = 0;
		for (var i = 0; i < d.length; i++) {
			for (var j = i; j < d.length; j++, o++) {
				if (d[i] >= d[j]) {
					var t = d[i];
					d[i] = d[j];
					d[j] = t;
					$('#txtLines').val($('#txtLines').val() + d.toString() + '\n');
				}
			}
		}
		return o;
	}

	function mergesort(d, l) {
		if (d.length < l) {
			return;
		}
		for (var i = 0; i < (l/2); i++) {
			if (d[i]) {
				var t = d[i];
				d[i] = d[j];
				d[j] = t;
			}
		}
		mergesort(d, l*2);
	}

	function mlp(inputs, targets, n_input, n_hidden) {

		var mse = Number.POSITIVE_INFINITY;

		var eta = 0.7;

		// stop criterium
		var max_mse = 100;
		var max_iteration = 100;

		var w_i = new Array();
		var w_h = new Array();
		var h = new Array();

		// initialize weights
		for (var i = 0; i < n_input; i++) {
			w_i[i] = new Array();
			for (var j = 0; j < n_hidden; j++) {
				w_i[i][j] = Math.random();
			}
		}
		for (var i = 0; i < n_hidden; i++) {
			w_o[i] = Math.random();
		}

		for (var n = 0; n < max_iteration || mse >= max_mse; n++) {

			mse = 0;

			// forward propagation
			for (var s = 0; s < input.length; s++) {
				// hidden layer
				for (var i = 0; i < n_input; i++) {
					h[i] = +1; // bias
					// matrix
					for (var j = 1; j <= n_hidden; j++) {
						h[i] += w_i[i][j - 1] * input[s][i];
					}
					h[i] = 1/(1 + Math.exp(-h[i])); // sigmoid
				}

				// output layer
				var o = +1; // bias
				for (var i = 1; i <= n_hidden; i++) {
					o += w_h[i] * h[i - 1];
				}
				o = 1/(1 + Math.exp(-o)); // sigmoid function
				mse += Math.pow((o - t[s]),2); // summarization
			}

			mse = mse / (2 * input.length);

			// backpropagation
			for (var i = 0; i < n_hidden; i++) {
				w_h[i] += eta * mse * (Math.exp(h[i])/Math.pow(Math.exp(h[i]) + 1, 2));
			}
			for (var i = 0; i < n_input; i++) {
				for (var j = 0; j < n_hidden; j++) {
					w_i[i][j] += eta * mse * (Math.exp(input[s][i])/Math.pow(Math.exp(input[s][i]) + 1, 2));;
				}
			}

		}


	}

	function quicksort(d, low, high) {
		var o = 0;
		if (low >= high) {
			return 0;
		}
		var l = low;
		var r = high;
		var p = l;
		while (l < r) {
			while (p < r) {
				o++;
				if (d[p] > d[r]) {
					var t = d[r];
					d[r] = d[p];
					d[p] = t;
					l = ++p;
					p = r;					
					break;
				}
				r--;
			} 
			while (p > l) {
				o++;
				if (d[p] < d[l]) {
					var t = d[l];
					d[l] = d[p];
					d[p] = t;
					r = --p;
					p = l;					
					break;
				}
				l++;
			}
		}
		$('#txtLines').val($('#txtLines').val() + d.toString() + '\n');

		o += quicksort(d, low, p-1);
		o += quicksort(d, p+1, high);
		return o;
	}




	function init() {

		var n = parseInt($('#txtNumber').val());
		
		$('#txtLines').val('');
		$('#txtFinal').val('');
		$('#txtBigO').val('');

		data = [];
		for (var i = 0; i < n; i++) {
			data[i] = getRandomIntInclusive(0, n);
		}
		$('#txtInitial').val(data.toString());

	}

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	init();

});
