import React from 'react';
import { OrbitalNavRing } from '../navigation/OrbitalNavRing';
import { HoloPanel } from './HoloPanel';
import { IdentityOrb } from './IdentityOrb';
import { DataParticles } from '../effects/DataParticles';
import { HoloAccessibility } from '../a11y/HoloAccessibility';

export default function Holoshell({ children, userRole }) {
  return (
    <div className="holoshell-container">
      <div className="holoscene" data-role={userRole}>
        <OrbitalNavRing level="primary" />
        <OrbitalNavRing level="secondary" />

        <HoloPanel side="left" />
        <HoloPanel side="right" />

        <IdentityOrb />

        <main className="content-zone">
          <div className="content-hologram">{children}</div>
        </main>

        <DataParticles />
        <HoloAccessibility />

        <footer className="powered-by">
          Powered by Murnova Technology Limited
        </footer>
      </div>
    </div>
  );
}
