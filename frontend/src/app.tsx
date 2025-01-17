import { Route, Router } from '@solidjs/router'
import { QuestionTakePage } from 'pages/question-take'
import { CreateQuestionForm } from 'pages/create-question'
import { QuizTakePage } from 'pages/quiz-take'

export const App = () => (
    <Router>
        <Route path="/question/new" component={CreateQuestionForm} />
        <Route path="/question/:id/edit" component={CreateQuestionForm} />
        <Route path="/question/:id" component={QuestionTakePage} />
        <Route path="/quiz" component={QuizTakePage} />
    </Router>
)
