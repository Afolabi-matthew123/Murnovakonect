import { NavOrb } from './NavOrb';

const NAV_ITEMS = {
  primary: [
    { id: 'home', label: 'Home' },
    { id: 'students', label: 'Students' },
    { id: 'staff', label: 'Staff' }
  ],
  secondary: [
    { id: 'settings', label: 'Settings' }
  ]
};

export function OrbitalNavRing({ level }) {
  return (
    <div className={orbital-ring }>
      {NAV_ITEMS[level].map((item, index) => (
        <NavOrb
          key={item.id}
          item={item}
          angle={(360 / NAV_ITEMS[level].length) * index}
          distance={level === 'primary' ? 120 : 80}
        />
      ))}
    </div>
  );
}
