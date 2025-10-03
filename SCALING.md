### Note on Scalability

**Frontend Scaling:**
To scale the frontend, I would implement a more robust global state management library like Redux or Zustand for complex application states. I'd leverage Next.js's capabilities like Server-Side Rendering (SSR) for improved performance and SEO. Further component-based architecture would be enforced, and code-splitting would be used to ensure clients only download the necessary JavaScript for a given page.

**Backend Scaling:**
To scale the backend, I would transition from a monolithic architecture to a microservices-based one (e.g., an auth service, a notes service). This allows for independent scaling of different parts of the application. I would containerize the services using Docker for consistent environments and orchestrate them with Kubernetes for auto-scaling and high availability. For the database, adding indexes to frequently queried fields in MongoDB and implementing a read replica strategy would be critical to handle increased load.Test change.