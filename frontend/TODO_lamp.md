# TODO for Lamp Toggle Feature in Login

## Tasks to Complete
- [x] Add state variable `isLampOn` to Login.jsx (default false)
- [x] Implement conditional rendering: show lamp UI when off, login form when on
- [x] Add "Pull String" button to toggle the lamp state
- [x] Style the lamp UI with gray bulb emoji when off, and ensure form appears when on
- [x] Change lamp to long lampstand with bulb (🪔)

## Information Gathered
- Login component uses React hooks and Tailwind CSS.
- Currently renders the form directly.
- Need to hide form initially and reveal on toggle.

## Plan
- Modify Login.jsx to include toggle functionality.
- Use useState for isLampOn.
- Render lamp (💡 gray) and button when off; form when on.

## Dependent Files
- frontend/src/auth/Login.jsx

## Followup Steps
- Run frontend dev server to test the toggle functionality.
- Ensure form is hidden initially and appears on toggle.
