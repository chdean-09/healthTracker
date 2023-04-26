// Midterm Exam: OOP

// Group Members:
// Andrada, Chad Denard
// Dela Cruz, Stanhope

interface healthTrackerInterface {
  displayInfo(): void;
  recordStepCount(steps: number): void;
  calculateCaloriesBurned(): number;
  logWaterIntake(amountInOunces: number): void;
  logMeal(food: string, calories: number): void;
  recordSleep(sleepDuration: number): void;
  getBMI(): number;
  setAge(newAge: number): void;
  setWeight(newWeight: number): void;
  setHeight(newHeight: number): void;
}

abstract class healthTracker implements healthTrackerInterface {
  // 10 attributes with a protected access modifier
  protected name: string;
  protected gender: string;
  protected age: number;
  protected height: number;
  protected weight: number;
  protected sleepDuration: number[];
  protected steps: number[];
  protected waterIntake: number[];
  protected food: string[];
  protected calories: number[];

  constructor(name: string, gender: string, age: number, height: number, weight: number) {
    // the user cannot input a negative number, or else it would throw an error
    if (age < 0 || height < 0 || weight < 0) {
      throw new Error("Don't input negative numbers");
    }
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.sleepDuration = [];
    this.steps = [];
    this.waterIntake = [];
    this.food = [];
    this.calories = [];
  }

  // 10 methods, some are just placeholders for the child class to override
  public displayInfo(): void {
    console.log("Displays the general info of the user.");
  }
  
  public recordStepCount(steps: number): void {
    if (steps >= 0) {
      this.steps.push(steps);
    } else {
      throw new Error("Don't input negative numbers");
    }
  }

  public calculateCaloriesBurned(): number {
    if (this.gender === "Male") {
      return 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
    } else if (this.gender === "Female") {
      return 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.33 * this.age);
    } else {
      return 0; 
    }
  }

  public logWaterIntake(amountInOunces: number): void {
    if (amountInOunces >= 0) {
      this.waterIntake.push(amountInOunces);
    } else {
      throw new Error("Don't input negative numbers");
    }
  }

  // a placeholder, that's why this is just a console.log()
  public logMeal(food: string, calories: number): void {
    console.log("Allows the user to log their meals and calorie intake.");
  }

  public recordSleep(sleepDuration: number): void {
    if (sleepDuration >= 0) {
      this.sleepDuration.push(sleepDuration);
    } else {
      throw new Error("Don't input negative numbers");
    }
  }

  public getBMI(): number {
    let heightInMeter: number = this.height / 100;

    return (this.weight)/(heightInMeter ** 2);
  }

  // these methods allow the user to set a new age, weight, or height
  public setAge(newAge: number): void {
    this.age = newAge;
  }

  public setWeight(newWeight: number): void {
    this.weight = newWeight;
  }

  public setHeight(newHeight: number): void {
    this.height = newHeight;
  }
}

class myHealthApp extends healthTracker {
  constructor(name: string, gender: string, age: number, height: number, weight: number) {
    super(name, gender, age, height, weight);
  }

  // this overrides the displayInfo() from the parent class
  public override displayInfo(): void {
    console.log("==========HEALTH PROFILE==========");
    console.log(`Profile: ${this.name}`);
    console.log(`Gender: ${this.gender}`);
    console.log(`Age: ${this.age} years old`);
    console.log(`Height: ${this.height} cm`);
    console.log(`Weight: ${this.weight} kg`);
    console.log("--------");
    console.log(`BMI Profile: ${this.getBMIResult()}`);
    console.log(`BMR* (Basal Metabolic Rate): ${this.calculateCaloriesBurned().toFixed(0)} calories/day`);
    console.log("--------");
    console.log(`Average steps per day: ${this.getAverageSteps()} steps`);
    console.log(`Average water intake per day: ${this.getAverageWaterIntake().toFixed(1)} ounces`);
    console.log(`Average calories consumed: ${this.getAverageCalories().toFixed(0)} calories`);
    console.log(`Average sleep per night: ${this.getAverageSleepDuration().toFixed(1)} hours`);
    console.log("\n*BMR- calories burned per day just by existing");
    console.log("==================================");
  }

  // this overloads the logMeal(food: string, calories: number)
  // the user can input both the food and calories, but can also choose to just input food
  public override logMeal(food: string): void;
  public override logMeal(food: string, calories: number): void;
  public override logMeal(food: string, calories?: number): void {
    if (calories !== undefined) {
      this.food.push(food);

      if (calories >= 0) {
        this.calories.push(calories);
      } else {
        throw new Error("Don't input negative numbers");
      }
    } else {
      this.food.push(food);
    }
  }

  private getBMIResult(): string {
    if (this.getBMI() < 18.5) {
      return `${this.getBMI().toFixed(1)} (Underweight)`;
    } else if (this.getBMI() >= 18.5 && this.getBMI() < 24.9) {
      return `${this.getBMI().toFixed(1)} (Normal weight)`;
    } else if (this.getBMI() >= 25 && this.getBMI() < 29.9) {
      return `${this.getBMI().toFixed(1)} (Overweight)`;
    } else {
      return `${this.getBMI().toFixed(1)} (Obese)`;
    }
  }

  private getAverageSteps(): number {
    if (this.calories.length === 0) {
      return 0;
    } else {
      let total: number = 0;

      for (let i = 0; i < this.steps.length; i++) {
        total += this.steps[i];
      }

      return total / this.steps.length;
    }
  }

  private getAverageWaterIntake(): number {
    if (this.waterIntake.length === 0) {
      return 0;
    } else {
      let total: number = 0;

      for (let i = 0; i < this.waterIntake.length; i++) {
        total += this.waterIntake[i];
      }

      return total / this.waterIntake.length;
    }
  }

  private getAverageCalories(): number {
    if (this.calories.length === 0) {
      return 0;
    } else {
      let total: number = 0;

      for (let i = 0; i < this.calories.length; i++) {
        total += this.calories[i];
      }

      return total / this.calories.length;
    }
  }

  private getAverageSleepDuration(): number {
    if (this.sleepDuration.length === 0) {
      return 0;
    } else {
      let total: number = 0;

      for (let i = 0; i < this.sleepDuration.length; i++) {
        total += this.sleepDuration[i];
      }

      return total / this.sleepDuration.length;
    }
  }
}


class nutritionPal extends healthTracker {
  private protein: number[];
  private carbs: number[];
  private fat: number[];

  constructor(name: string, gender: string, age: number, height: number, weight: number) {
    super(name, gender, age, height, weight);
    this.protein = [];
    this.carbs = [];
    this.fat = [];
  }

  // overrides the displayInfo() from the parent class
  // also it displays a different info from the myHealthApp child class
  public override displayInfo(): void {
    console.log("=========NUTRITIONAL INFO=========");
    console.log(`Profile: ${this.name}`);
    console.log(`Gender: ${this.gender}`);
    console.log(`Age: ${this.age} years old`);
    console.log(`Height: ${this.height} cm`);
    console.log(`Weight: ${this.weight} kg`);
    console.log("--------");
    console.log(`Calorie breakdown:`);
    console.log(`  Protein           ${this.macroPercentage()[0].toFixed(2)}%`);
    console.log(`  Carbohydrates     ${this.macroPercentage()[1].toFixed(2)}%`);
    console.log(`  Fats              ${this.macroPercentage()[2].toFixed(2)}%`);
    console.log("--------");
    console.log(`Recommended range:`);
    console.log(`  Protein           10% to 35%`);
    console.log(`  Carbohydrates     45% to 65%`);
    console.log(`  Fats              20% to 35%`);
    console.log("==================================");
  }
  
  // overrides the logMeal(food: string, calories: number) from the parent class
  // this one also requires an input for protein, carbs, and fat
  public override logMeal(food: string, calories: number, protein?: number, carbs?: number, fat?: number): void {
    if (protein === undefined || carbs === undefined || fat === undefined) {
      throw new Error("Please input a valid value for calories, protein, carbs, and fats.")
    } else {
      this.food.push(food);

      if (calories >= 0 && protein >= 0 && carbs >= 0 && fat >= 0) {
        this.calories.push(calories);
        this.protein.push(protein);
        this.carbs.push(carbs);
        this.fat.push(fat);
      } else {
        throw new Error("Don't input negative numbers");
      }
    }
  }

  private totalCalories(): number {
    if (this.calories.length === 0) {
      return 0;
    } else {
      let totalCalories: number = 0;
    
      for (let i = 0; i < this.calories.length; i++) {
        totalCalories += this.calories[i];
      }

      return totalCalories;
    }
  }

  private proteinCalc(): number {
    if (this.calories.length === 0) {
      return 0;
    } else {
      let proteinCalories: number = 0;
    
      for (let i = 0; i < this.calories.length; i++) {
        proteinCalories += this.protein[i] * 4; //there are 4 calories per gram of protein
      }

      return proteinCalories;
    }
  }

  private carbohydratesCalc(): number {
    if (this.calories.length === 0) {
      return 0;
    } else {
      let carbsCalories: number = 0;
    
      for (let i = 0; i < this.calories.length; i++) {
        carbsCalories += this.carbs[i] * 4;     //there are 4 calories per gram of carbohydrate
      }

      return carbsCalories;
    }
  }

  private fatCalc(): number {
    if (this.calories.length === 0) {
      return 0;
    } else {
      let fatCalories: number = 0;
    
      for (let i = 0; i < this.calories.length; i++) {
        fatCalories += this.fat[i] * 9;         //there are 9 calories per gram of fat
      }

      return fatCalories;
    }
  }

  private macroPercentage(): number[] {
    if (this.calories.length === 0) {
      return [0, 0, 0];
    } else {
      let proteinPercentage: number = (this.proteinCalc() / this.totalCalories()) * 100;
      let carbsPercentage: number = (this.carbohydratesCalc() / this.totalCalories()) * 100;
      let fatPercentage: number = (this.fatCalc() / this.totalCalories()) * 100;
      let totalPercentage: number = proteinPercentage + carbsPercentage + fatPercentage;

      let newProteinPercentage: number = (this.proteinCalc() / (this.totalCalories() * (totalPercentage / 100))) * 100;
      let newCarbsPercentage: number = (this.carbohydratesCalc() / (this.totalCalories() * (totalPercentage / 100))) * 100;
      let newFatPercentage: number = (this.fatCalc() / (this.totalCalories() * (totalPercentage / 100))) * 100;
      
      return [newProteinPercentage, newCarbsPercentage, newFatPercentage];
    }
  }
}

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
