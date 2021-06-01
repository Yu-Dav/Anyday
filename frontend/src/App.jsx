import './assets/styles/main.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { routes } from './routes'
import {ActivityModal} from './cmps/ActivitySideBar/ActivityModal'


export function App() {
  return (
    <section>
      <Router>
        <Switch>
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        </Switch>
        <Route component={ActivityModal} path="/board/:boardId/task/:taskId" />
      </Router>
    </section>
  );
}

