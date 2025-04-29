import { AppRoute } from '../const';
import { Link } from 'react-router-dom';
import { JSX } from 'react';

export default function NotFoundScreen(): JSX.Element {
  return (
    <section>
      <div>
        <h1>404 Not Found</h1>
        <Link to={AppRoute.Root} className="button-link">
          Go back to Main
        </Link>
      </div>
    </section>
  );
}