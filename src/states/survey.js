export const initialState = {
  selectedSurveyID: 0,
  showSurveyListView: true,
  showResponseListView: false
};

export const setSelectedSurveyID = bus => value => {
  bus.setState({ selectedSurveyID: value });
};
export const setShowSurveyListView = bus => value => {
  bus.setState({ showSurveyListView: value });
};

export const setShowResponseListView = bus => value => {
  bus.setState({ showResponseListView: value });
};
