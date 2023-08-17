import prisma from "@/prisma/prisma";

export default async function Home() {

    const quizzes = await prisma.quizzes.findMany();

    return (
        <div id="home_container">
            <h2 id="all_quizzes">ALL QUIZZES</h2>
            <a href={`create-quiz`} id="build_new_quiz">BUILD NEW QUIZ</a>
            <hr/>
            {quizzes.map((a, index) => 
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
    );
}