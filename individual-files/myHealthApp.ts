import { healthTracker } from "./healthTracker";

export class myHealthApp extends healthTracker {
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