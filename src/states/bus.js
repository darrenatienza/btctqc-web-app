export const initialState = {
  selectedBusID: 0,
  selectedSurveyDate: '',
  selectedPassengerID: 0,
  selectedSurveyID: 0,
  showListView: true,
  showDetailView: false,
  showSurveyDateListView: false,
  showSurveyPassengerListView: false,
  showSurveyInfoView: false,
  showPrintListView: false,
  showBusPassengerListPrintView: false,
  refreshList: false
};
export const setShowBusPassengerListPrintView = bus => value => {
  bus.setState({ showBusPassengerListPrintView: value });
};
export const setShowPrintListView = bus => value => {
  bus.setState({ showPrintListView: value });
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
export const setSelectedSurveyDate = bus => value => {
  bus.setState({ selectedSurveyDate: value });
};
export const setSelectedPassengerID = bus => value => {
  bus.setState({ selectedPassengerID: value });
};
export const setShowSurveyDateListView = bus => value => {
  bus.setState({ showSurveyDateListView: value });
};
export const setShowSurveyPassengerListView = bus => value => {
  bus.setState({ showSurveyPassengerListView: value });
};
export const setShowSurveyInfoView = bus => value => {
  bus.setState({ showSurveyInfoView: value });
};
export const setSelectedSurveyID = bus => value => {
  bus.setState({ selectedSurveyID: value });
};
