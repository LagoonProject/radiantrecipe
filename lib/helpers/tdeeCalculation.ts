export function calculateAge(dob: string) {
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

  export  function convertHeightToInches(feet: string, inches: string) {
    // Check if feet or inches are empty strings and default them to 0 if true
    const feetAsNumber = feet === "" ? 0 : parseFloat(feet);
    const inchesAsNumber = inches === "" ? 0 : parseFloat(inches);

    // Return the total height in inches
    return feetAsNumber * 12 + inchesAsNumber;
  }

  export function truncateNumber(num: number) {
    return Math.floor(num * 10) / 10;
  }