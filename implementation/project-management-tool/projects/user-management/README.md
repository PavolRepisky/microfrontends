# User Management Microfrontend

The User Management microfrontend is an Angular-based application for managing users. It provides features for:

- Creating users with various roles
- Viewing and updating user details
- Deleting users

When configured with `compact: true`, it functions as a dashboard widget, showing a monthly user count graph and a list of newly created users.

This microfrontend supports two modes:

1. **Local Development Mode**:

   Runs as a standard Angular application for debugging and iterative development.

2. **Embedded Mode**:

   Bootstraps as a custom element, enabling integration into external applications.

## Prerequisites

Make sure the following are installed before proceeding:

- **Node.js** (v18.19.1 or higher): Download and install from https://nodejs.org.
- **npm** (v10.2.4 or higher): Included with Node.js.
- **Angular CLI** (v18): Install globally with `npm install -g @angular/cli@18`.
- **http-server**: To serve the built bundle locally. Install globally with: `npm install -g http-server`.
- **webpack and webpack-cli**: To create a single bundle file. Install globally with: `npm install -g webpack webpack-cli`.
- **running server**: Ensure `project-management-api` is running at: `http://localhost:3000`.

## Setup and Installation

### Local Development Mode

To run the microfrontend locally in development mode:

1. **Navigate to the Project Directory**:

   ```bash
   cd ./projects/user-management
   ```

2. **Install Dependencies**:

   ```bash
   npm install --force
   ```

3. **Verify the Server**:

   Ensure the server is running at: `http://localhost:3000`.

4. **Start the Application**:

   ```bash
   ng serve
   ```

   The application will be available at: `http://localhost:4200`.

5. **Compact Mode**

   To enable compact mode, which limits the application to a dashboard widget:

   1. Open: `src/app/components/entry/entry.component.ts`.
   2. Set the `compact` property to `true`.
   3. Save and restart if needed.

### Embedded Mode

To build and serve the microfrontend as a custom element:

1. **Navigate to the Project Directory**:

   ```bash
   cd ./projects/user-management
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
   npm run user
   ```

The `bundle.js` will be available at: `http://localhost:4201/bundle.js`.
