var suits = ["hearts", "spades", "clubs", "diamonds"];
// 定义实现签名
function greet(person) {
    if (typeof person === 'string') {
        return "Hello, ".concat(person, "!");
    }
    else if (Array.isArray(person)) {
        return person.map(function (name) { return "Hello, ".concat(name, "!"); });
    }
    throw new Error('Unable to greet');
}
console.log(greet(suits[0]));
console.log(greet(suits));
