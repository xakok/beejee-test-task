## Installation
```sh
cd <your_projects_directory>
git clone git@gitlab.quartsoft.com:/farland/farland-api
cd farland-api
npm install
```

##Build
`npm run build`

## Configuration
Copy file `.env.sample` to `.env` and fill it with configuration parameters

## Script
- Start server: `npm run start`
- Check code with ESLint: `npm run lint`
- Run tests: `npm run test`
- Migrate database `npm run migrate`
- Create database migration `npm run create-migration <migration_name>`