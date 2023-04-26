import { healthTrackerInterface } from "./healthTrackerInterface";

export abstract class healthTracker implements healthTrackerInterface {
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