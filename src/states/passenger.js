export const initialState = {
  selectedPassengerID: 0,
  showListView: false,
  showDetailView: false
};

export const setSelectedPassengerID = passenger => value => {
  passenger.setState({ selectedPassengerID: value });
};
export const setShowListView = passenger => value => {
  passenger.setState({ selectedPassengerID: value });
};

export const setShowDetailView = passenger => value => {
  passenger.setState({ selectedPassengerID: value });
};
