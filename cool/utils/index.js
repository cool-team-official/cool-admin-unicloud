export const revisePath = (path) => {
	if (!path) {
		return ""
	}

	if (path[0] == "/") {
		return path
	} else {
		return `/${path}`
	}
}

export function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return decodeURIComponent(r[2])
	return null
}

export function firstMenu(list) {
	let path = ""

	const fn = (arr) => {
		arr.forEach((e) => {
			if (e.type == 1) {
				if (!path) {
					path = e.path
				}
			} else {
				fn(e.children)
			}
		})
	}

	fn(list)

	return path || "/404"
}

export function isPc() {
	const userAgentInfo = navigator.userAgent
	const Agents = [
		"Android",
		"iPhone",
		"SymbianOS",
		"Windows Phone",
		"iPad",
		"iPod",
	]
	let flag = true
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false
			break
		}
	}
	return flag
}

export function orderBy(list, key) {
	return list.sort((a, b) => a[key] - b[key])
}

export function deepTree(list) {
	let newList = []
	let map = {}

	list.forEach((e) => (map[e.id] = e))

	list.forEach((e) => {
		let parent = map[e.parentId]

		if (parent) {
			;(parent.children || (parent.children = [])).push(e)
		} else {
			if (!e.parentId) {
				newList.push(e)
			}
		}
	})

	const fn = (list) => {
		list.map((e) => {
			if (e.children instanceof Array) {
				e.children = orderBy(e.children, "orderNum")

				fn(e.children)
			}
		})
	}

	fn(newList)

	return orderBy(newList, "orderNum")
}

export function revDeepTree(list = []) {
	let d = []

	const deep = (list) => {
		list.forEach((e) => {
			d.push(e)

			if (e.children && isArray(e.children)) {
				deep(e.children)
			}
		})
	}

	deep(list || [])

	return d
}

export function debounce(fn, delay) {
	let timer = null

	return function () {
		let args = arguments
		let context = this

		if (timer) {
			clearTimeout(timer)

			timer = setTimeout(function () {
				fn.apply(context, args)
			}, delay)
		} else {
			timer = setTimeout(function () {
				fn.apply(context, args)
			}, delay)
		}
	}
}

export function isArray(value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value)
	} else {
		return Object.prototype.toString.call(value) === "[object Array]"
	}
}

export function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]"
}

export function isNumber(value) {
	return !isNaN(Number(value))
}

export function isFunction(value) {
	return typeof value == "function"
}

export function isString(value) {
	return typeof value == "string"
}

export function isEmpty(value) {
	if (isArray(value)) {
		return value.length === 0
	}

	if (isObject(value)) {
		return Object.keys(value).length === 0
	}

	return value === "" || value === undefined || value === null
}

export function cloneDeep(obj) {
	let d = isArray(obj) ? obj : {}

	if (isObject(obj)) {
		for (let key in obj) {
			if (obj.hasOwnProperty && obj.hasOwnProperty(key)) {
				if (obj[key] && typeof obj[key] === "object") {
					d[key] = cloneDeep(obj[key])
				} else {
					d[key] = obj[key]
				}
			}
		}
	}

	return d
}

export function clone(obj) {
	return Object.create(
		Object.getPrototypeOf(obj),
		Object.getOwnPropertyDescriptors(obj)
	)
}

export function certainProperty(obj, keys) {
	return keys.reduce((result, key) => {
		if (obj.hasOwnProperty(key)) {
			result[key] = obj[key]
		}

		return result
	}, {})
}

export function deepMerge(a, b) {
	let k
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]"
				? deepMerge(a[k], b[k])
				: (a[k] = b[k])
	}
	return a
}

export function contains(parent, node) {
	if (document.documentElement.contains) {
		return parent !== node && parent.contains(node)
	} else {
		while (node && (node = node.parentNode))
			if (node === parent) return true
		return false
	}
}

export function moreList(res, { list, pagination }) {
	const { page, size } = res.pagination
	const len = res.list.length
	const max = list.length

	if (page == 1) {
		list.splice(0, max, ...res.list)
	} else {
		let start = max - (max % size)
		let end = start + len

		list.splice(start, end, ...res.list)
	}

	if (len == size) {
		res.pagination.page += 1
	}

	Object.assign(pagination, res.pagination)

	return page != 1
}
