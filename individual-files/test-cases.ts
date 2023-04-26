import { myHealthApp } from "./myHealthApp";
import { nutritionPal } from "./nutritionPal";

//name, gender, age, height (in cm), weight (in kg)
const person1Health: myHealthApp = new myHealthApp("Stanhope Dela Cruz","Male",20,162,74);
person1Health.logMeal("Rice", 30);
person1Health.logWaterIntake(6.5);
person1Health.logMeal("Spaghetti", 221);
person1Health.logWaterIntake(8.3);
person1Health.logMeal("Burgers");
person1Health.logWaterIntake(7.1);
person1Health.logMeal("Pizza", 187);
person1Health.logWaterIntake(7.8);
person1Health.logMeal("Hotdog");
person1Health.recordStepCount(10019);
person1Health.recordSleep(4.9);
person1Health.recordStepCount(463);
person1Health.recordSleep(9.2);
person1Health.recordStepCount(870);
person1Health.recordSleep(7.1);

person1Health.displayInfo();

//food name, calories (in kcal), protein, carbs, fat (in grams)
const person1Nutrition: nutritionPal = new nutritionPal("Chad Andrada","Male",20,176,63);
person1Nutrition.logMeal("Noodles", 30, 15, 21, 8);
person1Nutrition.logMeal("Cake", 73, 18, 38, 11);
person1Nutrition.logMeal("Biscuits", 23, 14, 20, 7);
person1Nutrition.logMeal("Rice", 37, 11, 26, 5);
person1Nutrition.logMeal("Pasta", 50, 26, 41, 4);
person1Nutrition.logMeal("Pizza", 150, 35, 71, 15);

person1Nutrition.displayInfo();