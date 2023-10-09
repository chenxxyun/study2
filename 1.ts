var suits = ["hearts", "spades", "clubs", "diamonds"];
// 定义重载签名
function greet(person: string): string;
function greet(persons: string[]): string[];
// 定义实现签名
function greet(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hello, ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hello, ${name}!`);
    }
    throw new Error('Unable to greet');
}
console.log(greet(suits[0]));
console.log(greet(suits));
console.log(greet(suits));
console.log(greet(suits));
console.log(greet(suits));
console.log(greet(suits));
console.log(greet(suits));
console.log(greet(suits));
console.log(greet(suits));
console.log(greet(suits));
console.log('这是修改');

console.log(greet(suits));
console.log(greet(suits));