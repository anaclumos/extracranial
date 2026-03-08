---
lang: 'en'
slug: '/E4E1CE'
---

WSGI (Web Server Gateway Interface) is a specification that describes how a web server communicates with web applications in Python. In the context of Django, WSGI serves as the interface between the Django application and the web server. Here's a brief overview of what WSGI does in Django:

1. Standardizes communication: WSGI provides a standard protocol for web servers to forward requests to web applications or frameworks written in Python.
2. Server-application interface: It acts as a bridge between the web server (like Apache or Nginx) and the Django application.
3. Request handling: When a request comes in, the WSGI server passes it to Django in a standardized format.
4. Response processing: After Django processes the request and generates a response, WSGI ensures that this response is sent back to the web server in the correct format.
5. Deployment flexibility: WSGI allows Django applications to be run on various web servers that support the WSGI standard, providing flexibility in deployment options.
6. Middleware support: WSGI enables the use of middleware components that can process requests and responses between the server and the application.

In a typical Django deployment, you'll use a WSGI server (like Gunicorn or uWSGI) to run your Django application, which then communicates with a web server like Nginx or Apache to handle client requests.
