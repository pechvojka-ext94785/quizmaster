import { Route, Router } from '@solidjs/router'
import { QuestionTakePage } from 'pages/question-take'
import { CreateQuestionForm } from 'pages/create-question'

export const App = () => (
    <Router>
        <Route path="/question/new" component={CreateQuestionForm} />
        <Route path="/question/:id/edit" component={CreateQuestionForm} />
        <Route path="/question/:id" component={QuestionTakePage} />
    </Router>
)
