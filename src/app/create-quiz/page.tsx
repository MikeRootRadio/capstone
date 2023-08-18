'use client';

import { FormEvent, useState } from "react";
import prisma from "@/prisma/prisma";
import { PUT } from "../api/quizzes/[id]/route";
import { POST } from "../api/quizzes/route";

type question = {
    id: string;
    question: {
        text: string;
    };
    correctAnswer: string;
    incorrectAnswers: string[];
}

export default function CreateQuiz() {

    const [questions, setQuestions] = useState<question[]>([]);

    const fetchQuestions = () => {
        fetch("https://the-trivia-api.com/v2/questions")
            .then(response => {
            return response.json()
        })
        .then(data => {
            setQuestions(data)
        });
    }

    const [selectedQuestions, setSelectedQuestions] = useState<question[]>([]);

    const addToQuiz = (questionToAdd: question) => {
        if (!selectedQuestions.some(a => a.id == questionToAdd.id))
            setSelectedQuestions([...selectedQuestions, questionToAdd]);
    }

    const [title, setTitle] = useState('');

    async function handleSubmit(e:FormEvent){
        e.preventDefault();

        const newQuiz = {
            title: title
        };

        const response = await fetch("https://capstone-pearl-seven.vercel.app/", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuiz),
        });
    }

    return (
        <div id="create_quiz_container">
            <form onSubmit={handleSubmit}>
                <h2>QUIZ BUILDER</h2>
                
                <div id="quiz_name_container">
                    <label htmlFor="quiz_title">QUIZ NAME</label>
                    <input type="text" id="quiz_title" name="quiz_title" placeholder="Please input a unique quiz name" required onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <hr/>

                <h3>QUESTION BANK:</h3>
                <div id="selected_questions">
                    {
                        selectedQuestions.length > 0 
                        && selectedQuestions.map((a, index) => 
                            <div key={index}>
                                {index + 1}. {a.question.text}
                            </div>
                    )}
                </div>

                <hr/>
                <input type="submit" value="SAVE" id="save_created_quiz" className="btn_hover" />

                <h3>FIND MORE QUESTIONS</h3>
                <input type="button" value="GET RANDOM QUESTIONS" className="btn_hover" id="get_questions" onClick={fetchQuestions} />
                <br/><br/>

                <div id="random_questions_container">
                    {
                        questions.length > 0 
                        && questions.map((a, index) => 
                            <div key={index} className="question_to_add_container">
                                <h4>
                                    {a.question.text}
                                </h4>
                                <input type="radio" name={"question_" + a.id} id={a.correctAnswer} disabled />
                                <label htmlFor={a.correctAnswer}>{a.correctAnswer}</label>

                                <input type="radio" name={"question_" + a.id} id={a.incorrectAnswers[0]} disabled />
                                <label htmlFor={a.incorrectAnswers[0]}>{a.incorrectAnswers[0]}</label>

                                <input type="radio" name={"question_" + a.id} id={a.incorrectAnswers[1]} disabled />
                                <label htmlFor={a.incorrectAnswers[1]}>{a.incorrectAnswers[1]}</label>

                                <input type="radio" name={"question_" + a.id} id={a.incorrectAnswers[2]} disabled />
                                <label htmlFor={a.incorrectAnswers[2]}>{a.incorrectAnswers[2]}</label>

                                <br/><br/>
                                <input type="button" value="ADD TO QUIZ" className="add_to_quiz_button btn_hover" onClick={() => addToQuiz(a)} />
                            </div>
                        )}
                </div>
            </form>
        </div>
    );
}