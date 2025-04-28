---
lang: 'en'
slug: '/2A7ECC'
---

## Database Systems

- Data != information
- Database (DB) and Database Management System (DBMS)
- Advantages of DBMS
- Types of DBs based on user count, location, content, data currency, and structure

### Evolution of Database Systems

- Early DBs: file systems
- Problems with file systems
  - Structural dependence
  - Redundancy of data
  - Data anomalies

### Database Systems

- DB vs file system
- DBMS functions
  - Data dictionary management
  - Data storage management
  - Data transformation and presentation
  - Security management
  - Multiuser access control
  - Backup and recovery management
  - Data integrity management
  - Interfaces and communication

### Key Concepts

- Data vs. Information
  - Data: raw facts, building blocks of information
  - Information: produced by processing data, reveals meaning, enables decision making
- Database: shared, integrated computer structure that stores end-user data and metadata
- DBMS: collection of programs that manages the database structure and controls access to data
- Advantages of DBMS: better data integration, increased productivity, improved data sharing, security, access, decision making, and quality
- Types of Databases
  - Based on user count: single-user, multiuser (workgroup, enterprise)
  - Based on location: centralized, distributed, cloud
  - Based on content: general-purpose, discipline-specific
  - Based on data currency: operational, analytical (data warehouse, OLAP)
  - Based on structure: unstructured, structured, semi-structured (XML)
- File system problems
  - Structural dependence, data dependence
  - Data redundancy, data anomalies (update, insertion, deletion)
- DBMS functions: data dictionary, storage, transformation, security, multiuser access, backup and recovery, integrity management, interfaces and communication
- Disadvantages of DB systems: increased costs, management complexity, maintaining currency, vendor dependence, frequent upgrade/replacement cycles

## Data Modeling

- Data modeling: iterative process of creating a specific data model for a problem domain
- Data models: simple representations of complex real-world data structures
- Importance of data models: communication tool, overall view of the database

### Data Model Building Blocks

- Entity: a unique and distinct object used to collect and store data
- Attribute: characteristic of an entity
- Relationship: describes an association among entities (1:M, M:N, 1:1)
- Constraint: set of rules to ensure data integrity

### Business Rules

- Brief, precise, and unambiguous description of a policy, procedure, or principle
- Enable defining basic building blocks and describing characteristics of the data
- Sources: company policy, department managers, written documentation, interviews
- Help standardize the company's view of data and serve as a communication tool
- Translate into data model components (nouns → entities, verbs → relationships)

### Naming Conventions

- Entity names: descriptive of objects in the business environment, familiar to users
- Attribute names: descriptive of the data represented
- Proper naming facilitates communication and promotes self-documentation

### Hierarchical and Network Models

- Hierarchical: manages large amounts of data, represents 1:M relationships
- Network: represents complex data relationships, depicts 1:M and M:N relationships

### Relational Model

- Based on a relation (table) composed of tuples (rows) and attributes (columns)
- Advantages: structural independence, conceptual simplicity, ad hoc query capability
- Relational Database Management System (RDBMS): performs basic functions, hides complexities

### Entity-Relationship (ER) Model

- Graphical representation of entities and their relationships in a database structure
- Entity Relationship Diagram (ERD): uses graphic representations to model components
- Advantages: visual modeling yields conceptual simplicity, effective communication tool
- Disadvantages: limited constraint and relationship representation, no data manipulation language

### Data Abstraction Levels

- External Model: end users' view of the data environment, represented by ER diagrams
- Conceptual Model: global view of the entire database, software and hardware independent
- Internal Model: database as seen by the DBMS, software-dependent and hardware-independent
- Physical Model: describes how data are saved on storage media, requires definition of physical storage and access methods

## Entity Relationship Model (ERM)

- Basis of an entity relationship diagram (ERD)
- ERD depicts conceptual database as viewed by end users, including entities, attributes, and relationships

### Attributes

- Characteristics of entities
  - Required attribute: must have a value
  - Optional attribute: can be left empty
- Domain: set of possible values for an attribute
- Identifiers: one or more attributes that uniquely identify each entity instance
  - Composite identifier: primary key composed of more than one attribute
- Attribute types
  - Composite attribute: can be subdivided into additional attributes
  - Simple attribute: cannot be subdivided
  - Single-valued attribute: has only a single value
  - Multivalued attribute: has many values, may require creating new attributes or entities
- Derived attribute: value calculated from other attributes

### Relationships

- Association between entities that operates in both directions
- Participants: entities that participate in a relationship
- Connectivity: describes the relationship classification
- Cardinality: expresses the minimum and maximum number of entity occurrences associated with one occurrence of a related entity
- Existence dependence
  - Existence dependent: entity exists only when associated with another related entity occurrence
  - Existence independent: entity exists apart from related entities (strong or regular entity)
- Relationship strength
  - Weak (non-identifying) relationship: primary key of related entity does not contain primary key component of parent entity
  - Strong (identifying) relationship: primary key of related entity contains primary key component of parent entity
- Weak entity: existence-dependent and has a primary key partially or totally derived from parent entity
- Relationship participation
  - Optional participation: entity occurrence does not require corresponding entity occurrence in a relationship
  - Mandatory participation: entity occurrence requires corresponding entity occurrence in a relationship
- Relationship degree: number of entities or participants associated with a relationship
  - Unary relationship: association maintained within a single entity
  - Recursive relationship: relationship exists between occurrences of the same entity set
  - Binary relationship: two entities are associated
  - Ternary relationship: three entities are associated

### Associative Entities

- Also known as composite or bridge entities
- Represent M:N relationships between two or more entities
- In a 1:M relationship with parent entities
- Composed of primary key attributes of each parent entity
- May contain additional attributes that play no role in the connective process

### Developing an ER Diagram

1. Create a detailed narrative of the organization's description of operations
2. Identify business rules based on the descriptions
3. Identify main entities and relationships from the business rules
4. Develop the initial ERD
5. Identify attributes and primary keys that adequately describe entities
6. Revise and review ERD

## Extended Entity Relationship Model (EERM)

- Result of adding more semantic constructs to the original entity relationship (ER) model
- EER diagram (EERD): uses the EER model

### Entity Supertypes and Subtypes

- Entity supertype: generic entity type related to one or more entity subtypes, contains common characteristics
- Entity subtype: contains unique characteristics of each entity subtype
- Criteria for usage:
  - Different, identifiable kinds of the entity in the user's environment
  - Different kinds of instances should have one or more unique attributes

### Specialization Hierarchy

- Depicts arrangement of higher-level entity supertypes and lower-level entity subtypes
- Relationships described in terms of "is-a" relationships
- Subtype exists within the context of a supertype
- Every subtype has one directly related supertype, while a supertype can have many subtypes
- Provides means to support attribute inheritance, define subtype discriminator, and define disjoint/overlapping and complete/partial constraints

### Inheritance

- Enables an entity subtype to inherit attributes and relationships of the supertype
- All entity subtypes inherit primary key attribute from their supertype
- At implementation level, supertype and subtype(s) maintain a 1:1 relationship
- Entity subtypes inherit all relationships in which supertype entity participates
- Lower-level subtypes inherit all attributes and relationships from upper-level supertypes

### Subtype Discriminator

- Attribute in the supertype entity that determines to which entity subtype the supertype occurrence is related
- Default comparison condition is the equality comparison

### Disjoint and Overlapping Constraints

- Disjoint subtypes: contain a unique subset of the supertype entity set (nonoverlapping subtypes)
  - Implementation based on the value of the subtype discriminator attribute in the supertype
- Overlapping subtypes: contain nonunique subsets of the supertype entity set
  - Implementation requires the use of one discriminator attribute for each subtype

### Completeness Constraint

- Specifies whether each supertype occurrence must also be a member of at least one subtype
- Types:
  - Partial completeness: not every supertype occurrence is a member of a subtype
  - Total completeness: every supertype occurrence must be a member of any subtype

## Relational Modeling

### Relational Tables

- Logical view: 'relation'
- Key concepts: keys, determinants, dependents, dependencies

### Keys

- Primary key (PK): attribute(s) that uniquely identify a row
- Composite key: key composed of multiple attributes
- Entity integrity: each row has a unique identity, no null values in PK
- Types of keys: superkey, candidate key, primary key, foreign key, secondary key
  - Superkey: attribute(s) that uniquely identify a row
  - Candidate key: irreducible superkey
  - Foreign key: attribute(s) in one table that match the PK in another table
  - Secondary key: attribute(s) used for data retrieval purposes

### Functional Dependency

- Value of one or more attributes determines the value of other attributes
- Determinant: attribute whose value determines another
- Dependent: attribute whose value is determined by another attribute
- Full functional dependence: entire collection of attributes in the determinant is necessary for the relationship

### Nulls and Referential Integrity

- Null: absence of a data value
- Referential integrity: every reference to an entity instance by another entity instance is valid
- Handling nulls: flags, NOT NULL constraint, UNIQUE constraint

### Relational Algebra

- Theoretical way of manipulating table contents using relational operators
- Relvar: variable that holds a relation
- Closure: use of relational algebra operators on existing relations produces new relations
- Relational set operators:
  - SELECT: outputs a subset of rows
  - PROJECT: outputs a subset of columns
  - UNION: combines all rows from two tables, excluding duplicates
  - INTERSECT: yields only rows that appear in both tables
  - DIFFERENCE: yields all rows in one table that are not found in the other
  - PRODUCT: yields all possible pairs of rows from two tables

### Joins

- Combine information from two or more tables
- Types of joins:
  - Natural join: links tables by selecting rows with common values in common attributes
  - Equijoin: links tables based on an equality condition comparing specified columns
  - Theta join: extension of natural join with a theta subscript
  - Inner join: returns only matched records from joined tables
  - Outer join: retains matched pairs and leaves unmatched values as null
    - Left outer join: yields all rows in the first table, including unmatched ones
    - Right outer join: yields all rows in the second table, including unmatched ones

### Data Dictionary and System Catalog

- Data dictionary: description of all user-created tables in the database
- System catalog: system data dictionary describing all objects within the database
- Homonyms (same name for different attributes) and synonyms (different names for the same attribute) should be avoided

## Database Normalization

- Normalization: evaluating and correcting table structures to minimize data redundancies
- Reduces data anomalies and assigns attributes to tables based on determination
- Normal forms: 1NF, 2NF, 3NF, BCNF, 4NF
- Higher normal forms are better than lower normal forms
- Denormalization: produces a lower normal form, increases performance, and introduces greater data redundancy

### The Need for Normalization

- Used while designing a new database structure or improving an existing one
- Analyzes relationships among attributes within each entity
- Improves the existing data structure and creates an appropriate database design

### The Normalization Process

- Objective: ensure each table conforms to well-formed relations
  - Each table represents a single subject
  - No data item is unnecessarily stored in more than one table
  - All nonprime attributes are dependent on the primary key
  - Each table is void of insertion, update, and deletion anomalies
- Ensures all tables are in at least 3NF
- Works one relation at a time by identifying dependencies and progressively breaking the relation into new relations

### Functional Dependence Concepts

- Functional dependence: attribute B is fully functionally dependent on attribute A if each value of A determines one and only one value of B
- Fully functional dependence (composite key): attribute B is fully functionally dependent on a composite key A if it is functionally dependent on A but not on any subset of A

### Types of Functional Dependencies

- Partial dependency: functional dependence in which the determinant is only part of the primary key
- Transitive dependency: an attribute functionally depends on another nonkey attribute

### Conversion to Normal Forms

- First Normal Form (1NF):
  - Eliminate repeating groups, identify the primary key, and identify all dependencies
  - All relational tables satisfy 1NF requirements
- Second Normal Form (2NF):
  - Make new tables to eliminate partial dependencies and reassign corresponding dependent attributes
  - Table is in 2NF when it is in 1NF and includes no partial dependencies
- Third Normal Form (3NF):
  - Make new tables to eliminate transitive dependencies and reassign corresponding dependent attributes
  - Table is in 3NF when it is in 2NF and contains no transitive dependencies

### Requirements for a Good Normalized Set of Tables

- Evaluate PK assignments and naming conventions
- Refine attribute atomicity (atomic attribute: cannot be further subdivided)
- Identify new attributes and relationships
- Refine primary keys as required for data granularity (level of detail represented by the values stored in a table's row)
- Maintain historical accuracy and evaluate using derived attributes

### Denormalization

- Design goals: creation of normalized relations and processing requirements and speed
- Joining a larger number of tables reduces system speed
- Defects in unnormalized tables:
  - Data updates are less efficient because tables are larger
  - Indexing is more cumbersome
  - No simple strategies for creating virtual tables known as views

## Structured Query Language (SQL)

- SQL is a nonprocedural language with a basic command vocabulary set of less than 100 words
- Differences in SQL dialects are minor
- SQL is an implementation of Ed Codd's relational set operators (SELECT, PROJECT, JOIN, UNION, INTERSECT, DIFFERENCE, PRODUCT, DIVIDE)

### SQL Data Types

- Numeric: NUMBER(L,D) or NUMERIC(L,D)
- Character: CHAR(L), VARCHAR(L) or VARCHAR2(L)
- Date: DATE

### Data Definition Language (DDL) Commands

- CREATE SCHEMA, CREATE TABLE, NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, DEFAULT, CHECK, CREATE INDEX, CREATE VIEW, ALTER TABLE, CREATE TABLE AS, DROP TABLE, DROP INDEX, DROP VIEW

### Data Manipulation Language (DML) Commands

- INSERT, SELECT, COMMIT, UPDATE, ROLLBACK, DELETE
- Comparison operators, logical operators, and special operators (BETWEEN, IS NULL, LIKE, IN, EXISTS)
- SELECT with ORDER BY, DISTINCT, aggregate functions (MIN, MAX, SUM, AVG), and GROUP BY

### Creating Table Structures

- Use one line per column definition and spaces to line up attribute characteristics and constraints
- Table and attribute names are capitalized
- Syntax: CREATE TABLE tablename(...);

### Primary Key and Foreign Key

- Primary key attributes contain both NOT NULL and UNIQUE specifications
- RDBMS enforces referential integrity for foreign keys
- Use ON DELETE and ON UPDATE clauses to specify actions on foreign key changes

### SQL Constraints

- NOT NULL, UNIQUE, DEFAULT, CHECK

### Data Manipulation Commands

- INSERT: add rows to a table
- SELECT: list table contents
- UPDATE: modify data
- DELETE: delete rows from a table
- COMMIT: save changes
- ROLLBACK: restore the database

### Additional SELECT Query Keywords

- ORDER BY: specify listing order
- DISTINCT: produce list of unique values
- Aggregate functions: MIN, MAX, SUM, AVG
- GROUP BY: create frequency distributions
- HAVING: extension of GROUP BY, applied to GROUP BY output

### Advanced Data Definition Commands

- ALTER TABLE: make changes to table structure (ADD, MODIFY, DROP)
- DROP TABLE: delete a table from the database

### Joining Database Tables

- Retrieve data from multiple tables using equality comparisons between foreign and primary keys
- Use table aliases to identify source tables
- Recursive joins: join a table to itself using aliases

## Advanced SQL

### SQL Join Operators

- Join types: natural join, join using, join on, outer join (left, right, full)
- Relational join operation merges rows from two tables based on common values, equality/inequality, or outer join conditions

### Subqueries and Correlated Queries

- Subquery: query inside another query, can return single value, list of values, virtual table, or no value
- WHERE subqueries: uses inner SELECT subquery on the right side of a WHERE comparison expression
- IN and HAVING subqueries: compare a single attribute to a list of values or restrict the output of a GROUP BY query
- FROM subqueries: uses SELECT subquery in the FROM clause to create a virtual table
- Attribute list subqueries: uses subquery expressions in the SELECT attribute list
- Correlated subquery: executes once for each row in the outer query, inner query references a column of the outer subquery

### Multirow Subquery Operators

- ALL operator: compares a single value with a list of values using comparison operators other than equals
- ANY operator: compares a single value to a list of values and selects rows greater than or less than any value in the list

### Relational Set Operators

- UNION: combines rows from two or more queries without duplicates
- UNION ALL: combines rows from two or more queries with duplicates
- INTERSECT: returns rows that appear in both query result sets
- EXCEPT (MINUS): returns rows that appear in the first query result set but not in the second

### Virtual Tables (Views)

- View: a virtual table based on a SELECT query
- CREATE VIEW statement: DDL command that stores the subquery specification in the data dictionary

### SQL Functions

- Functions use numeric, date, or string values and can appear anywhere a value or attribute is used
- Categories: numeric, character, date, conversion, null-related, aggregate, and miscellaneous functions

### Oracle Sequences

- Independent database objects used to generate numeric values for table columns
- Can be created, deleted, and edited any time

### Procedural SQL (PL/SQL)

- Performs conditional or looping operations by isolating code and making all application programs call the shared code
- Anonymous PL/SQL blocks, triggers, stored procedures, and functions

### Triggers

- Procedural SQL code automatically invoked by the RDBMS when a given data manipulation event occurs
- Parts: triggering timing (before/after), triggering event (insert/update/delete), triggering level (statement/row), and triggering action (PL/SQL code)

### Stored Procedures

- Named collection of procedural and SQL statements that reduce network traffic, increase performance, and reduce code duplication

### PL/SQL Stored Functions

- Named group of procedural and SQL statements that returns a value, can be invoked from within stored procedures or triggers

## Transaction Management and Concurrency Control

### Transactions

- Logical unit of work that must be entirely completed or aborted
- Consists of SELECT, UPDATE, and/or INSERT statements
- Must begin with the database in a known consistent state
- Transaction properties: Atomicity, Consistency, Isolation, Durability (ACID)

### Transaction Management with SQL

- SQL statements for transaction support: COMMIT, ROLLBACK
- Transaction sequence continues until COMMIT, ROLLBACK, end of program, or abnormal termination

### Transaction Log

- Keeps track of all transactions that update the database
- Used by DBMS for recovery and rollback

### Concurrency Control

- Coordination of simultaneous transaction execution in a multiuser database system
- Ensures serializability of transactions

### Problems in Concurrency Control

- Lost update: Same data element updated in two concurrent transactions, one update is lost
- Uncommitted data: Transaction is rolled back after a second transaction has accessed its uncommitted data
- Inconsistent retrievals: Transaction accesses data before and after other transactions finish working with the data

### The Scheduler

- Establishes the order of operations within concurrent transactions
- Creates serialization schedule to ensure serializability and isolation

### Concurrency Control with Locking Methods

- Locking methods facilitate isolation of data items used in concurrently executing transactions
- Pessimistic locking assumes conflict between transactions is likely
- Lock granularity: database, table, page, row, or field level

### Lock Types

- Binary lock: locked (1) or unlocked (0)
- Shared lock: read access granted to concurrent transactions
- Exclusive lock: write access reserved for the transaction that locked the object

### Two-Phase Locking (2PL)

- Guarantees serializability but does not prevent deadlocks
- Growing phase: transaction acquires all required locks without unlocking any data
- Shrinking phase: transaction releases all locks and cannot obtain new locks

### Deadlocks

- Occur when two transactions wait indefinitely for each other to unlock data
- Control techniques: prevention, detection, avoidance

### Time Stamping

- Assigns global, unique time stamp to each transaction
- Produces explicit order in which transactions are submitted to DBMS
- Disadvantages: increased memory needs and processing overhead

### Wait/Die and Wound/Wait Concurrency Control Schemes

- Two different schemes for requesting access based on transaction age

### Phases of Optimistic Approach

- Read: transaction reads database, executes computations, and makes updates to a private copy
- Validation: transaction is validated to ensure changes will not affect database integrity and consistency
- Write: changes are permanently applied to the database

## Distributed Database Management Systems (DDBMS)

- Centralized databases no longer popular or useful due to globalization and the need for rapid, ad-hoc data access
- Distributed databases are now the norm, especially for web-based applications

### Distributed Processing vs. Distributed Databases

- Distributed processing: database's logical processing shared among physically independent sites via a network
- Distributed database: logically related database stored over physically independent sites via a computer network

### DDBMS Components and Functions

- Components: computer workstations, network hardware and software, communications media, transaction processors (TP), and data processors (DP)
- Functions: receives application requests, validates and analyzes them, maps them, decomposes into I/O operations, searches and validates data, ensures consistency and security, and presents data in the required format

### Data and Processing Distribution

- Single-site processing, single-site data (SPSD): processing and data storage on a single host computer
- Multiple-site processing, single-site data (MPSD): multiple processes on different computers sharing a single data repository
- Multiple-site processing, multiple-site data (MPMD): fully distributed DBMS supporting multiple data and transaction processors at multiple sites

### Distributed Concurrency Control

- Important in distributed databases due to multi-site, multiple-process operations that can create inconsistencies and deadlocks
- Two-phase commit protocol (2PC): guarantees that if a portion of a transaction cannot be committed, all changes at other sites will be undone

### Distributed Database Transparency

- Distribution transparency: allows management of physically dispersed databases as if centralized
- Transaction transparency: ensures database transactions maintain distributed database integrity and consistency
- Performance transparency: allows a DDBMS to perform as if it were a centralized database
- Failure transparency: ensures the system will operate in case of network failure

### Distributed Database Design

- Data fragmentation: breaks a single object into many segments (horizontal, vertical, or mixed)
- Data replication: stores data copies at multiple sites served by a computer network
- Data allocation: determines where to locate fragments and replicas (centralized, partitioned, or replicated)

### The CAP Theorem

- Consistency, Availability, Partition tolerance
- In a distributed system, only two of the three can be fully achieved
- BASE (Basically Available, Soft state, Eventually consistent) model: data changes propagate slowly through the system until all replicas are consistent

### Date's 12 Commandments for DDBMS

- Local site autonomy, no central site dependence, failure independence, location transparency, fragmentation transparency, replication transparency, distributed query processing, distributed transaction processing, hardware independence, operating system independence, network independence, and database independence

## Database Connectivity and Web Technologies

### Database Connectivity

- Database middleware: provides an interface between the application program and the database
- Data repository/source: data management application used to store data generated by an application program
- Various connectivity options: Native SQL, ODBC, DAO+JET, RDO, OLE-DB, ADO.NET, JDBC

### Microsoft's Universal Data Access (UDA)

- Collection of technologies used to access any type of data source and manage data through a common interface
- ODBC, OLE-DB, and ADO.NET form the backbone of the MS UDA architecture

### Native SQL Connectivity

- Connection interface provided by database vendors, unique to each vendor
- Optimized for particular vendor's DBMS, but maintenance is a burden for programmers

### ODBC, DAO+Jet, RDO

- Open Database Connectivity (ODBC): Microsoft's implementation of SQL Access Group Call Level Interface (CLI) standard
- Data Access Objects (DAO): object-oriented API used to access MS Access, FoxPro, and dBase databases from Visual Basic
- Remote Data Objects (RDO): higher-level object-oriented application interface to access remote database servers

### Object Linking and Embedding for Database (OLE-DB)

- Database middleware that adds object-oriented functionality for access to data
- Series of COM objects provides low-level database connectivity for applications
- ActiveX Data Objects (ADO): provides a high-level application-oriented interface to interact with OLE-DB, DAO, and RDO

### ADO.NET

- Data access component of Microsoft's .NET application development framework
- Manipulates any type of data using any combination of network, operating system, and programming language
- Key features: DataSet (disconnected memory-resident representation of database) and XML support

### Java Database Connectivity (JDBC)

- Application programming interface that allows a Java program to interact with a wide range of data sources
- Advantages: leverages existing technology and personnel training, allows direct access to database server or via middleware, and provides a way to connect to databases through an ODBC driver

### Database Internet Connectivity

- Allows innovative services for rapid response, increased customer satisfaction, anywhere/anytime data access, and effective information dissemination

### Web-to-Database Middleware

- Server-side extension (program) that interacts directly with the web server
- Provides services to the web server transparently to the client browser

### Client-Side Extensions

- Add functionality to web browsers
- Types: plug-ins, Java, JavaScript, ActiveX, and VBScript

### Web Application Servers

- Middleware application that expands the functionality of web servers by linking them to a wide range of services
- Uses: connect to and query databases from web pages, create dynamic web search pages, enforce referential integrity
- Features: security, user authentication, access to multiple services, integrated development environment, computational languages, HTML page generation, performance, fault tolerance, and database access with transaction management

### Modern Architecture Styles

- SOAP: XML-based, for enterprise applications
- RESTful: resource-based, for web servers
- GraphQL: query language, reduces network load
- gRPC: high performance, for microservices
- WebSocket: bi-directional, for low-latency data exchange
- Webhook: asynchronous, for event-driven applications

## Business Intelligence (BI)

- Comprehensive, cohesive, integrated set of tools and processes
- Captures, collects, integrates, stores, and analyzes data
- Transforms data into information, information into knowledge, and knowledge into wisdom

### BI Benefits

- Improved decision making
- Integrating architecture
- Common user interface for data reporting and analysis
- Common data repository fosters a single version of company data
- Improved organizational performance

### Decision Support Data

- Differ from operational data in time span, granularity, and dimensionality
- Drill down: decomposing data to a lower level
- Roll up: aggregating data into a higher level

### Decision Support Database Requirements

- Complex, non-normalized data representations
- Aggregated and summarized data
- Queries extracting multidimensional time slices
- Batch and scheduled data extraction
- Support for different data sources and data validation rules
- Advanced integration, aggregation, and classification
- Support for very large databases (VLDBs) and multiple-processor technologies

### Data Warehouses

- Characteristics: integrated, subject-oriented, time-variant, and nonvolatile
- ETL (Extract, Transform, Load) process: filters, transforms, integrates, classifies, aggregates, and summarizes operational data

### Data Marts

- Small, single-subject data warehouse subset
- Provide decision support to a small group of people
- Benefits: lower cost, shorter implementation time, technologically advanced

### Star Schema

- Data-modeling technique mapping multidimensional decision support data into a relational database
- Components: facts (numeric values), dimensions (qualifying characteristics), attributes, and attribute hierarchy
- Facts and dimensions represented by physical tables in the data warehouse database
- Many-to-one (M:1) relationship between fact table and each dimension table

### Techniques to Optimize Data Warehouse Design

- Normalizing dimensional tables (snowflake schema)
- Maintaining multiple fact tables to represent different aggregation levels
- Denormalizing fact tables

### Data Analytics

- Encompasses mathematical, statistical, and modeling techniques to extract knowledge from data
- Explanatory analytics: discovers and explains data characteristics and relationships based on existing data
- Predictive analytics: predicts future outcomes with a high degree of accuracy

### Online Analytical Processing (OLAP)

- Advanced data analysis environment supporting decision making, business modeling, and operations research
- Characteristics: multidimensional data analysis techniques, advanced database support, easy-to-use end-user interfaces
- ROLAP (Relational OLAP): uses relational databases and tools to store and analyze multidimensional data
- MOLAP (Multidimensional OLAP): uses proprietary techniques to store data in matrix-like n-dimensional arrays

### SQL Extensions for OLAP

- ROLLUP: generates aggregates by different dimensions, enables subtotals for each column except the last (grand total)
- CUBE: generates aggregates by listed columns, includes the last column

## Spatial Databases

- Entity view: space populated by discrete objects (roads, buildings, rivers)
- Field view: space as an area covered with continuous surfaces
- Components: types, operators, indices

### Spatial Data

- Examples: crime data, disease spread, census data, real estate prices, traffic data, agricultural land use
- Created by government agencies, NASA, USGS, NOAA, and other organizations
- Described via points, polylines, polygons, and pixels/raster

### Spatial Database Management System (SDBMS)

- Architecture built on top of a general-purpose DBMS
- Adds spatial data types, operators, functions, and indexing to handle spatial data
- Differs from Geographic Information System (GIS) in application focus

### Spatial Relationships and Operations

- Topological relationships: containment, overlap, proximity
- Types: topology-based, metric-based, direction-based, network-based
- Operations: spatial predicates, functions, and measurements

### Spatial Data in Relational Databases

- Implemented using SQL's user-defined types (UDTs) and functions
- Supported by major DBMSs: Oracle, PostgreSQL, MySQL, SQL Server, DB2, Informix, and SQLite

### Indexing Spatial Data

- B-Trees with Z-order curves
- R-Trees and variants (R+, R\*)
- Quadtrees and Octrees
- K-D Trees and K-D-B Trees

### Query Processing

- Filter and refine strategy
- Filter step: query region overlaps with minimum bounding rectangles (MBRs)
- Refine step: query region overlaps with actual spatial objects

### Visualizing Spatial Data

- Dot maps, proportional symbol maps, diagram maps, choropleth maps
- Mapping platforms: ESRI ArcGIS, QGIS, MapBox, Carto, GIS Cloud

### Miscellaneous

- Google KML format for encoding spatial data
- OpenLayers as an open GIS platform

## Database Performance Tuning and Query Optimization

### Database Performance-Tuning Concepts

- Goal: execute queries as fast as possible
- Database performance tuning: set of activities and procedures to reduce response time
- Fine-tuning requires all factors to operate at optimum level with minimal bottlenecks

### Performance Tuning: Client and Server

- Client-side: SQL performance tuning, generating efficient SQL queries
- Server-side: DBMS performance tuning, configuring DBMS environment for optimal response

### DBMS Architecture

- Data stored in data files, grouped in file groups or table spaces
- Data cache or buffer cache: shared memory area for recently accessed data blocks
- SQL cache or procedure cache: stores recently executed SQL statements or PL/SQL procedures
- Listener, user, scheduler, lock manager, and optimizer processes

### Database Query Optimization Modes

- Automatic query optimization: DBMS finds the most cost-effective access path
- Manual query optimization: user or programmer selects and schedules optimization
- Static query optimization: best strategy selected at query compilation time
- Dynamic query optimization: access strategy determined at run time
- Statistically-based query optimization: DBMS uses statistics to determine the best access strategy
- Rule-based query optimization: based on user-defined rules to determine the best access strategy

### Query Processing

- Parsing: DBMS parses SQL query and chooses the most efficient access/execution plan
- Execution: DBMS executes SQL query using the chosen execution plan
- Fetching: DBMS fetches data and sends the result set back to the client

### Indexes and Query Optimization

- Help speed up data access and facilitate searching, sorting, aggregate functions, and join operations
- Data structures: hash indexes, B-tree indexes, bitmap indexes
- Index selectivity: measure of the likelihood that an index will be used in query processing
- Function-based index: based on a specific SQL function or expression

### Optimizer Choices

- Rule-based optimizer: uses preset rules and points to determine the best approach to execute a query
- Cost-based optimizer: uses algorithms based on statistics to determine the best approach to execute a query
- Optimizer hints: special instructions for the optimizer, embedded in the SQL command text

### SQL Performance Tuning

- Evaluated from the client perspective
- Most SQL performance optimization techniques are DBMS-specific and rarely portable
- Majority of performance problems are related to poorly written SQL code

### Conditional Expressions

- Guidelines for writing efficient conditional expressions in SQL code:
  - Use simple columns or literals as operands
  - Numeric field comparisons are faster than character, date, and NULL comparisons
  - Equality comparisons are faster than inequality comparisons
  - Transform conditional expressions to use literals
  - Write equality conditions first when using multiple conditional expressions
  - When using multiple AND conditions, write the condition most likely to be false first
  - When using multiple OR conditions, put the condition most likely to be true first
  - Avoid the use of NOT logical operator

### Query Formulation

- Identify required columns and computations
- Identify source tables
- Determine how to join tables
- Determine selection criteria
- Determine the order to display the output

### DBMS Performance Tuning

- Managing DBMS processes in primary memory and structures in physical storage
- Parameters for data cache, SQL cache, sort cache, and optimizer mode
- In-memory database: store large portions of the database in primary storage
- Recommendations for physical storage:
  - Use RAID for performance improvement and fault tolerance
  - Minimize disk contention
  - Put high-usage tables in their own table spaces
  - Assign separate data files in separate storage volumes for indexes, system, and high-usage tables

## NoSQL Databases

- The term NoSQL was used as early as 1998
- NoSQL databases arose due to the need for flexible, efficient, available, and scalable solutions for handling big data
- Advantages: high throughput, easy scalability, avoidance of complexity, ability to run on commodity hardware, etc.

### Factors Leading to the Need for NoSQL

- Rapid generation of new types of data
- Difficulty in fitting data into the relational model
- Scalability and performance issues with traditional databases

### Characteristics of NoSQL Databases

- Schema-less: no fixed tables or relationships
- Flexible: easy to add new types of data
- (Data) Scalable: ability to scale out (horizontal scaling)
- Fast: easy to process large volumes of data

### Types of NoSQL Databases

- Key-value stores
- Document stores
- Column-family stores
- Graph databases

### BASE vs. ACID

- NoSQL databases are characterized by BASE (Basically Available, Soft state, Eventually consistent)
- Traditional databases are characterized by ACID (Atomicity, Consistency, Isolation, Durability)

### Key-Value Databases

- Simple data model: keys paired with values
- Examples: Memcached, Redis, Amazon's Dynamo

### Document Databases

- Store data as documents (JSON, XML, etc.)
- Flexible schema, no need for joins
- Examples: MongoDB, CouchDB, Couchbase

### Column-Family Databases

- Store data in columns rather than rows
- Optimized for aggregate queries
- Examples: Google's BigTable, Apache Cassandra, Apache HBase

### Graph Databases

- Store data as nodes and edges (relationships)
- Optimized for traversing relationships
- Examples: Neo4j, FlockDB, HyperGraphDB

### Triple Store Databases

- Store data as triples (subject, predicate, object)
- Used for semantic querying and inference
- Examples: AllegroGraph, MarkLogic, SparkleDB

### Querying NoSQL Databases

- Non-SQL query languages, often specific to the database type
- MapReduce for parallel processing of large datasets

### Polyglot Persistence

- Using different NoSQL databases for different parts of an application
- Choosing the right database for each use case

### The CAP Theorem and NoSQL

- Consistency, Availability, Partition tolerance
- NoSQL databases often prioritize availability and partition tolerance over strong consistency

### Trends and Developments

- Increasing adoption of NoSQL databases for big data and web-scale applications
- Emergence of multi-model databases and hybrid SQL/NoSQL solutions

## Data Mining

- Data mining is the science of extracting useful information from large datasets
- Involves discovering relationships between parts of a dataset
- Data mining is a cyclical process: data → discovery → action ("deployment") → new data

### Machine Learning vs. Data Mining

- Machine learning: training an algorithm on an existing dataset to discover relationships and create a model for analyzing new data

### Data Mining Algorithms: Categories

1. Association: relating data
2. Clustering: grouping data based on similarity
3. Classification: labeling data
4. Regression: coupling data, including finding outliers

### Algorithms

### Decision Trees (e.g., C4.5, C5.0)

- Used for classification and regression
- Recursively partitions data space and fits a simple prediction model within each partition

### Support Vector Machine (SVM)

- Used for binary classification
- Finds a hyperplane that maximizes the gap between two classes of data

### k-Nearest Neighbors (kNN)

- Used for classification
- Classifies a new data point based on the majority class of its k nearest neighbors

### Naive Bayes

- Probability-based classifier
- Assumes each feature is statistically independent of the others

### k-Means Clustering

- Unsupervised learning algorithm
- Creates k clusters from input data based on a measure of closeness

### Hierarchical Clustering

- Organizes data into hierarchical clusters (clusters of clusters)
- Can be seen as merging smaller clusters into larger ones or dividing larger clusters into smaller ones

### Expectation-Maximization (EM)

- Used for clustering data with missing values or latent variables
- Iteratively estimates model parameters and latent variable distributions

### A Priori

- Used for association rule learning
- Finds frequently occurring itemsets in transactional data

### Linear Regression

- Models the relationship between a dependent variable and one or more independent variables
- Fits a line to the observed data

### Non-Linear Regression

- Fits a higher-order, non-linear surface to the observed data

### Non-Parametric Modeling

- Makes no assumptions about the form of the relationship between variables

### Logistic Regression

- Used for binary classification
- Computes regression coefficients corresponding to a decision boundary

### Ensemble Learning

- Combines results from multiple learners to improve predictive power
- Examples: RandomForest, Bagging, AdaBoost

### Classification vs. Clustering

- Classification algorithms assign new data to pre-existing, labeled categories
- Clustering algorithms group new data into unlabeled clusters based on similarity

## Machine Learning

- Machine learning is a subset of AI that is revolutionizing the world
- Three types of AI: inference-based (symbolic), goals/rewards-based (reinforcement), and connection-based (neuro)
- Machine learning comes in several flavors: supervised, unsupervised, semisupervised, and reinforcement learning

### Neural Networks

- Inspired by the human brain, which contains about 100 billion neurons
- A neuron is like a function with inputs (dendrites) and an output (axon)
- Artificial neurons are interconnected to form neural networks
- Output is generated through an activation function (e.g., sigmoid, ReLU)
- Learning occurs through adjusting weights and biases via backpropagation

### Convolutional Neural Networks (CNNs)

- Biologically inspired by the visual cortex
- Designed to process grid-like data (e.g., images)
- Consist of convolutional layers, pooling layers, and fully connected layers
- Convolutional layers detect features using filters (kernels)
- Pooling layers reduce spatial dimensions and provide translation invariance
- Fully connected layers perform classification or regression

### Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM)

- Designed to process sequential data (e.g., time series, text)
- RNNs have connections between nodes forming a directed graph along a temporal sequence
- LSTMs are a special kind of RNN, capable of learning long-term dependencies

### Generative Adversarial Networks (GANs)

- Consist of a generator network and a discriminator network
- Generator creates synthetic data, while the discriminator tries to distinguish real data from generated data
- Both networks are trained simultaneously in a minimax game

### Applications and Demonstrations

- Image and video recognition, natural language processing, speech recognition, and more
- Examples: Google's QuickDraw, DeepFake, style transfer, face detection, self-driving cars

### Key Players and Developments

- Major tech companies (Google, Facebook, Microsoft, Amazon) and researchers (Andrew Ng, Geoffrey Hinton, Yann LeCun)
- Hardware advancements (GPUs) and software frameworks (TensorFlow, PyTorch)

### Current Work and Future Directions

- Transformer architecture for language processing
- Graph neural networks, capsule networks, and attention mechanisms
- Explainable AI (XAI) for interpretability
- Neuromorphic computing for energy efficiency

### Challenges and Concerns

- Bias, explainability, adversarial attacks, and deepfakes
- Ethical considerations and potential misuse

## Map Reduce

### Functional Programming Concepts

- `lambda` operator allows defining anonymous, just-in-time functions.
- `map()` applies a function to a sequence (e.g., list).
- `filter()` filters elements of a list based on a Boolean-valued function.
- `reduce()` applies a function repeatedly to elements of a list to generate a single value.

### MapReduce Programming Paradigm

- Designed for processing Big Data in a parallel and distributed fashion.
- Consists of `map` and `reduce` phases, with an optional `shuffle` phase.
- Users supply a mapper task and a reducer task; the rest is handled automatically.
- Widely used for processing data in NoSQL databases.

### Hadoop Ecosystem

### Core Components

- **HDFS** — Hadoop Distributed File System for storing data across clusters.
- **YARN** — Yet Another Resource Negotiator, a resource management and job scheduling technology.

### Data Processing Engines

- **Hive** — SQL-like scripting language (HiveQL) for querying data stored in HDFS.
- **Pig** — Data flow language (Pig Latin) for parallel data processing on Hadoop.
- **Spark** — In-memory data processing engine for iterative and real-time processing.
- **Storm** — Distributed real-time computation system for processing unbounded streams of data.
- **Flink** — Parallel data processing platform, generalizing the MapReduce model.
- **Samza** — Processing engine for handling batch data and streaming data in a unified manner.

### Graph Processing

- **Giraph** — Open-source implementation of Google's Pregel, specifically designed for iterative graph computations.
- **HAMA** — General-purpose Bulk Synchronous Parallel (BSP) computing engine on top of Hadoop.

### Cloud Computing and Virtual Machine Setups

- Cloud platforms like AWS, Google Cloud, and Microsoft Azure offer computing resources and services for building Big Data applications.
- Virtual machines (VMs) can be used to experiment with Hadoop implementations like Hortonworks Sandbox, MapR Sandbox, and others.

### Bulk Synchronous Parallel (BSP) Model

- An alternative to MapReduce for parallel and distributed computing.
- Computation is divided into supersteps, with phases for local computation, communication, and synchronization barrier.
- Suitable for iterative computations, as input data can be saved in memory and transferred between supersteps.

## Data Visualization

- Visualization of data for understanding, communication, decision-making, and gaining insights.
- Types of visualizations: pie charts, bar charts, histograms, scatter plots, maps, network diagrams, word clouds, and more.
- Purpose: to make data more intuitive, revealing patterns, trends, and relationships.

### Simple Visualizations

- Pie charts for expressing relative fractions of a quantity.
- Bar charts and histograms for visualizing distributions and comparing values.
- Word clouds for indicating relative strengths of keywords or topics.
- Bubble plots for displaying multivariate data.

### Spatial Data Visualization

- Maps for plotting spatial data like locations, incidence, and geographic distributions.
- Choropleth maps for displaying aggregated data over regions (unclassed or classed).
- Superimposing data on maps for visualizing spatio-temporal data.

### Multivariate and Complex Data Visualization

- Charles Minard's chart on Napoleon's Russian campaign, considered one of the greatest statistical graphics ever drawn, showing multiple variables.
- Network visualizations for displaying relationships between entities, with node and edge attributes.

### Interactivity and Animation

- Interactive visualizations for exploration, drill-down, and selective viewing.
- Animations for presenting changes over time and providing fresh perspectives.

### Real-time Visualization

- Real-time visualizations for immediate and relevant data representations.
- Examples: traffic conditions, stock prices, earthquake monitoring, and population growth.

### Data Visualization Tools and Platforms

- Spreadsheet software like Excel.
- Mathematical and statistical packages: MATLAB, Mathematica, R, Python (matplotlib), and JavaScript (D3.js).
- Dedicated data visualization software and platforms: Tableau, Qlik, SiSense, and more.
- Online tools and services for creating visualizations.

### Principles and Guidelines

- Data visualization as an art and science, involving principles from various disciplines like visual perception, color theory, composition, and design.
- Guidelines for choosing appropriate visualizations based on data types and analysis goals.
- Emphasizing substance over methodology and graphic design (Edward Tufte's principles).

### Examples and Resources

- A collection of examples showcasing different visualization types and techniques.
- Resources for learning and practicing data visualization, including courses, whitepapers, and online galleries.

## Privacy, Security, and Data Governance

### Privacy

### General Data Protection Regulation (GDPR)

- The European Union's GDPR requires businesses to protect the personal data and privacy of EU citizens for transactions occurring within the EU.
- It provides a single set of privacy guidelines for EU member countries and citizens, effective from May 25, 2018.

### Privacy Challenges

1. Websites and e-commerce companies collect vast amounts of customer data for sales and analytics, making data vulnerable to theft and leakage.
2. Search data and online activities are tracked, enabling data inference and connecting of dots about individuals.
3. Surveillance and monitoring of individuals, particularly in countries like China and Japan.
4. Location tracking through mobile devices, security cameras, and other means.

### Fair Information Practices (FIP)

The FIP efforts in organizations followed five tenets:

1. Openness
2. Disclosure
3. Secondary usage limits
4. Correctability
5. Security

### Redefining Privacy

The notion of "privacy" needs to be redefined in the digital age, where personal data is widely collected and shared.

### Security

### Data Breaches

- Data breaches involving theft or exposure of valuable data, identity information, and customer details are becoming commonplace (e.g., Yahoo, Home Depot, Facebook, Uber, Equifax).

### Risks and Costs

- Privacy and security breaches can result in significant costs, including lost revenue, customer attrition, fines, and lawsuits. Investing in security technologies and policies is crucial to mitigate these risks.

### Internet of Things (IoT) Security

- Novel security threats include attacks on IoT devices and data, including connected cars and other smart devices.

### Ethics

### Ethical Use of Data

Ethical use of data involves multiple aspects, such as:

1. Potential for biased or unethical behavior in AI systems (e.g., autonomous drones, robot soldiers).
2. Fairness issues, such as bias in face recognition systems.
3. Deepfakes and information warfare (fake videos, audio, images, and text).
4. Interpretability and transparency of machine learning models.

### Data Governance

Data governance is the exercise of authority and control over the management of data assets. It involves planning, monitoring, and enforcing policies, procedures, rules, and guidelines for data collection, storage, and usage.

### Master Data Management (MDM)

MDM is the management of "master data," providing a single point of reference for critical, shared data within an organization. It ensures data consistency, accuracy, and completeness.

### Data Provenance

Data provenance documents the inputs, entities, systems, and processes that influence data, providing a historical record of its origins and lineage. Provenance helps establish trust in data and is crucial for scientific research.

### Data Curation

Data curation involves actively managing data throughout its lifecycle to maintain quality, add value, and enable reuse over time. It includes processes and technologies for organizing, preserving, and facilitating access to data.

### Compliance

Compliance refers to adhering to laws, regulations, and policies related to data handling and privacy. It involves understanding the differences between laws, regulations, and policies, and ensuring that organizations comply with relevant requirements.

### Trust

Trust in organizations handling personal data is proportional to transparency, value delivery, and acceptance of consequences. Individuals need assurance that their data is being used responsibly by businesses, governments, and non-profit organizations.

## Generative AI

- Generative AI runs neural networks backwards, generating new data instead of classifying existing data.

### Generative Adversarial Networks (GANs)

- Two neural networks (generator and discriminator) are paired in opposing order, with the generator creating new data and the discriminator evaluating its authenticity.

### Style Transfer

- One of the early uses of GenAI was to add artistic styles to images.

### Autoencoders and Variational Autoencoders (VAEs)

- Autoencoders consist of an encoder that maps input to a latent space and a decoder that reconstructs the input from the latent representation.
- VAEs produce a distribution in the latent space instead of a single point, allowing for the generation of new data by sampling from the distribution.

### Transformers

- Transformers, initially introduced for machine translation, can be adapted to various domains, including vision (ViT), time-series prediction, and music generation.
- The self-attention mechanism in Transformers addresses the quadratic bottleneck of attention computation, enabling better handling of context.

### Retrieval-Augmented Generation (RAG)

- RAG models augment language models with external memory (knowledge bases, databases, or text) to enhance their ability to understand and generate relevant content.

### Fine-tuning and Representation Fine-Tuning (ReFT)

- Fine-tuning is a way to adapt a pre-trained language model to a specialized domain by further training on domain-specific data.
- ReFT is a new family of fine-tuning techniques that modify the relevant hidden representations of the language model for the target task, providing a more efficient alternative to traditional fine-tuning methods.

### Directions and Challenges

- New directions in GenAI include multimodal models, "embodied" language models, sparse and modular architectures, and specialized hardware.
- Challenges and issues include context mismatch, input chunking, hallucinations, and the need for computational resources to scale these models.

### The Centrality of Data

- Data is the driving force behind all these advancements and applications, emphasizing the importance of data organization, governance, curation, and responsible usage.
- Continuous learning and exploration of new data-driven technologies and techniques are essential for staying up-to-date and contributing to the field.
