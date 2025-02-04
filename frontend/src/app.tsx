import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QuestionTakePage } from 'pages/question-take'
import { CreateQuestionForm } from 'pages/create-question'
import { QuizTakePage } from 'pages/quiz-take'

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/question/new" element={<CreateQuestionForm />} />
            <Route path="/question/:id/edit" element={<CreateQuestionForm />} />
            <Route path="/question/:id" element={<QuestionTakePage />} />
            <Route path="/quiz" element={<QuizTakePage />} />
        </Routes>
    </BrowserRouter>
)
