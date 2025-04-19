# Project Management Tool

This is the frontend of a project management tool, structured using a microfrontend architecture. It consists of three main projects:

- [`application-shell`](./projects/application-shell): Acts as the orchestrator of the microfrontends.
- [`user-management`](./projects/user-management): Microfrontend responsible for user-related features.
- [`task-management`](./projects/task-management): Microfrontend responsible for task-related features.

## Setup and Installation

To run the application locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd ./project-management-tool
   ```

2. **Start the Server**:

   Set up and start the server by following the instructions in [`project-management-api`](../project-management-api)

3. **Run the Application Shell**

   Start the frontend application by following the steps provided in[`application-shell`](./projects/application-shell)
