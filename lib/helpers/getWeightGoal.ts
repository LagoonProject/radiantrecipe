export function getWeightGoal(iWantTo: string) {
  switch (iWantTo) {
    case "maintain weight":
      return "maintain my current weight";
    case "lose weight fast":
      return "0.9kg (2 pounds)";
    case "lose weight in a sustainable way":
      return "0.45kg (1 pound)";
  }
}

export function getTDEETarget(tdee: number | undefined, iWantTo: string) {
  if (tdee) {
    switch (iWantTo) {
      case "maintain weight":
        return tdee;
      case "lose weight fast":
        return tdee - 1000;
      case "lose weight in a sustainable way":
        return tdee - 500;
    }
  }
}

export function getWeightLossGoalFromTdee(tdee: number, tdeeTarget: number) {
  if (tdee - tdeeTarget > 0 && tdee - tdeeTarget <= 500) {
    return "losing 0.45kg (1 pound)";
  } else if (tdee - tdeeTarget > 500 && tdee - tdeeTarget <= 1000) {
    return "losing 0.9kg (2 pounds)";
  } else if (tdee - tdeeTarget === 0) {
    return "maintaining my current weight";
  } else if (tdee - tdeeTarget < 0) {
    return "gaining weight";
  }
}
