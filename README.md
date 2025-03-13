# Financial Control

A comprehensive financial management system with an Express backend and React frontend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Docker Desktop
- Git

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/financial-control.git cd financial-control
    ```

2. **Set up environment variables**
    Create a `.env` file in the root directory with:
   
    ```bash
       DB_USER=postgres
       DB_PASSWORD=test123
       DB_HOST=localhost
       DB_NAME=financial_control
       DB_PORT=5432
       JWT_SECRET=your_jwt_secret_key
    ```   

3. **Install dependencies and set up database**

    ***Install dependencies***
    ```bash
    npm install
    ```
    ***Create and seed database***
    ```bash
    npm run db:recreate
    ```

4. **Start the application**

    ***Start backend server***
   ```bash
    npm run start
   ```

   ***In a separate terminal, start frontend development server***
   ```bash
    npm run dev
   ```


## 🛠️ Development

### Database Management
- **Create database**: `npm run db:create`
- **Run migrations**: `npm run db:migrate`
- **Rollback migrations**: `npm run db:rollback`
- **Reset database**: `npm run db:reset`
- **Recreate database**: `npm run db:recreate`

### Git Workflow
1. Create a feature branch from master
2. When ready to merge:
   ```bash
    #Save your changes if needed
    
    git stash -m 'your comment'

    #Update master

    git checkout master git pull

    #Return to your branch and merge

    git checkout your-feature-branch git merge master
    
    #Apply stashed changes if any

    git stash apply
   ```

3. Recreate database after merging: `npm run db:recreate`

## 📚 Project Structure

<pre>
📂financial-control/
├── 📂server/           # Backend Express application
│   ├── 📂controllers/  # API route handlers
│   ├── 📂models/       # Sequelize models
│   ├── 📂routes/       # API routes
│   └── 📂migrations/   # Database migrations
├── 📂src/              # Frontend React application
│   ├── 📂components/   # React components
│   ├── 📂pages/        # Page components
│   ├── 📂services/     # API service calls
│   └── 📂utils/        # Helper functions
└── 📜package.json      # Project dependencies and scripts
</pre>


## 🔗 Project Resources
- [Jira Board](https://financial-control.atlassian.net/jira/software/projects/FC/boards/1)
- [TestRail](https://financialcontrol.testrail.io/)

## 📝 License
[MIT](LICENSE)

## 👥 Contributors
- [Ricardo Polanski](https://github.com/ricardopolanski)
- [Patricie Lopes](https://github.com/ricardopolanski)

---

*This project is a financial control management system built with React, Express, and PostgreSQL.*





