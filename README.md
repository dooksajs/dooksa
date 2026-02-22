# 👋 Welcome to Dooksa Core

> [!WARNING]  
> Please keep in mind that Dooksa Core is still under active development and full backward compatibility is not guaranteed before reaching v1.0.0. It is not yet recommended for production-critical applications.

> **Note:** This repository houses the underlying architecture and core engine.

---

## What is Dooksa Core?

At its heart, Dooksa is a high-performance orchestrator. It is not just a UI library; it is a complete ecosystem that manages:

* **Extensible Plugin Architecture** 
  * Everything in Dooksa is built as a plugin. Plugins encapsulate state schemas, methods, actions, and lifecycle hooks, making the system endlessly customizable.
* **Advanced State Management** 
  * A built-in reactive data store that handles strict schema validation, bidirectional relationship tracking, cascade operations, and event-driven listeners. 
* **Visual Programming Ready** 
  * Dooksa's "Action System" allows you to define named actions with metadata and parameters. This makes it incredibly easy to map UI events to logic, serving as the perfect backbone for programmable or low-code interfaces.
* **Isomorphic Client/Server**
  * Create environments using `@dooksa/create-app/client` or `@dooksa/create-app/server`. On the client, it manages a Virtual DOM with data binding; on the server, the exact same core acts as a high-speed web server and structured database.
* **Zero-Dependency & Lightweight** 
  * The Dooksa client preset is highly optimized and uses only Web Standard APIs.

**Dooksa** is a play on words _**"Look This" 👀👉** as my young bilingual daughter would say (a mix of English/French)_ 

## Getting Started

To explore the core or contribute to its development, start the development server and playground:

```bash
pnpm install
```
```bash
pnpm run dev
```

> ℹ️ Fun fact, the port number is [Fletcher-8](https://gchq.github.io/CyberChef/#recipe=Fletcher-8_Checksum()To_Hex('None',0)&input=ZG9va3Nh) checksum of `dooksa` 


## Core Packages

The Dooksa Core monorepo is divided into several packages:

[`@dooksa/create-app`](/tree/main/packages/create-app) - Main entry points for creating and configuring client and server applications.

[`@dooksa/create-plugin`](/tree/main/packages/create-plugin) - Utilities to create plugin instances with state, actions, and dependencies.

[`@dooksa/plugins`](tree/main/packages/plugins) - The core state management system, schema handling, and core functionalities.

## Documentation

Detailed documentation for the architecture and individual packages can be found in their respective directories:

[State Management & Schema Guide](/tree/main/packages/plugins/docs)

[Plugin Creation Guide](/tree/main/packages/create-plugin/docs)

[Application Setup Guide](/tree/main/packages/create-app/docs)

## Contributing

We are building a foundation for the next generation of visual programming tools, and contributions are welcome!

- Create an Issue to propose new architectural features or report core bugs.

- Submit a Pull Request to optimize the VDOM, expand the state schema, or improve the isomorphic server.

- Build and share third-party @dooksa plugins.

For more details, see [CONTRIBUTING.md](/blob/main/CONTRIBUTING.md).

Distributed under the AGPL-3.0 License.
