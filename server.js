const express=require('express');
const mongoose=require('mongoose');
const app = express()
const Person=require("./models/personSchema.js");

app.use(express.json())
mongoose.connect("mongodb+srv://medtouzii:med_touzi@cluster0.jwmi0qw.mongodb.net/mongooseTest?retryWrites=true&w=majority",
 { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB Atlas');
      
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB Atlas:', error);
    });

    app.listen(5001,()=>console.log("listening on port 5001"));


    //Create and Save a Record of a Model:

    const createAndSavePerson = () => {
        const John = new Person({
            name: 'John Doe',
            age: 30,
            favoriteFoods: ['Pizza', 'Burger']
             });
            John.save((err, data) => {
          if (err) return console.error(err);
          else console.log(data);
        });
      };


      //Create Many Records with model.create()
      const arrayOfPeople = [
        { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
        { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
        { name: "Robert", age: 78, favoriteFoods: ["wine"] },
      ];
      
      const createManyPeople = (arrayOfPeople, done) => {
        Person.create(arrayOfPeople, (err, people) => {
          if (err) return console.log(err);
          done(null, people);
        });
      };
      createManyPeople;
//Use model.find() to Search Your Database

      const findPeopleByName = (personName, done) => {
        Person.find({ name: "Frankie" }, (err, personFound) => {
          if (err) return console.log(err);
          done(null, personFound);
        });
      };
//Use model.findOne() to Return a Single Matching Document from Your Database
      const findOneByFood = (food, done) => {
        Person.findOne({ favoriteFoods: food }, (err, data) => {
          if (err) return console.log(err);
          done(null, data);
        });
      };
//Use model.findById() to Search Your Database By _id

      const findPersonById = (personId, done) => {
        Person.findById(personId, (err, data) =>
          err ? console.log(err) : done(null, data)
        );
      };
//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, (err, data) => {
      if (err) return console.log(err);
      data.favoriteFoods.push(foodToAdd);
      data.save((err, dataNext) =>
        err
          ? console.error("error saving data: ", err.message)
          : done(null, dataNext)
      );
    });
  };
//Perform New Updates on a Document Using model.findOneAndUpdate()
  const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
  
    Person.findOneAndUpdate(
      { name: personName },
      { $set: { age: ageToSet } },
      { new: true },
      (err, data) => (err ? done(err, data) : done(null, data))
    );
  };

  //Delete One Document Using model.findByIdAndRemove

  const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) =>
      err ? done(err, data) : done(null, data)
    );
  };
  //MongoDB and Mongoose - Delete Many Documents with model.remove()
  const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, (err, data) =>
      err ? done(err, data) : done(null, data)
    );
  };
//Chain Search Query Helpers to Narrow Search Results

  const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, dataNext) =>
        err
          ? console.error("error getting data: ", err.message)
          : done(null, dataNext)
      );
  };