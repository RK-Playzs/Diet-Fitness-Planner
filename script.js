document.getElementById('submitBtn').addEventListener('click', function () {
  // Get form values
  const age = parseInt(document.getElementById('age').value);
  const weight = parseInt(document.getElementById('weight').value);
  const height = parseInt(document.getElementById('height').value);
  const gender = document.getElementById('gender').value;
  const activity = parseFloat(document.getElementById('activity').value);
  const goal = document.getElementById('goal').value;

  // Validate inputs
  if (!age || !weight || !height || !gender || !activity || !goal) {
    if (!age) document.getElementById('ageError').style.display = 'block';
    if (!weight) document.getElementById('weightError').style.display = 'block';
    if (!height) document.getElementById('heightError').style.display = 'block';
    alert("Please fill in all fields correctly.");
    return;
  }

  // Hide error messages if inputs are correct
  document.getElementById('ageError').style.display = 'none';
  document.getElementById('weightError').style.display = 'none';
  document.getElementById('heightError').style.display = 'none';

  // Calculate BMR
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  // Maintenance calories
  const maintenanceCalories = Math.round(bmr * activity);

  // Target calories
  let targetCalories;
  if (goal === 'lose') {
    targetCalories = maintenanceCalories - 500;
  } else if (goal === 'gain') {
    targetCalories = maintenanceCalories + 500;
  } else {
    targetCalories = maintenanceCalories;
  }

  // Macronutrient breakdown
  const carbs = Math.round((targetCalories * 0.4) / 4);
  const protein = Math.round((targetCalories * 0.3) / 4);
  const fats = Math.round((targetCalories * 0.3) / 9);

  // Ideal weight range calculation
  const minIdealWeight = Math.round(18.5 * (height / 100) ** 2);
  const maxIdealWeight = Math.round(24.9 * (height / 100) ** 2);

  // Weekly Routine
  const weeklyRoutine = `
    Monday: HIIT - 20 minutes (e.g., Burpees, Jump Squats, Mountain Climbers, Jumping Jacks)
    Tuesday: Strength Training - 45 minutes (e.g., Squats, Deadlifts, Push-ups, Pull-ups)
    Wednesday: Yoga - 30 minutes (e.g., Hatha Yoga, Vinyasa Flow, Restorative Yoga)
    Thursday: Cardio - 30 minutes (e.g., Running, Cycling, Swimming, Hiking)
    Friday: HIIT - 20 minutes (e.g., Jump Rope, High Knees, Squat Jumps, Push-ups)
    Saturday: Strength Training - 45 minutes (e.g., Bench Press, Rows, Lunges, Overhead Press)
    Sunday: Active Recovery - 30 minutes (e.g., Light Stretching, Yoga, Walking)
  `;

  // Recommended Exercises
  const recommendedExercises = `
    HIIT: Burpees, Jump Squats, Mountain Climbers, Jumping Jacks, High Knees, Squat Jumps.
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
