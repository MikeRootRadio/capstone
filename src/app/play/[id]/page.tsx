import prisma from "@/prisma/prisma";

type Props = {
  params: { id: string }
}
  
export default async function PlayDetails({ params }: Props) {
  const quiz = await prisma.quizzes.findFirst({
      where: {
          quizId: parseInt(params.id)
      }
  });

  const questions = await prisma.questions.findMany({
      where: {
          quizId: parseInt(params.id)
      }
  });

  return (
    <main>
      <h1>{quiz?.title}</h1>
      {
        questions.map((key, index) => 
          <>
            <h2 className="question_number">Question #{index}</h2>
            <h3>{key.question}</h3>

            <div className="choice">
              <input type="radio" name={"choices_" + index} id={key.correctAnswer} value={key.correctAnswer} />
              <label htmlFor={key.correctAnswer}>{key.correctAnswer}</label>
            </div>

            <div className="choice">
              <input type="radio" className="choice" name={"choices_" + index} id={key.incorrectAnswers.split(',')[0]} value={key.incorrectAnswers.split(',')[0]} />
              <label htmlFor={key.incorrectAnswers.split(',')[0]}>{key.incorrectAnswers.split(',')[0]}</label>
            </div>

            <div className="choice">
              <input type="radio" className="choice" name={"choices_" + index} id={key.incorrectAnswers.split(',')[1]} value={key.incorrectAnswers.split(',')[1]} />
              <label htmlFor={key.incorrectAnswers.split(',')[1]}>{key.incorrectAnswers.split(',')[1]}</label>
            </div>

            <div className="choice">
              <input type="radio" className="choice" name={"choices_" + index} id={key.incorrectAnswers.split(',')[2]} value={key.incorrectAnswers.split(',')[2]} />
              <label htmlFor={key.incorrectAnswers.split(',')[2]}>{key.incorrectAnswers.split(',')[2]}</label>
            </div>
          </>
        )}

      <button className="finish btn_hover">Finish</button>
    </main>
  )
}