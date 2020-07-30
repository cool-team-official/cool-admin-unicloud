export function calcDescartes(array) {
	if (array.length < 2) return array[0] || [];
	return [].reduce.call(array, function (col, set) {
		let res = [];
		col.forEach(function (c) {
			set.forEach(function (s) {
				let t = [].concat(Array.isArray(c) ? c : [c]);
				t.push(s);
				res.push(t);
			});
		});
		return res;
	});
}

export function deepMerge(a, b) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
}
