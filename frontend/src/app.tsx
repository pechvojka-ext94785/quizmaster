import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QuestionTakePage } from 'pages/question-take'
import { CreateQuestionForm } from 'pages/create-question'

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/question/new" element={<CreateQuestionForm />} />
            <Route path="/question/:id/edit" element={<CreateQuestionForm />} />
            <Route path="/question/:id" element={<QuestionTakePage />} />
        </Routes>
    </BrowserRouter>
)
