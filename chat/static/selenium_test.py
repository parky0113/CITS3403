import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
    
    
def testinstruction(driver):    
    # Open the chat page
    driver.get('http://127.0.0.1:5000')

    # Click a link in the chat response
    link = driver.find_element(By.ID, 'instruction')
    link.click()

    # Verify navigation to the new page
    new_page_title = driver.title
    instruction_url = driver.current_url
    print("If instruction page, all g",instruction_url)

def testlogin(driver):
    # Open the chat page
    driver.get('http://127.0.0.1:5000')

    link = driver.find_element(By.ID, 'login')
    link.click()

    id_input = driver.find_element(By.ID, 'username')
    id_input.send_keys('1234')

    pw_input = driver.find_element(By.ID, 'password')
    pw_input.send_keys('1234')
    pw_input.send_keys(Keys.RETURN)

    print("If index page, all g",driver.current_url)

def testcategory_game(driver):
    driver.get('http://127.0.0.1:5000/topic')

    link = driver.find_element(By.ID, 'animal')
    link.click()

    print("If game page, all g", driver.current_url)

    chat_input = driver.find_element(By.ID, 'inputmsg')
    chat_input.send_keys('What colour it is?')
    chat_input.send_keys(Keys.RETURN)
    time.sleep(5)
    response = driver.find_elements(By.ID, 'msg')
    print("If it says something about colour, all g",response[1].text)



def main():
    driver = webdriver.Chrome()
    testinstruction(driver)
    testlogin(driver)
    testcategory_game(driver)
    driver.quit()

if __name__ == '__main__':
    main()