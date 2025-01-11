import { Route, Router } from '@solidjs/router'
import { QuestionTakePage } from 'pages/question-take'
import { CreateQuestionForm } from 'pages/create-question'
import { QuestionList } from 'questions.tsx'
import { QuizMaster } from 'quizmaster.tsx'
import { QuizResult } from './pages/QuizResult.tsx'
import { QuizIntro } from './pages/QuizIntro.tsx'
import { QuizQuestionDetail } from './pages/QuizQuestion.tsx'

export const App = () => (
    <Router>
        <Route path="/quiz/:id/intro" component={QuizIntro} />
        <Route path="/quiz/:id/run/:runId/question/:questionId" component={QuizQuestionDetail} />
        <Route path="/quiz/:id/run/:runId/result" component={QuizResult} />

        <Route path="/quiz/new" component={QuestionList} />

        <Route path="/question/new" component={CreateQuestionForm} />
        <Route path="/question/:id" component={QuestionTakePage} />

        <Route path="/quizmaster/:id" component={QuizMaster} />
        <Route path="/quizmaster/:id/result" component={QuizResult} />
    </Router>
)
