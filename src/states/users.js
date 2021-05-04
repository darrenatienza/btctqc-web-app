export const initialState = {
  selectedUserID: 0,
  showListView: true,
  showDetailView: false,
  refreshList: false
};

export const setSelectedUserID = users => value => {
  users.setState({ selectedUserID: value });
};
export const setShowListView = users => value => {
  users.setState({ showListView: value });
};

export const setShowDetailView = users => value => {
  users.setState({ showDetailView: value });
};
export const setRefreshList = users => value => {
  users.setState({ refreshList: value });
};
