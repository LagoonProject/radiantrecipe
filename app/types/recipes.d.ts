interface Recipe {
    id: number;
    gaps: string;
    tips: RecipeTips;
    cheap: boolean;
    diets: string[];
    image: string;
    title: string;
    vegan: boolean;
    report: null | string; // Adjust based on actual possible values
    license: string;
    summary: string;
    approved: number;
    cuisines: string[];
    servings: number;
    userTags: string[]; // Assuming this is an array of strings, adjust if the structure is different
    dairyFree: boolean;
    dishTypes: string[];
    imageType: string;
    lowFodmap: boolean;
    occasions: string[];
    sourceUrl: string;
    glutenFree: boolean;
    originalId: null | number; // Adjust based on actual possible values
    sourceName: string;
    vegetarian: boolean;
    creditsText: string;
    healthScore: number;
    openLicense: number;
    sustainable: boolean;
    veryHealthy: boolean;
    veryPopular: boolean;
    winePairing: WinePairing;
    instructions: string;
    aggregateLikes: number;
    cookingMinutes: number;
    readyInMinutes: number;
    pricePerServing: number;
    spoonacularScore: number;
    preparationMinutes: number;
    unknownIngredients: any[]; // Define based on actual structure or use any if structure is variable
    extendedIngredients: ExtendedIngredient[];
    analyzedInstructions: AnalyzedInstruction[];
    spoonacularSourceUrl: string;
    weightWatcherSmartPoints: number;
  }
  
  interface RecipeTips {
    green: string[];
    price: string[];
    health: string[];
    cooking: string[];
  }
  
  interface ExtendedIngredient {
    id: number;
    meta: string[];
    name: string;
    unit: string;
    aisle: string;
    image: string;
    amount: number;
    measures: {
      us: Measure;
      metric: Measure;
    };
    original: string;
    nameClean: string;
    consistency: string;
    originalName: string;
  }
  
  interface Measure {
    amount: number;
    unitLong: string;
    unitShort: string;
  }
  
  interface WinePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: ProductMatch[];
  }
  
  interface ProductMatch {
    id: number;
    link: string;
    price: string;
    score: number;
    title: string;
    imageUrl: string;
    description: string;
    ratingCount: number;
    averageRating: number;
  }
  
  interface AnalyzedInstruction {
    name: string;
    steps: Step[];
  }
  
  interface Step {
    step: string;
    number: number;
    length?: {
      number: number;
      unit: string;
    };
    equipment?: Equipment[];
    ingredients?: Ingredient[];
  }
  
  interface Equipment {
    id: number;
    name: string;
    image: string;
    localizedName: string;
  }
  
  interface Ingredient {
    id: number;
    name: string;
    image: string;
    localizedName: string;
  }