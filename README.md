# GoalFlow Dashboard

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![MUI](https://img.shields.io/badge/MUI-v7-blue)
![License](https://img.shields.io/badge/License-MIT-green)


A modern React-based goal and habit tracking application that helps users create goals, track progress, build streaks, earn XP, and manage personal growth through a clean and responsive dashboard.

---


## 📸 Screenshots

<div align="center">
  <table align="center">
    <tr align="center">
      <td align="center">
        <h3>Desktop View</h3>
        <a href="https://github.com/nargesyaghoubi-ygh/Goal-Tracker/blob/main/public/desktop.png">
          <img src="https://github.com/nargesyaghoubi-ygh/Goal-Tracker/blob/main/public/desktop.png?raw=true" height="400px">
        </a>
      </td>
      <td align="center">
        <h3>Desktop View</h3>
        <a href="https://github.com/nargesyaghoubi/GoalFlow/blob/main/public/desktop-fa.png">
          <img src="https://github.com/nargesyaghoubi/GoalFlow/blob/main/public/desktop-fa.png?raw=true" height="400px">
        </a>
      </td>
      <td align="center">
        <h3>Mobile View</h3>
        <a href="https://github.com/nargesyaghoubi/GoalFlow/blob/main/public/mobile-dark.png">
          <img src="https://github.com/nargesyaghoubi/GoalFlow/blob/main/public/mobile-dark.png?raw=true" height="400px">
        </a>
      </td>
      <td align="center">
        <h3>Mobile View</h3>
        <a href="https://github.com/nargesyaghoubi/GoalFlow/blob/main/public/mobile-light.png">
          <img src="https://github.com/nargesyaghoubi/GoalFlow/blob/main/public/mobile-light.png?raw=true" height="400px">
        </a>
      </td>
    </tr>
  </table>
</div>

---
## Features

### Dashboard

- Overall completion percentage
- Active goals overview
- Completed goals count
- Current streak
- XP points
- Quick actions for goal management

### Goal Management (CRUD)

- Create new goals
- View goal details
- Edit goals
- Delete goals with confirmation
- Pause and resume goals

### Progress Tracking

- Daily progress logging
- Automatic progress percentage calculation
- Automatic completion when target is reached
- Progress history tracking

### Categories

- Health
- Study
- Work
- Personal
- Finance
- Other

### Localization

- English
- Persian (RTL)
- German

### UI Features

- Responsive design
- Light / Dark theme
- Progress bars
- Category badges
- Empty states
- Confirmation dialogs

### Data Persistence

- LocalStorage based storage
- Goals persistence
- User statistics persistence

---

## Technologies Used

- React
- Vite
- React Router DOM
- Material UI (MUI)
- LocalStorage API

---

## Project Structure

```text
src/
├── assets/
├── components/
├── locales/
├── pages/
├── Theme/
├── utils/
└── App.jsx
```

---

## Installation

### Clone Repository

```bash
git clone <https://github.com/nargesyaghoubi/GoalFlow.git
>
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

---

## RTL / LTR Support

The application automatically changes layout direction based on the selected language.

### LTR Languages

- English
- German

### RTL Languages

- Persian

Direction is updated dynamically through:

```javascript
document.documentElement.dir = direction;
```

and MUI theme configuration:

```javascript
createTheme({
  direction,
});
```

---

## Streak Rules

The streak system follows these rules:

1. Logging progress on consecutive days increases the streak.
2. Missing a day resets the streak.
3. Streak is updated whenever a progress entry is added.

---

## XP Rules

| Action | XP |
|----------|------|
| Progress Log | +20 |
| Goal Completion | +50 |

XP is displayed on the dashboard and stored in LocalStorage.

---

## Future Improvements

- Charts and analytics
- Notifications and reminders
- Export goals to JSON / CSV
- Cloud database integration
- Authentication system

---
## Contact
For any inquiries, please contact:
- nargesyaghoubi2001@gmail.com

## Links
### Narges Yaghoubi
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://nargesyaghoubi-ygh.github.io/My-portfolio/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/narges-yaghoubi-656a28243/)




