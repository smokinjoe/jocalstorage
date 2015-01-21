var Person = function (name) {
  this.name = name;
  this.type = 'Person';
};

var names = ['Joe', 'Eric', 'Brian', 'Chris', 'Pat', 'Sean'];
var people = [];
for (var index in names) {
  if (names.hasOwnProperty(index)) {
    var name = names[index];
    var person = new Person(name);
    people.push(person);
  }
}