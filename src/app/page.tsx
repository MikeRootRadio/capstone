import styles from './page.module.css'
import prisma from "@/prisma/prisma";
import { Quizzes } from "@prisma/client";

export default async function Home() {
  
  const quizzes = await prisma.quizzes.findMany();

  return (
    <main className={styles.main}>
      <div id="home_container">
            <h2 id="all_quizzes">ALL QUIZZES</h2>
            <a href={`create-quiz`} id="build_new_quiz">BUILD NEW QUIZ</a>
            <hr/>
            <br/>
            {quizzes.map((a: Quizzes, index: number) => 
                <div key={index} className="quiz_container">
                    <h3 className="quiz_container_title">
                        {a.title}
                    </h3>
                    <div className="num_of_questions">
                        5 QUESTIONS
                    </div>
                    <a href={`play/${a.quizId}`} className="play_button">PLAY</a>
                </div>
            )}
        </div>
    </main>
  )
}
