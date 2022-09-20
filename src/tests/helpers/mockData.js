const mockData = {
  response_code: 0,
  results: [{
    category:"Science: Mathematics",
    type:"multiple",
    difficulty:"easy",
    question:"How many zeptometres are inside one femtometre?",
    correct_answer:"1,000,000",
    incorrect_answers: ["10", "1,000,000,000", "1000"],
    }, {
    category:"Entertainment: Video Games",
    type:"multiple",
    difficulty:"medium",
    question:"What was the FIRST Valve game to have VR?",
    correct_answer:"The Lab",
    incorrect_answers: ["10", "1,000,000,000", "1000"],
  }, {
    category:"Entertainment: Television",
    type:"multiple",
    difficulty:"medium",
    question:"In Naruto: Shippuden, which of the following elements is a &quot;Kekkei Tōta?&quot;",
    correct_answer:"Particle Style",
    incorrect_answers: ["10", "1,000,000,000", "1000"],
}, {
    category:"Entertainment: Video Games",
    type:"multiple",
    difficulty:"hard",
    question:"In the title of the game &quot;Luigi&#039;s Mansion&quot;, what is the only letter to not appear with a pair of eyes in it?",
    correct_answer:"s",
    incorrect_answers: ["10", "1,000,000,000", "1000"],
}, {
  category:"Entertainment: Film",
  type:"boolean",
  difficulty:"medium",
  question:"The Xenomorph from the science fiction film, Alien, has acidic blood.",
  correct_answer:"True",
  incorrect_answers: ["False"],
}],
};

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
//No tópico de descrição depois do texto da imagem sobre o ciclo da Promise.
const countTimer = async () => {
  return new Promise((e) => setTimeout(e, 1000));
}

module.exports = { mockData, countTimer };
