export const initialState = {
  currentUserID: '1',
  userName: ''
};

export const setCurrentUser = currentUser => value => {
  currentUser.setState({ currentUserID: value });
};

export const setUserName = currentUser => value => {
  currentUser.setState({ userName: value });
};
