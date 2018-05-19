/* @flow */

import loadable from 'loadable-components';
import { compose, lifecycle, pure, setStatic } from 'recompose';
import { fetchUsers as fetchUsersFromServer } from 'actions/user';

export default compose(
  setStatic('loadData', dispatch => dispatch(fetchUsersFromServer())),
  lifecycle({
    componentDidMount() {
      const {
        user: {
          status: { isFetchedUserList },
        },
        userActions: { fetchUsers },
      } = this.props;

      if (!isFetchedUserList) {
        fetchUsers();
      }
    },
  }),
  pure
)(loadable(() => import('pages/Home/Home')));
