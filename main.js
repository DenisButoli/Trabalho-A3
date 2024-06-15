
const apiKey = 'o GitHIB nao deixa subir com a chave do chatGPT'; 

function sendMessage() {
    var message = document.getElementById('message-input');

    if (!message.value) {
        message.style.border = '1px solid red';
        return;
    }

    message.style.border = 'none';

    var status = document.getElementById('status');
    var btnSubmit = document.getElementById('btn-submit');

    status.style.display = 'block';
    status.innerHTML = 'Carregando...';
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = 'not-allowed';
    message.disabled = true;



    const OPENAI_API_KEY = apiKey ;

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
        {
        role: 'system',
        content: 'atue como uma pizzaria'
        },
        {
        role: 'user',
        content: 'teste'
        }
    ]
    };

    
    fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
    console.log('Response from OpenAI API:');
    console.log(data);
    const resposta = data.choices[0].message.content;
    console.log(resposta)
    status.innerHTML = resposta;
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });


   
}

function showHistory(message, response) {
    var historyBox = document.getElementById('history');

  
    var boxMyMessage = document.createElement('div');
    boxMyMessage.className = 'box-my-message';

    var myMessage = document.createElement('p');
    myMessage.className = 'my-message';
    myMessage.innerHTML = message;

    boxMyMessage.appendChild(myMessage);

    historyBox.appendChild(boxMyMessage);

   
    var boxResponseMessage = document.createElement('div');
    boxResponseMessage.className = 'box-response-message';

    var chatResponse = document.createElement('p');
    chatResponse.className = 'response-message';
    chatResponse.innerHTML = response;

    boxResponseMessage.appendChild(chatResponse);

    historyBox.appendChild(boxResponseMessage);

    
    historyBox.scrollTop = historyBox.scrollHeight;
}
