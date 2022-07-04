import { useState } from 'react';
import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
import { QuestionState, Difficulties } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 3;

const App: React.FC = () => {
  const [currentDifficulty, setCurrentDifficulty] = useState(Difficulties[0]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      currentDifficulty
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const handleCurrentDifficulty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDifficulty(e.currentTarget.value);
  };

  const handleDifficultyChange = () => {
    setGameOver(true);
    setQuestions([]);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        <div className='stack center'>
          {gameOver ? (
            <>
              <div>
                <p>Choose Difficulty</p>
                <div className='difficultyBox'>
                  {Difficulties.map((difficulty) => {
                    return (
                      <div key={difficulty} className='difficultyButton'>
                        <input
                          type='radio'
                          id={difficulty}
                          name='difficulty'
                          value={difficulty}
                          checked={currentDifficulty === difficulty}
                          onChange={handleCurrentDifficulty}
                        />
                        <label htmlFor={difficulty} className='btn'>
                          {difficulty.toUpperCase()}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className='start btn' onClick={startTrivia}>
                Start Quiz
              </button>
            </>
          ) : (
            <p className='score'>Score: {score}</p>
          )}
          {loading ? <p>Loading Questions ...</p> : null}
          {!loading && !gameOver && (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <button className='next btn' onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
          {!loading && userAnswers.length === TOTAL_QUESTIONS && (
            <div className='btnBoxWrap'>
              <div className='btnBox'>
                <button className='change btn' onClick={handleDifficultyChange}>
                  Change Difficulty
                </button>
                <button className='retry btn' onClick={startTrivia}>
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default App;
