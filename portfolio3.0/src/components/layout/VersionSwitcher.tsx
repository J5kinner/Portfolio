import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CURRENT_VERSION_ID, getNextVersion, portfolioVersions } from '../../config/versions';
import { trackNavigation } from '../../utils/analytics';

const SwitchButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(39, 204, 145, 0.1);
  border: 1px solid rgba(39, 204, 145, 0.3);
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: rgba(39, 204, 145, 0.2);
    color: #27cc91;
  }
`;

const VersionSwitcher: React.FC = () => {
  const current = portfolioVersions.find(v => v.id === CURRENT_VERSION_ID);
  const next = getNextVersion(CURRENT_VERSION_ID);

  return (
    <SwitchButton
      href={next.url}
      aria-label={`Switch to portfolio version ${next.label}`}
      title="See how this site has evolved"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        try {
          trackNavigation(`version_${next.id}`, 'desktop');
        } catch (error) {
          console.warn('Analytics error:', error);
        }
      }}
    >
      v{current?.label} → v{next.label}
    </SwitchButton>
  );
};

export default VersionSwitcher;
