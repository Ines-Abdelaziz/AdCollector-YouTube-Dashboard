// src/types/interfaces.ts

export interface PoliticalAdminAd {
    user_id: string;
    id: string;
    advertiser: string;
    advertiser_link	: string;
    advertiser_location: string;
    transcript: string[];  // Transcript is an array of strings
    targeting_strategy	: string;  // Added targeting strategy
    political: string;
  }
  