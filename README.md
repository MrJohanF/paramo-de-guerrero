# Project Template

This repository provides a quick setup for a modern web application stack, integrating Next.js, React.js, Tailwind CSS, MySQL, and phpMyAdmin, all containerized using Docker.

<details>

<summary>File Structure</summary>

- **`public/`**: Contains static files such as images and favicon.
- **`src/`**: Contains the source code for the project.
  - **`app/`**: Contains the application routes and layout components.
    - **`about/`**: Route-specific components for the about page.
      - **`page.js`**: Defines the content for the about route.
    - **`api/`**: Contains API route handlers.
    - **`layout.js`**: Defines the layout for the application, including shared UI elements like headers and footers.
    - **`page.js`**: Defines the content for the root route (/).
  - **`components/`**: Contains reusable React components.
  - **`context/`**: Contains React context providers for global state management.
  - **`hooks/`**: Contains custom React hooks.
  - **`lib/`**: Contains libraries and utilities.
  - **`utils/`**: Contains utility functions and helpers.
- **`.dockerignore`**: Specifies files and directories to be ignored by Docker during the build process.
- **`.gitignore`**: Specifies files and directories to be ignored by Git.
- **`compose.yaml`**: Docker Compose configuration file for defining and running multi-container Docker applications.
- **`Dockerfile`**: Instructions for building the Docker image for the application.
- **`jsconfig.json`**: Configuration file for JavaScript project settings and module resolution.
- **`next.config.msj`**: Configuration file for customizing Next.js settings.
- **`package.json`** Lists project dependencies, scripts, and metadata.
- **`postcss.config.msj`** Configuration file for PostCSS, used for processing CSS.
- **`README.md`** Project overview and instructions.
- **`README.Docker.md`** If used, should contain Docker-specific instructions and information.
- **`tailwind.config.js`** Configuration file for Tailwind CSS, if Tailwind is used in the project.

</details>

#

## Setup Instructions

### Clone the Repository

```
git clone https://github.com/MrJohanF/paramo-de-guerrero.git
```
```
cd docker-phpmyadmin-ready-to-use
```

### Create Database Credentials

Create a folder named `db/` in the root of the project. Inside this folder, create a file named `password.txt` and put your MySQL database password in it.

### Configure Database 

Update the `compose.yaml` file to match your database configuration. Make sure to change the database name, user, and password as needed.

### Build and Start Containers

```
docker-compose up --build
```

### Grant Privileges

After the containers are up, run the following command to access the MySQL container and grant privileges to the user:

```
docker-compose exec db mysql -u root -p
```

Once in the MySQL prompt, run the following SQL commands to grant privileges and flush them:

```
GRANT ALL PRIVILEGES ON *.* TO 'your_user'@'%' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;
```



