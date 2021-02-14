export const initialState = {
  selectedBusID: 0,
  showListView: false,
  showDetailView: false,
  refreshList: false
};

export const setSelectedBusID = bus => value => {
  bus.setState({ selectedBusID: value });
};
export const setShowListView = bus => value => {
  bus.setState({ selectedPassengerID: value });
};

export const setShowDetailView = bus => value => {
  bus.setState({ showDetailView: value });
};
export const setRefreshList = bus => value => {
  bus.setState({ refreshList: value });
};
