export const initialState = {
  currentUserID: localStorage.getItem('currentUserID') || 0,
  currentUserDetailID: localStorage.getItem('currentUserDetailID') || 0,
  userName: localStorage.getItem('userName') || '',
  accountType: localStorage.getItem('accountType') || ''
};

export const setCurrentUserID = currentUser => value => {
  currentUser.setState({ currentUserID: value });
  localStorage.setItem('currentUserID', value);
};
export const setCurrentUserDetailID = currentUser => value => {
  currentUser.setState({ currentUserDetailID: value });
  localStorage.setItem('currentUserDetailID', value);
};
export const setUserName = currentUser => value => {
  currentUser.setState({ userName: value });
  localStorage.setItem('userName', value);
};
export const setAccountType = currentUser => value => {
  currentUser.setState({ accountType: value });
  localStorage.setItem('accountType', value);
};
export const resetCurrentUser = currentUser => () => {
  localStorage.removeItem('currentUserID');
  localStorage.removeItem('userName');
  localStorage.removeItem('accountType');
  localStorage.removeItem('currentUserDetailID');

  currentUser.setState({
    currentUserID: currentUser.initialState.currentUserID,
    userName: currentUser.initialState.userName,
    accountType: currentUser.initialState.accountType,
    currentUserDetailID: currentUser.initialState.currentUserDetailID
  });
};
