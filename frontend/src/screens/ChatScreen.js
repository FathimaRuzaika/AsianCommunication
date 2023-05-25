import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

export default function ChatScreen() {
  const [data, setData] = useState([]);

  // const apiKey = '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';
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const apiUrl =
    'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    const prompt = textInput;
    let responseText;

    // Check input text and generate response accordingly.....................................................
    if (
      prompt === 'Hi' ||
      prompt === 'Hi!' ||
      prompt === 'Hello' ||
      prompt === 'Hello!' ||
      prompt === 'Hey' ||
      prompt === 'Hey!'
    ) {
      responseText = 'Hi, How may I assist you today?';
    } else if (prompt === '') {
      responseText = 'Hi, How may I assist you today?';
    } else if (
      prompt === 'What is your name?' ||
      prompt === "What's your name?" ||
      prompt === 'Who are you?' ||
      prompt === 'Who is this?' ||
      prompt === "Who's this?" ||
      prompt === 'May I know your name?' ||
      prompt === 'May I know about you?'
    ) {
      responseText =
        "I'm Ruzai-ChatBot. I'm the AI assistant of this Asian Communication Shop.";
    } else if (prompt === 'What is your favorite color?') {
      responseText = "I don't have a favorite color, I'm a chatbot!";
    } else if (prompt === 'How old are you?') {
      responseText = "I don't have an age, I'm a machine learning model.";
    } else if (
      prompt === 'How can I contact you?' ||
      prompt === 'How can I contact you' ||
      prompt === 'How can i contact you?' ||
      prompt === 'How can i contact you' ||
      prompt === 'How can I reach you?' ||
      prompt === 'How can I reach you' ||
      prompt === 'How can i reach you?' ||
      prompt === 'How can i reach you' ||
      prompt === 'How to contact you?' ||
      prompt === 'How to contact you' ||
      prompt === 'I want to contact you.' ||
      prompt === 'I want to contact the store.' ||
      prompt === 'I want to contact your store.' ||
      prompt === 'May i know that how to contact you?' ||
      prompt === 'May i know that how to reach you?' ||
      prompt === 'I want to reach you. How?'
    ) {
      responseText =
        'Dear customer! You can contact us with our Fax: 065 225 7703, Mob: 077 900 2 900 rsepectively. And also if you wish you can reach out our store at the loaction: Asian Communication, Old Market Road, Oddamavadi, Sri Lanka. You can find our fb page in the upper of our site. We are happy to interact with you. :)';
    } else if (
      prompt === 'Okay!' ||
      prompt === 'Okay' ||
      prompt === 'ok!' ||
      prompt === 'ok' ||
      prompt === 'K!' ||
      prompt === 'K' ||
      prompt === 'k!' ||
      prompt === 'k' ||
      prompt === 'Alright!' ||
      prompt === 'Alright' ||
      prompt === 'Fine!' ||
      prompt === 'Fine'
    ) {
      responseText = 'Do you need anything which I have to assist you with?';
    } else if (
      prompt === 'Nope!' ||
      prompt === 'Nope' ||
      prompt === 'nope!' ||
      prompt === 'nope' ||
      prompt === 'No!' ||
      prompt === 'No' ||
      prompt === 'no!' ||
      prompt === 'no' ||
      prompt === 'No need!' ||
      prompt === 'No need'
    ) {
      responseText =
        "Nice, If there anything else please don't hesitate to reach me out! :)";
    } else if (
      prompt === 'Thanks!' ||
      prompt === 'Thanks' ||
      prompt === 'Thanks a lot!' ||
      prompt === 'Thanks a lot' ||
      prompt === 'Thank you so much!' ||
      prompt === 'Thank you so much' ||
      prompt === 'Thank you very much!' ||
      prompt === 'Thank you very much' ||
      prompt === 'Thanks buddy!' ||
      prompt === 'Thanks buddy' ||
      prompt === 'Thanks dear!' ||
      prompt === 'Thanks dear'
    ) {
      responseText = "You're welcome!";
    } else if (
      prompt === 'Bye' ||
      prompt === 'Bye!' ||
      prompt === 'See you!' ||
      prompt === 'See you' ||
      prompt === 'See you later! Bye!' ||
      prompt === 'See you later, Bye' ||
      prompt === 'Goodbye!' ||
      prompt === 'Goodbye.' ||
      prompt === 'Goodbye'
    ) {
      responseText = 'Bye! Have a nice day!';
    } else if (prompt === 'Do you sell mobile phones?') {
      responseText =
        'Yes, we offer a wide range of mobile phones from different brands. What type of phone are you looking for?';
    } else if (prompt === 'What are your shipping options?') {
      responseText =
        'We offer standard shipping, express shipping, and same-day delivery for eligible products. Which option would you like to choose?';
    } else if (prompt === 'How long does it take to receive my order?') {
      responseText =
        'Delivery times may vary depending on your location and the shipping method you choose. However, we always try our best to deliver your order as soon as possible.';
    } else if (prompt === 'Do you offer international shipping?') {
      responseText =
        'Yes, we ship to most countries around the world. However, international shipping rates may apply.';
    } else if (prompt === 'What payment methods do you accept?') {
      responseText =
        'We accept various payment methods, including credit cards, debit cards and PayPal. Which method would you prefer to use?';
    } else if (prompt === 'Do you offer any discounts or promotions?') {
      responseText =
        "Yes, we offer various discounts and promotions throughout the year. You can find all those in our home page's banner section to stay up-to-date on the latest deals!";
    } else if (prompt === 'What is your return policy?') {
      responseText =
        'We have a flexible return policy that allows you to return your product within 30 days of purchase. Please follow our fb page for more information on how to initiate a return.';
    } else if (prompt === 'Do you offer any warranty for your products?') {
      responseText =
        'Yes, we offer warranties for most of our products. The duration and terms of the warranty may vary depending on the product. Please refer to the product page for more information.';
    } else if (prompt === 'What type of accessories do you sell?') {
      responseText =
        'We sell various types of accessories, including phone cases, chargers, screen protectors, headphones, and more. Which accessory are you interested in?';
    } else if (prompt === 'Are your products new or used?') {
      responseText =
        'All of our products are brand new and come with their original packaging and accessories, unless stated otherwise.';
    } else if (
      prompt === 'Do you have a physical store where I can pick up my order?'
    ) {
      responseText =
        'Yes you can visit our store at the “Location: Asian Communication, Old Market Road, Oddamavadi, Sri Lanka” between 9 a.m. to 9 p.m. itself, also we operate as an online store too. However, we offer various shipping options to ensure you receive your order as soon as possible.';
    }
    //...........................................................................................................................................................
    else {
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      responseText = response.data.choices[0].text;
    }

    setData([
      ...data,
      { type: 'user', text: textInput },
      { type: 'bot', text: responseText },
    ]);
    setTextInput('');
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Chat Screen</title>
      </Helmet>
      <h1 style={styles.title}>Talk With Bot...</h1>

      <div style={styles.body}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10,
            }}
          >
            <p
              style={{
                fontWeight: 'bold',
                color: item.type === 'user' ? 'green' : 'red',
              }}
            >
              {item.type === 'user' ? 'You:' : 'Bot:'}
            </p>
            <p style={styles.bot}>{item.text}</p>
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button style={styles.button} onClick={handleSend}>
          <span style={styles.buttonText}>Let's Go</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '83vh',
    backgroundColor: '#fffcc9',
    paddingBottom: 50, // increased distance from the bottom
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -5,
    marginBottom: 3,
  },
  body: {
    backgroundColor: '#fffcc9',
    width: '95%',
    height: 350,
    margin: 10,
    overflowY: 'scroll',
    marginBottom: 50,
  },
  bot: {
    fontSize: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '-50px', // move up by 50 pixels
    // marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '95%',
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#F7C425',
    width: '95%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -60,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
};
