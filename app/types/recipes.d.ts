type Recipe = {
  id: number;
  gaps: string;
  tips: {
    green: string[];
    price: string[];
    health: string[];
    cooking: string[];
  };
  cheap: boolean;
  diets: string[];
  image: string;
  title: string;
  vegan: boolean;
  report: null | string; // Assuming 'report' can be either null or a string
  license: string;
  summary: string;
  approved: number;
  cuisines: string[];
  servings: number;
  userTags: string[];
  dairyFree: boolean;
  dishTypes: string[];
  imageType: string;
  lowFodmap: boolean;
  nutrition: {
    nutrients: Array<{
      name: string;
      unit: string;
      amount: number;
      percentOfDailyNeeds: number;
    }>;
    flavonoids: Array<{
      name: string;
      unit: string;
      amount: number;
    }>;
    properties: Array<{
      name: string;
      unit: string;
      amount: number;
    }>;
    ingredients: Array<{
      id: number;
      name: string;
      unit: string;
      amount: number;
      nutrients: Array<{
        name: string;
        unit: string;
        amount: number;
        percentOfDailyNeeds: number;
      }>;
    }>;
    caloricBreakdown: {
      percentFat: number;
      percentCarbs: number;
      percentProtein: number;
    };
    weightPerServing: {
      unit: string;
      amount: number;
    };
  };
  occasions: string[];
  sourceUrl: string;
  glutenFree: boolean;
  originalId: null | number; // Assuming 'originalId' can be either null or a number
  sourceName: string;
  vegetarian: boolean;
  creditsText: string;
  healthScore: number;
  openLicense: number;
  sustainable: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  winePairing: {
    pairedWines: string[];
    pairingText: string;
    productMatches: Array<{
      id: number;
      title: string;
      description: string;
      price: string;
      imageUrl: string;
      averageRating: number;
      ratingCount: number;
      score: number;
      link: string;
    }>;
  };
  instructions: string;
  aggregateLikes: number;
  cookingMinutes: number;
  readyInMinutes: number;
  pricePerServing: number;
  spoonacularScore: number;
  preparationMinutes: number;
  unknownIngredients: string[];
  extendedIngredients: Array<{
    id: number;
    meta: string[];
    name: string;
    unit: string;
    aisle: string;
    image: string;
    amount: number;
    measures: {
      us: {
        amount: number;
        unitLong: string;
        unitShort: string;
      };
      metric: {
        amount: number;
        unitLong: string;
        unitShort: string;
      };
    };
    original: string;
    nameClean: string;
    consistency: string;
    originalName: string;
  }>;
  suspiciousDataScore: number;
  analyzedInstructions: Array<{
    name: string;
    steps: Array<{
      step: string;
      number: number;
      equipment: Array<{
        id: number;
        name: string;
        image: string;
        localizedName: string;
        temperature?: {
          unit: string;
          number: number;
        };
      }>;
      ingredients: Array<{
        id: number;
        name: string;
        image: string;
        localizedName: string;
      }>;
      length?: {
        unit: string;
        number: number;
      };
    }>;
  }>;
  spoonacularSourceUrl: string;
  weightWatcherSmartPoints: number;
};

interface Equipment {
  id: number;
  name: string;
  image: string;
  localizedName: string;
  temperature?: {
    unit: string;
    number: number;
  };
}

interface Ingredient {
  id: number;
  name: string;
  image: string;
  localizedName: string;
}
