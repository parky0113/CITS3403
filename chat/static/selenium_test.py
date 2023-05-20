
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# Set up the WebDriver (Chrome in this example)
driver = webdriver.Chrome('./chromedriver')

# Open the chat page
driver.get('http://127.0.0.1:5000')

# Simulate entering a chat message
chat_input = driver.find_element(By.ID, 'chat-input')
chat_input.send_keys('Hello, how are you?')
chat_input.send_keys(Keys.RETURN)

# Wait for the chat response
response = driver.find_element(By.ID, 'chat-response')
print(response.text)

# Click a link in the chat response
link = driver.find_element(By.CSS_SELECTOR, 'a')
link.click()

# Verify navigation to the new page
new_page_title = driver.title
print('New page title:', new_page_title)

# Close the browser
driver.quit()