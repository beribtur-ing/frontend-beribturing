export interface ProfileVisibility {
  showProfileToOtherUsers: boolean;
  showRentalHistory: boolean;
  showReviews: boolean;
}

export interface DataAndLocation {
  shareLocationWithLenders: boolean;
  allowDataCollectionForRecommendations: boolean;
}

export interface UpdatePrivacySettingsRntCommand {
  profileVisibility: ProfileVisibility;
  dataAndLocation: DataAndLocation
}