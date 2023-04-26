export interface healthTrackerInterface {
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