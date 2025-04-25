# Task Management Microfrontend

The Task Management microfrontend is an Angular-based application for managing tasks. It allows users to:

- Create tasks with various statuses
- View and update existing tasks
- Delete tasks

When configured with `compact: true`, it transforms into a dashboard widget, displaying a monthly task count graph and a list of recent tasks.

The application supports two operational modes:

1. **Local Development Mode**:

   Runs as a standard Angular app for easier debugging and development.

2. **Embedded Mode**

   Bootstraps as a custom element, allowing seamless integration into any host environment.

## Prerequisites

Make sure the following are installed before proceeding:

- **Node.js** (v18.19.1 or higher): Download and install from https://nodejs.org.
- **npm** (v10.2.4 or higher): Included with Node.js.
- **Angular CLI** (v18): Install globally with `npm install -g @angular/cli@18`.
- **webpack and webpack-cli**: To create a single bundle file. Install globally with: `npm install -g webpack webpack-cli`.
- **http-server**: To serve the built bundle locally. Install globally with: `npm install -g http-server`.
- **running server**: Ensure `project-management-api` is running at: `http://localhost:3000`.

## Setup and Installation

### Local Development Mode

To run the microfrontend locally in development mode:

1. **Navigate to the Project Directory**:

   ```bash
   cd ./projects/task-management
   ```

2. **Install Dependencies**:

   ```bash
   npm install --force
   ```

3. **Verify the Server**:

   Ensure the the server is running at: `http://localhost:3000`.

4. **Start the Application**:

   ```bash
   ng serve
   ```

   The application will be available at: `http://localhost:4200`.

5. **Enable Compact Mode (Optional)**

   To enable compact mode, which limits the application to a dashboard widget:

   1. Open: `src/app/components/entry/entry.component.ts`.
   2. Set the `compact` property to `true`.
   3. Save and restart if needed.

### Embedded Mode

To build and serve the microfrontend as a custom element:

1. **Navigate to the Project Directory**:

   ```bash
   cd ./projects/task-management
   ```

2. **Install Dependencies**:

   ```bash
   npm install --force
   ```

3. **Build the Application**:

   ```bash
   ng build
   ```

   The output will be located in the `dist` directory.

4. **Create a Bundle**:

   ```bash
   webpack
   ```

5. **Serve the Bundle**:

   ```bash
   npm run task
   ```

The `bundle.js` will be available at: `http://localhost:4202/bundle.js`.
