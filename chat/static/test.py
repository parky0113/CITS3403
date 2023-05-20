from chatprocess import clean_chat

def test_clean_chat(content, expected_string):
    result = clean_chat(content).replace(" ","")
    expected_string = expected_string.replace(" ","")
    if expected_string == result:
        return "Pass"
    else:
        return "Fail"

if __name__ == '__main__':
    content = "HI*BBYE*U"
    expected_string = f"""
<div class="msg left-msg">

            <div class="msg-bubble">
                <div class="msg-info">
                <div class="msg-info-name">Ditto</div>
                </div>

                <div class="msg-text">HI</div>
            </div>
            </div>


            <div class="msg right-msg">

            <div class="msg-bubble">
                <div class="msg-info">
                <div class="msg-info-name">User</div>
                </div>

                <div class="msg-text">BYE</div>
            </div>
            </div>
                        
"""
    print(test_clean_chat(content, expected_string))