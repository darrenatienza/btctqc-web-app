export const initialState = {
  selectedUserID: 0,
  showListView: true,
  showDetailView: false,
  refreshList: false
};

export const setSelectedBusID = bus => value => {
  bus.setState({ selectedBusID: value });
};
export const setShowListView = bus => value => {
  bus.setState({ showListView: value });
};

export const setShowDetailView = bus => value => {
  bus.setState({ showDetailView: value });
};
export const setRefreshList = bus => value => {
  bus.setState({ refreshList: value });
};
