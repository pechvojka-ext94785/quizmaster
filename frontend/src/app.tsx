import { Route, Router } from '@solidjs/router'
import { Quiz } from 'quiz.tsx'
import { CreateQuestionForm } from './pages/CreateQuestion.tsx'
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
        <Route path="/question/:id" component={Quiz} />

        <Route path="/quizmaster/:id" component={QuizMaster} />
        <Route path="/quizmaster/:id/result" component={QuizResult} />
    </Router>
)
