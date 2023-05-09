const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const person = [
    "Barack Obama", "Beyonce", "Elon Musk", "Oprah Winfrey", "Albert Einstein" ,
    "Cristiano Ronaldo",
    "BTS" ,
    "Zendaya",
    "William Shakespeare",
    "Kim Kardashian",
    "Billie Eilish"

]

const food = ["Pizza", "Sushi", "Taco", "Pad Thai", "Paella",
                "Hamburger", "Croissant", "Curry", "Ramen", "Pecking Duck"    
]

const movie = [
    "Iron Man", "Titanic", "Star Wars", "The Lord of thre Rings", "Parasite",
    "The Shawshank Redemption", "Forres Gump", "The Matrix", "Jaws", "Harry Potter",
    "Mean Girls"
]

const animal = [
    "Panda", "Tiger", "Eagle", "Bear", "Dog", "Koala", "Whale", "Elephant", "Chimpanzee","Zebra"
]
// 발급받은 OpenAI API 키를 변수로 저장
const apiKey = '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';
// OpenAI API 엔드포인트 주소를 변수로 저장
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'

// Icons made by Freepik from www.flaticon.com
const BOT_NAME = "Ditto";
const PERSON_NAME = "User";
document.getElementById("dis_Button").style.visibility = "hidden";
let category = document.getElementById('category');
let topic = category.value;

if (topic == "Animal"){
    answer = animal[Math.floor(Math.random() * 10)];
}   
else if (topic == "Person"){
    answer = person[Math.floor(Math.random() * 10)];
}   
else if (topic == "Movie"){
    answer = movie[Math.floor(Math.random() * 10)];
}   
else {
    answer = food[Math.floor(Math.random() * 10)];
}

let count = 0;
let score = 5;
let chatting = [`Hi, welcome to Ditto! You have chosen ${topic} category. Ask me a question and guess the word! 😄*B`];
msgerForm.addEventListener("submit", event => {
event.preventDefault();

let original = msgerInput.value;
if (!original) return;

chatting.push(original+'*U');
appendMessage(PERSON_NAME, "right", original);

if (original.toLowerCase().includes(answer.toLowerCase())){
    score = score - count;
    let correct = `You are correct! The answer is ${answer}. You asked ${count} questions, you got ${score} points!`
    chatting.push(correct+'*B');
    appendMessage(BOT_NAME,'left',correct);
    sendData(chatting)
    document.getElementById("dis_Button").style.visibility = "visible";
}
else{
    let msgText = original.replace("it", answer);
    botResponse(msgText);
    count += 1;
}

msgerInput.value = "";
});

function appendMessage(name, side, text) {
//   Simple solution for small apps
const msgHTML = `
    <div class="msg ${side}-msg">

    <div class="msg-bubble">
        <div class="msg-info">
        <div class="msg-info-name">${name}</div>
        <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
    </div>
    </div>
`;

msgerChat.insertAdjacentHTML("beforeend", msgHTML);
msgerChat.scrollTop += 500;
}

async function botResponse(prompt) {
    const requestOptions = {

        method: 'POST',
        // API 요청의 헤더를 설정
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // 사용할 AI 모델
            messages: [{
                role: "user", // 메시지 역할을 user로 설정
                content: prompt // 사용자가 입력한 메시지
            }, ],
            temperature: 0.8, // 모델의 출력 다양성
            max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
            top_p: 1, // 토큰 샘플링 확률을 설정
            frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
            presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
        }),
    };
    // API 요청후 응답 처리
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        let aiResponse = data.choices[0].message.content;
        const pattern = answer;
        const re = new RegExp(pattern, "gi");
        const replaced = aiResponse.replace(re, "it");
        console.log(replaced);
        chatting.push(replaced+'*B');
        appendMessage(BOT_NAME, "left", replaced);
    } catch (error) {
		console.error('OpenAI API 호출 중 오류 발생:', error);
        return 'OpenAI API 호출 중 오류 발생';
    }
}

function sendData(chatting) {
    fetch('/process-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: chatting})
      })
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

// Utils
function get(selector, root = document) {
return root.querySelector(selector);
}

function formatDate(date) {
const h = "0" + date.getHours();
const m = "0" + date.getMinutes();

return `${h.slice(-2)}:${m.slice(-2)}`;
}
