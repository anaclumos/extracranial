---
lang: 'en'
slug: '/A3D87E'
---

GraphQL is a query language and runtime designed to help build APIs with precise, efficient data fetching capabilities. Developed by [[Facebook]] in 2012 and open-sourced in 2015, GraphQL allows clients to define the structure of the responses they need, preventing excessive data from being returned. Here are the main features and benefits:

1. **Strongly Typed**. GraphQL APIs are organized in terms of types and fields, not endpoints, allowing more control over the returned data.
2. **Client-specified responses**. Instead of receiving a fixed structure of data from a server, clients can request exactly what they need, which can reduce the amount of data that needs to be transferred over the network.
3. **Hierarchical**. The shape of a GraphQL query closely matches the result, making it easier to understand what the result will be.
4. **Introspective**. GraphQL APIs can be explored via introspection, meaning you can query the available operations and types.
5. **Version-Free**. Changes, additions, and deprecations can be managed without creating new API versions.

In contrast to traditional REST APIs, where the server defines what data is provided on each endpoint, GraphQL gives more power to the client to determine its data needs. As a result, GraphQL is an excellent choice for complex applications with nested data dependencies, as it can drastically reduce the number of requests needed to fetch data. However, it also requires more logic on the client side to construct and interpret these queries.
