// Assuming you have Jest installed, import the necessary functions
const { test } = require('jest');

// Import the function you want to test
const { botResponse } = require('./chatgpt');

// Create a mock function to track function calls
const mockFunction = jest.fn();

// Run the test
test('myFunction should call anotherFunction', () => {
  // Set up any necessary test data

  // Replace the function in your module with the mock function
  myModule.appendMessage = mockFunction;

  // Call the function you want to test
  botResponse();

  // Assert that the mock function was called
  expect(mockFunction).toHaveBeenCalled();
});