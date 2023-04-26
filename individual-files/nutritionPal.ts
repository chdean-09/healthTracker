import { healthTracker } from "./healthTracker";

export class nutritionPal extends healthTracker {
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