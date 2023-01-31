---
lang: 'en'
slug: '/B8B3B3'
---

## Division

source: hackingwithswift.com

```swift
let weeks = 465 / 7
print("There are \(weeks) weeks until the event.")
// 66
```

```swift
let weeks: Double = 465 / 7
print("There are \(weeks) weeks until the event.")
// 66.42857142857143
```

```
let weeks = 465 / 7
let days = 465 % 7
print("There are \(weeks) weeks and \(days) days until the event.")
```

## While

```swift
while (condition){
  // body of loop
}
```

```swift
repeat {
  // body of loop
} while (condition)
```

Same as do-while loop

## For

[Swift for Loop (with Examples)](https://www.programiz.com/swift-programming/for-in-loop)

```swift
// access items of an array
let languages = ["Swift", "Java", "Go", "JavaScript"]

for language in languages {
      print(language)
}
```

```swift
// iterate from i = 1 to 1 = 3
for i in 1...3 {
    print(i)
}
```

Range requires lowerBound <= upperBound

```swift
for i in stride(from: 1, to: 10, by: 2) {
    print(i)
}
```

## Dict

[Swift - Dictionaries](https://www.tutorialspoint.com/swift/swift_dictionaries.htm)

```swift
// creating empty dict
var someDict = [KeyType: ValueType]()

// creating prefilled dict
var someDict:[Int:String] = [1:"One", 2:"Two", 3:"Three"]

// filtering
var closeCities = cityDistanceDict.filter { $0.value < 1000 }

// Grouping an Array

var cities = ["Delhi","Bangalore","Hyderabad","Dehradun","Bihar"]
var GroupedCities = Dictionary(grouping: cities ) { $0.first! }
// ["D" :["Delhi","Dehradun"], "B" : ["Bengaluru","Bihar"], "H" : ["Hyderabad"]]

// remove
someDict.removeValue(forKey: 2)
// or simply
someDict[2] = nil

// enumerate
var myDictionary:[String:Int] = ["Mohan":75, "Raghu":82, "John":79]
for (idx, (key, value)) in myDictionary.enumerated() {
   print("\(idx): key is \(key), value is \(value)")
}
```

## Set

```swift
let ingredients: Set = ["cocoa beans", "sugar", "cocoa butter", "salt"]if ingredients.contains("sugar") { print("No thanks, too sweet.")}

// when init-ing empty set, must configure the type
Set<Int>()

.isEmpty
.count
.insert
let shortNames = cast.filter { $0.count < 5 }

// removing
var ingredients: Set = ["cocoa beans", "sugar", "cocoa butter", "salt"]
let toRemove = "sugar"
if let removed = ingredients.remove(toRemove) {
    print("The recipe is now \(removed)-free.")
}
```

Accessing the value of a Swift Dict will return Optional.

## Stacks and Queues

```swift
list.popLast();
list.remove(at: <Int>
list.insert(newElement: <Int>, at: <Int>)
```

## Iterate String in Swift

```swift
var hello = "Hello World!"

for (idx, char) in hello.enumerated() {
    print(char)
}
```

## Map an Array

- [How to use map() to transform an array - free Swift 5.4 example code and tips](https://www.hackingwithswift.com/example-code/language/how-to-use-map-to-transform-an-array)

```swift
let strings = ["John", "Paul", "George", "Ringo"]
let uppercased = strings.map { $0.uppercased() }
```

## Checking Type

```swift
type(of: char)
```

## Sort

```swift
starts.sort()

// sort by custom function
images.sorted { $0.fileId > $1.fileID }
```

## String Index

```swift
string[String.Index(encodedOffset: index)]
```

## Array Cut

```swift
Array(coordinates[..<k]) // first k elements
```
