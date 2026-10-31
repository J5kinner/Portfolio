export interface PortfolioVersion {
  id: string;
  label: string;
  url: string;
}

// Override with REACT_APP_VERSION_URL_<N> if the versions are hosted elsewhere.
export const portfolioVersions: PortfolioVersion[] = [
  { id: 'v1', label: '1.0', url: process.env.REACT_APP_VERSION_URL_1 || '/v1/' },
  { id: 'v2', label: '2.0', url: process.env.REACT_APP_VERSION_URL_2 || '/v2/' },
  { id: 'v3', label: '3.0', url: process.env.REACT_APP_VERSION_URL_3 || '/' },
];

export const CURRENT_VERSION_ID = 'v2';

// Next version in history order, wrapping from newest back to oldest.
export const getNextVersion = (currentId: string): PortfolioVersion => {
  const index = portfolioVersions.findIndex(v => v.id === currentId);
  return portfolioVersions[(index + 1) % portfolioVersions.length];
};
