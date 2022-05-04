import React, { useState } from 'react';
import './App.css';

export default function App() {
	const questions = [
		{
			questionText: 'Where do developers share code?',
			answerOptions: [
				{ answerText: 'Teams', isCorrect: false },
				{ answerText: 'Codesharing platforms', isCorrect: false },
				{ answerText: 'Github', isCorrect: true },
				{ answerText: 'On trees', isCorrect: false },
			],
		},
		{
			questionText: 'Spot one of the front-end framework?',
			answerOptions: [
				{ answerText: 'Firebase', isCorrect: false },
				{ answerText: 'React JS', isCorrect: true },
				{ answerText: 'Supabase', isCorrect: false },
				{ answerText: 'Node JS', isCorrect: false },
			],
		},
    {
			questionText: 'Who is CEO of SpaceX?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

  const [answers, setAnswers] = useState([]);

	const handleAnswerOptionClick = (isCorrect, optionSelected) => {
		if (isCorrect) {
			setScore(score + 1);
		}

    setAnswers(prevAnswers => {
      prevAnswers[currentQuestion] = `#${currentQuestion + 1}: ${optionSelected}`;
      return prevAnswers;
    })

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}

	};

  function back() {
    if(currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }
  function next() {
    if(currentQuestion < questions.length - 1){
      setCurrentQuestion(currentQuestion + 1);
    }
  }
  const answerElements = answers.map(answer => <p key={answer}>{answer}</p>)
	return (
		<div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
          <section className='review-section'>
            <h3>Review answers here</h3>
            {answerElements}
            {/* <p>#1:{answers[0]}</p>
            <p>#2:{answers[1]}</p> */}

          </section>
          <section className='attempt-section'>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question #{currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className='question-text'>{questions[currentQuestion].questionText}</div>
            </div>
            <div className='answer-section'>
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerText)}>{answerOption.answerText}</button>
              ))}
            </div>
            <div className='question_nav'>
              <a onClick={back}>Back</a>
              <a onClick={next}>Next</a>
            </div>
          </section>
				</>
			)}
		</div>
	);
}