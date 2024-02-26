import { Dispatch, SetStateAction } from "react";

export function calculateAge(dob: string | undefined) {
  if (dob) {
    const birthDate = new Date(dob);

    console.log("birthDate", birthDate);

    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    console.log("age", age);

    const m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    console.log("age2", age);

    return age;
  }
}

export function convertHeightToInches(feet: string, inches: string) {
  // Check if feet or inches are empty strings and default them to 0 if true
  const feetAsNumber = feet === "" ? 0 : parseFloat(feet);
  const inchesAsNumber = inches === "" ? 0 : parseFloat(inches);

  // Return the total height in inches
  return feetAsNumber * 12 + inchesAsNumber;
}

export function truncateNumber(num: number) {
  return Math.floor(num * 10) / 10;
}

function getActivityMultiplier(activityLevel: string) {
  switch (activityLevel) {
    case "sedentary":
      return 1.2; // Sedentary (BMR × 1.2)
    case "lightly":
      return 1.375; // Lightly Active (BMR × 1.375)
    case "moderately":
      return 1.55; // Moderately Active (BMR × 1.55)
    case "very":
      return 1.725; // Very Active (BMR × 1.725)
    case "extra":
      return 1.9; // Extra Active (BMR × 1.9)
    default:
      return 1;
  }
}

export function calculateTDEE(
  tdeeInfo: {
    heightCm: string;
    heightInches: string;
    weight: string;
    date_of_birth: string;
    gender: string;
    units: string;
    activityLevel: string;
  },
  setTdee: Dispatch<SetStateAction<number>>
) {

  console.log("calculateTDEE tdeeInfo", tdeeInfo)
  const userAge = calculateAge(tdeeInfo.date_of_birth);

  const heightFt = tdeeInfo.heightInches ? tdeeInfo.heightInches[0] : '0';
  const heightIn = tdeeInfo.heightInches ? tdeeInfo.heightInches[4] : '0';

  const userInchesHeight = convertHeightToInches(heightFt, heightIn);

  const tdeeMutiplier = getActivityMultiplier(tdeeInfo.activityLevel);

  function internationalBMRFormula() {
    // kilos
    // For woman : BMR=10×weight in kg+6.25×height in cm−5×age in years−161
    // For man : BMR=10×weight in kg+6.25×height in cm−5×age in years+5

    if (tdeeInfo.gender === "female" && tdeeInfo.heightCm.length > 0) {
      const bmrCalc =
        10 * parseFloat(tdeeInfo.weight) +
        6.25 * parseFloat(tdeeInfo.heightCm) -
        5 * userAge! -
        161;

      const tdee = bmrCalc * tdeeMutiplier;

      setTdee(Math.round(tdee));
    } else if (tdeeInfo.gender === "male" && tdeeInfo.heightCm.length > 0) {
      const bmrCalc =
        10 * parseFloat(tdeeInfo.weight) +
        6.25 * parseFloat(tdeeInfo.heightCm) -
        5 * userAge! +
        5;

      console.log("tdeeCalc", bmrCalc);

      const tdee = bmrCalc * tdeeMutiplier;

      setTdee(Math.round(tdee));
    }
  }

  function americanBMRFormula() {
    //pounds
    // For woman : BMR=655.1+(4.35×weight in pounds)+(4.7×height in inches)−(4.7×age in years)
    // For Men: BMR=66.5+(6.23×weight in pounds)+(12.7×height in inches)−(6.8×age in years)

    if (tdeeInfo.gender === "female") {
      const bmrCalc =
        655.1 +
        4.35 * parseFloat(tdeeInfo.weight) +
        4.7 * userInchesHeight -
        4.7 * userAge!;

      const tdee = bmrCalc * tdeeMutiplier;

      setTdee(tdee);
    } else if (tdeeInfo.gender === "male") {
      const bmrCalc =
        66.5 +
        6.23 * parseFloat(tdeeInfo.weight) +
        12.7 * userInchesHeight -
        6.8 * userAge!;

      const tdee = bmrCalc * tdeeMutiplier;

      setTdee(tdee);
    }
  }
  if (tdeeInfo.units === "international") {
    internationalBMRFormula();
  } else if (tdeeInfo.units === "american") {
    americanBMRFormula();
  }
}
