//  前++和 后++
let testPlus = 42
let testPlusA = ++testPlus
console.log(testPlus)
console.log(testPlusA)
let testPlusB = testPlus++
console.log(testPlus)
console.log(testPlusB)

//  语句
function vowels(str) {
	let matches
	if(str && (matches = str.match(/[aeiou]/g))){
		return matches;
	}
}
console.log(vowels('Hello World!'))