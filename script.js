document.getElementById('submitBtn').addEventListener('click', function () {
  // Get form values
  const ageInput = document.getElementById('age');
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const genderInput = document.getElementById('gender');
  const activityInput = document.getElementById('activity');
  const goalInput = document.getElementById('goal');

  // Parse input values as numbers
  const age = parseInt(ageInput.value, 10);
  const weight = parseInt(weightInput.value, 10);
  let height = parseInt(heightInput.value, 10); // Make sure we are parsing the height correctly
  const gender = genderInput.value;
  const activity = parseFloat(activityInput.value);
  const goal = goalInput.value;

  // Function to set border color for invalid fields
  function setError(input, hasError) {
    input.style.borderColor = hasError ? 'red' : '#00d4ff'; // Red for errors, blue for valid
  }

  // Validation flags
  let hasError = false;

  // Validate age
  if (!age || age < 10 || age > 100) {
    setError(ageInput, true);
    hasError = true;
  } else {
    setError(ageInput, false);
  }

  // Validate weight
  if (!weight || weight < 30 || weight > 300) {
    setError(weightInput, true);
    hasError = true;
  } else {
    setError(weightInput, false);
  }

  // Validate height (ensure height is a valid number and within range)
  if (!height || height < 100 || height > 250) {
    setError(heightInput, true);
    hasError = true;
  } else {
    setError(heightInput, false);
  }

  // Validate gender
  if (!gender) {
    setError(genderInput, true);
    hasError = true;
  } else {
    setError(genderInput, false);
  }

  // Validate activity level
  if (isNaN(activity) || activity <= 0) {
    setError(activityInput, true);
    hasError = true;
  } else {
    setError(activityInput, false);
  }

  // Validate fitness goal
  if (!goal) {
    setError(goalInput, true);
    hasError = true;
  } else {
    setError(goalInput, false);
  }

  // If any error exists, exit early
  if (hasError) {
    return;
  }

  // Check if height is valid and log it
  if (isNaN(height)) {
    console.error("Invalid height value");
    return;
  }
  
  // Debugging: Log height to check for issues
  console.log(`Height: ${height}`);

  // Ideal weight range calculation
  const minIdealWeight = Math.round(18.5 * (height / 100) ** 2);
  const maxIdealWeight = Math.round(24.9 * (height / 100) ** 2);

  // Debugging: Log ideal weight range
  console.log(`Min Ideal Weight: ${minIdealWeight}, Max Ideal Weight: ${maxIdealWeight}`);

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  const bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  // Debugging: Log BMR value
  console.log(`BMR: ${bmr}`);

  // Total Daily Energy Expenditure (TDEE) adjusted for activity level
  const tdee = Math.round(bmr * activity);

  // Debugging: Log TDEE value
  console.log(`TDEE: ${tdee}`);

  // Target calories based on fitness goal
  let targetCalories;
  if (goal === 'lose') {
    targetCalories = tdee - 500; // 500 calories deficit for weight loss
  } else if (goal === 'gain') {
    targetCalories = tdee + 500; // 500 calories surplus for muscle gain
  } else {
    targetCalories = tdee; // Maintenance
  }

  // Debugging: Log target calories
  console.log(`Target Calories: ${targetCalories}`);

  // Macronutrient breakdown based on goal
  let carbs, protein, fats;
  if (goal === 'lose') {
    carbs = Math.round((targetCalories * 0.45) / 4); // 45% carbs
    protein = Math.round((targetCalories * 0.35) / 4); // 35% protein
    fats = Math.round((targetCalories * 0.20) / 9); // 20% fats
  } else if (goal === 'gain') {
    carbs = Math.round((targetCalories * 0.40) / 4); // 40% carbs
    protein = Math.round((targetCalories * 0.40) / 4); // 40% protein
    fats = Math.round((targetCalories * 0.20) / 9); // 20% fats
  } else {
    carbs = Math.round((targetCalories * 0.50) / 4); // 50% carbs
    protein = Math.round((targetCalories * 0.30) / 4); // 30% protein
    fats = Math.round((targetCalories * 0.20) / 9); // 20% fats
  }

  // Debugging: Log macronutrients
  console.log(`Carbs: ${carbs}, Protein: ${protein}, Fats: ${fats}`);

  // Refine weekly routine based on age, activity level, and goal
  let weeklyRoutine;
  if (activity <= 1.375) { // Sedentary to lightly active
    weeklyRoutine = `Monday: Light walking - 20 minutes
Tuesday: Yoga or light stretching - 30 minutes
Wednesday: Resistance bands training - 20 minutes
Thursday: Light cardio (e.g., stationary cycling) - 20 minutes
Friday: Yoga or Pilates - 30 minutes
Saturday: Active recovery - Light walking - 15 minutes
Sunday: Rest
    `;
  } else if (activity > 1.375 && activity <= 1.55) { // Moderately active
    weeklyRoutine = `Monday: Cardio (e.g., brisk walking, swimming) - 30 minutes
Tuesday: Strength training (full body) - 30 minutes
Wednesday: Yoga or Pilates - 30 minutes
Thursday: HIIT (low intensity) - 20 minutes
Friday: Cardio (cycling or running) - 30 minutes
Saturday: Strength training (upper body) - 30 minutes
Sunday: Active recovery (stretching or light walking) - 20 minutes
    `;
  } else { // Very active to super active
    weeklyRoutine = `Monday: HIIT (high intensity) - 20 minutes
Tuesday: Strength training (focus on legs) - 40 minutes
Wednesday: Cardio (e.g., running or swimming) - 40 minutes
Thursday: Strength training (upper body) - 40 minutes
Friday: Active sports (e.g., tennis or basketball) - 60 minutes
Saturday: Strength training (full body) - 50 minutes
Sunday: Rest or active recovery (e.g., yoga) - 30 minutes
    `;
  }

  // Adjust routine further based on fitness goal
  if (goal === 'lose') {
    weeklyRoutine += `Note: Focus on cardio exercises to burn calories. Include 2-3 sessions of HIIT per week.`;
  } else if (goal === 'gain') {
    weeklyRoutine += `Note: Prioritize strength training and increase intensity progressively. Include compound lifts (e.g., squats, deadlifts).`;
  } else {
    weeklyRoutine += `Note: Maintain a balance of cardio and strength training to sustain your fitness level.`;
  }

  // Recommended Exercises
  const recommendedExercises = `HIIT: Burpees, Jump Squats, Mountain Climbers, Jumping Jacks, High Knees, Squat Jumps.
Strength Training: Squats, Deadlifts, Push-ups, Pull-ups, Bench Press, Rows, Lunges, Overhead Press.
Yoga: Hatha Yoga, Vinyasa Flow, Power Yoga, Ashtanga Yoga, Restorative Yoga, Yin Yoga.
Cardio: Running, Cycling, Swimming, Hiking, Jump Rope, Rowing, Dancing, Walking.
Stretching: Static Stretches, Dynamic Stretches, Foam Rolling, Yoga Poses (e.g., Downward Dog).
`;

  // Recommended Foods
  const recommendedFoods = goal === 'lose'
    ? 'Lean proteins (chicken, fish, tofu), low-calorie vegetables (spinach, broccoli, kale), fiber-rich foods (sweet potatoes, quinoa, lentils).'
    : goal === 'gain'
      ? 'Calorie-dense foods (e.g., avocados, nuts, quinoa, lean meats), whole grains, healthy fats (olive oil, nuts, seeds).'
      : 'Balanced diet with lean proteins, whole grains, vegetables, fruits, healthy fats (olive oil, nuts, avocados).';

  // Display results
  document.getElementById('idealWeight').innerText = `Ideal weight range: ${minIdealWeight}kg - ${maxIdealWeight}kg`;
  document.getElementById('calories').innerText = `Target calories: ${targetCalories} kcal/day`;
  document.getElementById('bmr').innerText = `BMR: ${bmr} kcal/day`;
  document.getElementById('weeklyRoutine').innerText = weeklyRoutine;
  document.getElementById('recommendedExercises').innerText = recommendedExercises;
  document.getElementById('recommendedFoods').innerText = recommendedFoods;
  document.getElementById('macros').innerText = `Carbs: ${carbs}g, Protein: ${protein}g, Fats: ${fats}g`;

  // Smooth scroll to the result section
  document.querySelector('#result').scrollIntoView({ behavior: 'smooth' });

  // Show result section
  document.getElementById('result').style.display = 'block';
});
