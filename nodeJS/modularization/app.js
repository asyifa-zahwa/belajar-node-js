const coffee = require("./lib/cofee");
const Tiger = require("./lib/tiger");
const { firstName, lastName } = require("./lib/user");
const Wolf = require("./lib/wolf");

console.log(coffee);
console.log(firstName, lastName)

const fighting = (tiger, wolf) => {
    if(tiger.strength > wolf.strength) {
      tiger.growl();
      return;
    }
   
    if(wolf.strength > tiger.strength) {
      wolf.howl();
      return;
    }
   
    console.log('Tiger and Wolf have same strength');
  }
   
  const tiger = new Tiger();
  const wolf = new Wolf();
   
  fighting(tiger, wolf);