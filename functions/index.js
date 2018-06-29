'use strict';

// Import Firebase-admin and initialize app.
const admin = require('firebase-admin');

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "AIzaSyD7t2UELyolG2mRLVk1XvYoJi30TffOo8A",
  authDomain: "code-up-927cb.firebaseapp.com",
  databaseURL: "https://code-up-927cb.firebaseio.com/"
};

admin.initializeApp(config);

// Reference database.
const rootRef = admin.database().ref();

// Global reference for current questions
let question_set;

const successSound = 'https://actions.google.com/sounds/v1/crowds/battle_crowd_celebrate_stutter.ogg';
const failSound = 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg';
const calculateSound = 'https://actions.google.com/sounds/v1/office/keyboard_typing_fast.ogg';
const gameOverSound = 'https://actions.google.com/sounds/v1/cartoon/cartoon_metal_thunk.ogg'; 

const {
  dialogflow,
  BasicCard,
  Permission,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });
// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
  conv.data.count = 0;
  let score = conv;
  conv.ask(new Permission({
    context: 'Hi there, to get to know you better',
    permissions: 'NAME',
  }));
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  // conv.data.count += 1;
  if (!permissionGranted) {
    conv.ask(`Ok, no worries. What programming language would you like to learn?`);
  } else {
    conv.data.userName = conv.user.name.given;
    conv.ask(`Thanks, ${conv.data.userName}. What programming language would you like to learn?`);
  }
});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('programming language', (conv, { programmingLanguage }) => {
  conv.data.count = 0;
  return getQuestions.then(snapshot => {
    question_set = snapshot.val();
    conv.data.questions = question_set;
    conv.data.answer = question_set[0].correctAnswer;
    let answers = question_set[0].wrongAnswer.concat([conv.data.answer]);
    conv.ask(`Got it, ${programmingLanguage}. Let's do it. ${ question_set[0].question }`);
    return conv.ask(`Is it\n` +
                    `a. ${answers[0]}?\n` +
                    `b. ${answers[1]}? or\n` +
                    `c. ${answers[2]}?`);
    // return conv.ask();
  })
});

app.intent('programming language - answer1', (conv, { answer }) => {
  console.log("THE FIRST ANSWER");
  if (answer === 'c') {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="2.0s"></audio>Wow, first try! Nice job. Next question: ${conv.data.questions[1].question}</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>Sorry, the answer was ${conv.data.answer}. Next question: ${conv.data.questions[1].question}</speak>`);
  }
  conv.data.answer = question_set[1].correctAnswer;
  let answers = question_set[1].wrongAnswer.concat([conv.data.answer]);
  conv.ask(`Is it\n` +
    `a. ${answers[0]}?\n` +
    `b. ${answers[1]}? or\n` +
    `c. ${answers[2]}?`);
});

app.intent('programming language - answer2', (conv, { answer }) => {
  console.log("THE SECOND ANSWER");
  if (answer === 'c') {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="2.0s"></audio>You got it! Here's your next one: ${conv.data.questions[2].question}</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>Nope, the answer was ${conv.data.answer}. Here's your next one: ${conv.data.questions[2].question}</speak>`);
  }
  conv.data.answer = question_set[2].correctAnswer;
  let answers = question_set[2].wrongAnswer.concat([conv.data.answer]);
  conv.ask(`Is it\n` +
    `a. ${answers[0]}?\n` +
    `b. ${answers[1]}? or\n` +
    `c. ${answers[2]}?`);
});

app.intent('programming language - answer3', (conv, { answer }) => {
  if (answer === 'c') {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="2.0s"></audio>You got it! Here's your next one: ${conv.data.questions[3].question}</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>Nope, the answer was ${conv.data.answer}. Here's your next one: ${conv.data.questions[3].question}</speak>`);
  }
  conv.data.answer = question_set[3].correctAnswer;
  let answers = question_set[3].wrongAnswer.concat([conv.data.answer]);
  conv.ask(`Is it\n` +
    `a. ${answers[0]}?\n` +
    `b. ${answers[1]}? or\n` +
    `c. ${answers[2]}?`);
});

app.intent('programming language - answer4', (conv, { answer }) => {
  if (answer === 'c') {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="2.0s"></audio>You got it! Here's your next one: ${conv.data.questions[4].question}</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>Nope, the answer was ${conv.data.answer}. Here's your next one: ${conv.data.questions[4].question}</speak>`);
  }
  conv.data.answer = question_set[4].correctAnswer;
  let answers = question_set[4].wrongAnswer.concat([conv.data.answer]);
  conv.ask(`Is it\n` +
    `a. ${answers[0]}?\n` +
    `b. ${answers[1]}? or\n` +
    `c. ${answers[2]}?`);
});

app.intent('programming language - answer5', (conv, { answer }) => {
  if (answer === 'c') {
    conv.data.count += 1;
    conv.ask(`<speak><audio src="${successSound}" clipEnd="2.0s" fadeOutDur="2.0s">` +
    `</audio>You got it!<audio src="${gameOverSound}" clipStart="1.0s" clipEnd="2.0s">` +
    `</audio>We made it through this round, let's check your score.</speak>`);
  } else {
    conv.ask(`<speak><audio src="${failSound}"></audio>Nope, the answer was ${conv.data.answer}.` +
    `<audio src="${gameOverSound}" clipStart="1.0s" clipEnd="2.0s">` +
    `</audio>We made it through this round, let's check your score.</speak>`);
  }
  conv.ask(`<speak><audio src="${calculateSound}" clipEnd="2.0s"></audio>` +
  `You got ${conv.data.count} right! Would you like to go again?</speak>`);
});


// app.intent('programming language - select.number', (conv, { language, number }) => {
//   return getQuestions.then(snapshot => {
//     let question_set = snapshot.val();
//     conv.data.questions = question_set;
//     return conv.close(
//       `Got it, ${language} and ${number} questions. Let's do it. ` +
//       `${question_set[0].Question}`
//     )
//   })
// });



// app.intent('programming language - select.number', (conv, { language, number }) => {
//   conv.data.count += 5;
//   conv.data.questions = [];
//   let score = conv.data.count;
//   return getQuestions.then(snapshot => {
//     let question_set = snapshot.val()[0].Question;
//     conv.data.questions = snapshot.val();
//     let first_q = conv.data.questions;
//     console.log(`${ first_q[0].Question}===========================`);
//     return conv.close(
//       `Got it, ${language} and ${number} questions. Let's do it. ` +
//       `${question_set}` +
//       `Your score is ${score}`
//     )
//   })
// });





const getQuestions = rootRef.child('questions').orderByChild('tags').limitToFirst(5).once('value');
// app.intent('programming language - select.number', (conv, { language, number }) => {
//   conv.close(`Got it, ${language} and ${number} questions. Let's do it.`);
// });


// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
