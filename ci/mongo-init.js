db = db.getSiblingDB("sampledb");
db.sampleCollection.insertMany([
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "Chicago" }
]);
