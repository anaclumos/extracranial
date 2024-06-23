---
lang: 'en'
slug: '/19871A'
---

Django REST Framework (DRF) is a powerful and flexible toolkit for building Web APIs using the Django web framework. It is built on top of Django and provides a set of tools, classes, and functionalities to simplify the creation of RESTful APIs.

1. Serialization: DRF provides serializers that allow you to convert complex data types, such as Django models, into Python datatypes that can be easily rendered into JSON, XML, or other content types.
2. Request parsing: It handles request parsing and supports various request formats, such as JSON, form data, and file uploads.
3. View classes: DRF offers a set of reusable view classes that handle common HTTP methods (GET, POST, PUT, DELETE, etc.) and provide a consistent way of working with APIs.
4. Authentication and permissions: It includes built-in authentication classes for handling user authentication and provides fine-grained permission control for API access.
5. Throttling: DRF allows you to control the rate of requests to your API to prevent abuse and protect your server resources.
6. API documentation: It automatically generates interactive API documentation using tools like Swagger or ReDoc.
7. Viewsets and Routers: DRF provides viewsets that combine related views into a single class and routers that automatically generate URL patterns for your API endpoints.

Django REST Framework simplifies the process of building APIs by providing a set of conventions and abstractions. It promotes clean and maintainable code structure and helps in creating robust and scalable APIs quickly. DRF is widely used and has a large community of developers contributing to its development and providing extensions and third-party packages.

## Django vs Django Rest Framework

|                   | Django                                                                                                                                                                                                                 | DRF                                                                                                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Purpose           | High-level Python web framework used for building web applications. It follows the Model-View-Controller (MVC) architectural pattern and provides a wide range of features for developing full-stack web applications. | Extension of Django that focuses specifically on building Web APIs. It provides additional tools and abstractions to simplify the creation of RESTful APIs.                                                                                      |
| API Development   | Django does not have built-in features specifically designed for API development. However, you can still create APIs using Django's views and handle request/response serialization manually.                          | DRF is built on top of Django and provides a powerful and flexible toolkit for building APIs. It offers serializers, view classes, authentication, permissions, throttling, and other features tailored for API development.                     |
| Serialization     | Django does not have a built-in serialization mechanism. You need to manually serialize and deserialize data when working with APIs                                                                                    | DRF provides a serialization framework that allows you to easily convert complex data types (such as Django models) to and from JSON, XML, or other formats.                                                                                     |
| Request Handling  | Django's request handling is primarily designed for web applications. You need to manually parse request data and handle different HTTP methods in your views.                                                         | DRF provides a set of view classes that handle common HTTP methods and request parsing out of the box. It simplifies the process of handling different request types and provides a consistent way of working with APIs.                         |
| API Documentation | Django does not have built-in tools for generating API documentation. You would need to manually document your API endpoints and request/response formats.                                                             | DRF integrates with tools like Swagger and ReDoc to automatically generate interactive API documentation based on your API endpoints and serializers.                                                                                            |
| Learning Curve    | Django has a relatively gentle learning curve, especially if you are familiar with Python and web development concepts.                                                                                                | DRF builds upon Django and introduces additional concepts and abstractions specific to API development. It may have a slightly steeper learning curve compared to plain Django, but it provides a structured and efficient way of building APIs. |

## Serializers

Serialization refers to the process of converting complex data types, such as Django models or querysets, into a format that can be easily rendered into JSON, XML, or other content types. Serialization allows you to transform data from the internal representation used by your application into a format that can be transmitted over the network and consumed by clients.

In DRF, serializers play a crucial role in the serialization process. A serializer is a class that defines how data should be serialized and deserialized. It specifies the fields to include, how they should be formatted, and any additional validation or data transformations required.

## ViewSets

In DRF, views are the building blocks of an API. They define how the API should handle different HTTP methods (such as GET, POST, PUT, DELETE) and what data should be returned in the response. DRF views are responsible for processing incoming requests, performing necessary operations (such as querying the database or validating data), and returning appropriate responses.

## JSON and HTML

DRF looks for the `Accept` header. If it's empty, it defaults to JSON. If it is specifically `text/html`, for example in a browser, it sends the HTML file.

## Commands

- `django-admin startproject tutorial` → Starts a new project
- `python manage.py makemigrations snippets` → Inside the `snippets` project, make migration files to reflect that to the DB
- `python manage.py migrate snippets` → Run that migrations
