# TODO for Admin Monitoring System

## Tasks to Complete
- [ ] Modify Register.jsx to store user data in localStorage 'users'
- [ ] Modify Login.jsx to verify users from localStorage 'users'
- [ ] Modify TakenExam.jsx to store exam results in localStorage 'results'
- [ ] Update admin Dashboard.jsx to display totals and lists for users, exams, and results
- [ ] Test the changes to ensure data is stored and displayed correctly

## Information Gathered
- Admin Dashboard is currently empty and needs to show monitoring data.
- Teacher Dashboard displays exams from localStorage 'exams'.
- Students can view exams and take them, but results are not stored.
- Users are not stored; registration and login are simulated.
- System is frontend-only with no backend, relying on localStorage for data persistence.

## Plan
- Store users in localStorage during registration for admin to view all users.
- Store exam results in localStorage when submitted for admin to monitor performance.
- Admin Dashboard will show totals (users, exams, results) and lists of each.
- Fetch all data from localStorage to enable comprehensive monitoring.

## Dependent Files
- frontend/src/auth/Register.jsx: Add user storage
- frontend/src/auth/Login.jsx: Add user verification
- frontend/src/pages/student/TakenExam.jsx: Add result storage
- frontend/src/pages/admin/Dashboard.jsx: Add monitoring display

## Followup Steps
- Verify that users are stored and can be viewed by admin.
- Ensure results are saved and accessible for monitoring.
- Test admin Dashboard displays all data correctly.
