const display = document.getElementById('display'); // Main display box
const history = document.getElementById('history'); // History box to show last operation
let currentInput = ''; // Stores the current input
let lastResult = ''; // Stores the last result

// Add event listeners to all buttons
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value') || button.id; // Get button value or ID
    handleInput(value); // Process the input
  });
});

// Allow keyboard support
document.addEventListener('keydown', (e) => {
  const validKeys = '0123456789+-*/.=';
  if (validKeys.includes(e.key)) handleInput(e.key); // Handle numeric and operator keys
  if (e.key === 'Enter') handleInput('='); // Enter key for '='
  if (e.key === 'Backspace') handleInput('delete'); // Backspace key for deletion
});

function handleInput(value) {
  if (value === 'C') {
    // Clear button: resets everything
    currentInput = '';
    display.innerText = '0';
    history.innerText = '';
    return;
  }

  if (value === 'delete') {
    // Delete button: removes the last character
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || '0'; // Show '0' if input is empty
    return;
  }

  if (value === '=') {
    // Equals button: calculates and displays result
    try {
      if (currentInput) {
        lastResult = `${currentInput} = ${eval(currentInput)}`; // Evaluate the input
        history.innerText = lastResult; // Update history
        currentInput = eval(currentInput).toString(); // Store result as new input
        display.innerText = currentInput; // Show result in display box
      }
    } catch (error) {
      // Handle invalid input
      display.innerText = 'Error';
      currentInput = '';
    }
    return;
  }

  // Append input to the current expression and update display
  currentInput += value;
  display.innerText = currentInput;
}
