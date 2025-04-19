# Application Shell

The Application Shell is an Angular-based orchestrator for the User Management and Task Management microfrontends. It handles:

- Application routing
- Rendering of microfrontends
- Shared configuration management
- Display of common UI elements

## Prerequisites

Make sure the following are installed before proceeding:

- **Node.js** (v18.19.1 or higher): Download and install from https://nodejs.org.
- **npm** (v10.2.4 or higher): Included with Node.js.
- **Angular CLI** (v18): Install globally with `npm install -g @angular/cli@18`.
- **User Management**: microfrontend running at: `http://localhost:4201`.
- **Task Management**: microfrontend running at: `http://localhost:4202`.

## Setup and Installation

To set up and run the Application Shell:

1. **Navigate to the Project Directory**:

   ```bash
   cd ./projects/application-shell
   ```

2. **Install Dependencies**:

   ```bash
   npm install --force
   ```

3. **Run the Microfrontends:**:

   Make sure the dependent microfrontends are running. Refer to their setup instructions:

   - [`user-management`](../user-management)
   - [`task-management`](../task-management)

4. **Start the Application**:

   ```bash
   ng serve
   ```

   The application will be available at: `http://localhost:4200`.
