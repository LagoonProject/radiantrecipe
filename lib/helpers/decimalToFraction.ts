export function xdecimalToFraction(decimal: number): string {
  // Check for known repeating decimals and round accordingly
  const knownFractions = [
    { lowerBound: 0.333, upperBound: 0.36, fraction: "1/3" },
    { lowerBound: 0.666, upperBound: 0.667, fraction: "2/3" },
    // Add more known repeating fractions as needed
  ];

  for (const fraction of knownFractions) {
    if (decimal >= fraction.lowerBound && decimal <= fraction.upperBound) {
      return fraction.fraction;
    }
  }

  // Check if the number is a whole number
  if (decimal % 1 === 0) {
    return decimal.toString(); // Return the number as a string if it's a whole number.
  }

  if (decimal > 1) {
    return (Math.round(decimal * 100) / 100).toString();
  }

  if (decimal < 0.1) {
    return (Math.round(decimal * 100) / 100).toString();
  }

  const tolerance = 1e-6; // Adjust tolerance for precision
  let denominator = 1;
  while (Math.abs(decimal - Math.round(decimal)) > tolerance) {
    decimal *= 10;
    denominator *= 10;
  }

  let numerator = Math.round(decimal);
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a); // Function to find the GCD

  // Simplify the fraction
  const greatestCommonDivisor = gcd(numerator, denominator);
  numerator /= greatestCommonDivisor;
  denominator /= greatestCommonDivisor;

  if (denominator === 1) {
    return `${numerator}`; // Return as whole number if denominator is 1
  }
  return `${numerator}/${denominator}`; // Return as fraction
}

// function approximateFraction(decimal: number, maxDenominator: number) {
//   let numerator = 1;
//   let denominator = 1;
//   let minError = Math.abs(decimal - numerator / denominator);

//   for (let d = 2; d <= maxDenominator; d++) {
//     const n = Math.round(decimal * d);
//     const error = Math.abs(decimal - n / d);

//     if (error < minError) {
//       minError = error;
//       numerator = n;
//       denominator = d;
//     }
//   }

//   return [numerator, denominator];
// }

// export function decimalToFraction(ml: number, maxDenominator: number) {
//   const oz = ml * 0.033814;
//   const integerPart = Math.floor(oz);
//   const decimalPart = oz - integerPart;
//   const [numerator, denominator] = approximateFraction(
//     decimalPart,
//     maxDenominator
//   );
//   const ozFraction = numerator !== 0 ? `${numerator}/${denominator}` : "";
//   return `${integerPart === 0 ? "" : integerPart}${
//     ozFraction ? " " : ""
//   }${ozFraction}`;
// }

export function decimalToFraction(decimal: number): string {
  console.log("decimalToFraction", decimal);

  const knownFractions = [
    { lowerBound: 0.23, upperBound: 0.27, fraction: "1/4" },
    { lowerBound: 0.32, upperBound: 0.36, fraction: "1/3" },
    { lowerBound: 0.48, upperBound: 0.52, fraction: "1/2" },
    { lowerBound: 0.63, upperBound: 0.67, fraction: "2/3" },
    { lowerBound: 0.74, upperBound: 0.77, fraction: "3/4" },
  ];

  function getFraction(number: number) {

    console.log("getFraction number", number)
    for (const fraction of knownFractions) {
      if (number >= fraction.lowerBound && number <= fraction.upperBound) {

        console.log("if (number >= fraction.lowerBound && number <= fraction.upperBound) {", number >= fraction.lowerBound && number <= fraction.upperBound, fraction.fraction)
        return fraction.fraction;
      }
    }
  }

  const decimalToFraction = getFraction(decimal);

  if (decimalToFraction) {
    return decimalToFraction;
  }

  if (decimal % 1 === 0) {
    return decimal.toString(); // Return the number as a string if it's a whole number.
  }

  if (decimal > 1) {
    console.log("decimal > 1", decimal);

    const integerPart = Math.floor(decimal);
    const decimalPart = "0." + decimal.toString().split(".")[1];

    console.log("integerPart > 1", integerPart);
    console.log("decimalPart > 1", decimalPart);

    const decimalToFraction = getFraction(parseFloat(decimalPart));

    console.log("getFraction decimal > 1", decimalToFraction);

    if (decimalToFraction) {
      console.log(
        "decimalToFraction return ",
        integerPart + " " + decimalToFraction
      );

      return integerPart + " " + decimalToFraction;
    }
    return (Math.round(decimal * 100) / 100).toString();
  }

  if (decimal < 0.1) {
    return (Math.round(decimal * 100) / 100).toString();
  }
  return (Math.round(decimal * 100) / 100).toString();
}
