export const initialState = {
  currentUserID: '1'
};

export const setCurrentUser = currentUser => value => {
  currentUser.setState({ currentUserID: value });
};
