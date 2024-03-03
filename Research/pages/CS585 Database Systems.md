---
lang: 'en'
slug: '/DB130F'
---

## Data

- raw facts (not yet been processed)
- building blocks of information
- managed through data management

## Information

- produced by processing data
- creates knowledge
- accurate, relevant, and timely to facilitate sound decision-making

## DB

- shared and integrated computer structure that stores a collection of end-user data
- includes metadata, which describes the data characteristics and relationships
- integrated and managed with the end-user data

## DBMS

- DB management system
- collection of programs that manage the DB structure and control access to its stored data
- an intermediary between users and the DB
- enables data sharing
- presents an integrated view of the data to users
- receives app requests and translates them into operations
- goods. hides the DB's internal complexity from apps and users. better data integration and less data inconsistency. increased end-user productivity. improved data sharing, security, and access. improved decision-making. enhanced data quality by promoting accuracy, validity, and timeliness of data
- bads. increased costs. management complexity. maintaining currency. vendor dependence. upgrade/replacement cycles

## Types of DBs

- single-user DB supports one user at a time
- desktop DB runs on a PC
- multiuser DB supports multiple users simultaneously
- workgroup DB supports a small group of users or a specific department
- enterprise DB supports numerous users across various departments
- centralized DB has data at a single site
- distributed DB is distributed across different sites
- cloud DB is maintained using cloud data services that provide defined performance measures for the DB
- general-purpose DBs contain a wide variety of data used in multiple disciplines
- discipline-specific DBs contain data focused on specific subject areas
- operational DB is designed to support a company's day-to-day operations
- analytical DB stores historical data and business metrics used exclusively for tactical or strategic decision-making
- data warehouse stores data in a format optimized for decision support
- online analytical processing (OLAP) enables retrieving, processing, and modeling data from the data warehouse
- business intelligence captures and processes business data to generate information that supports decision-making

## Structural and Data Dependence

- data dependence means data access changes when data storage characteristics change
- data independence means data storage characteristics are changed without affecting the program's ability to access the data
- practical significance of data dependence is the difference between logical and physical format

## Data Redundancy

- storing the same things again
- island of Information means ` information scattered in different locations
- Poor Data Security
- Data Inconsistency
- Likely to have entry errors for complex entries
- -Data anomaly

## Data Anomaly

- when changes are made partially across redundant data
- Update Anomalies
- Insertion Anomalies
- Deletion Anomalies

## DBMS Functions

- manages data dictionary (stores definitions of the data elements and their relationship)
- manages data storage
- performance tuning ensures efficient performance of the DB with storage and access speed
- transforms and presents data to required data structures
- manages security
- multiuser access control
- backup and recovery management
- data integrity management (redundancy↓ and consistency↑)
- DB access languages and APIs
- DB communication interfaces (accepts end-user requests via multiple, different networks)
- query language lets the user specify what must be done without having to specify how
- structured query language (SQL) is the de facto query language and data access standard supported by the majority of DBMS vendors

## Data Modeling

- interactive and progressive process of creating a specific data model for a problem domain
- data models are simple representations of complex real-world data structures
- models are abstractions of real-world objects
- data models
- are communication tools
- gives an overall view of a DB
- organizes data
- abstracts for the creation of good DB

## Data Model Basic Building Blocks

- entity is a unique and distinct object used to collect and store data. the entity has attributes (characteristics)
- constraints are a set of rules to ensure data integrity
- relationships describe associations among entities
- one to many (1:M)
- many to many (M:N or M:M)
- one to one (1:1)

## Naming Conventions

- entity names are required to be descriptive of the objects in the business environment (use terminology that is familiar to the users)
- attribute name is required to be descriptive of the data represented by the attribute
- proper naming facilitates communication between parties and promotes self-documentation

## Hierarchical Modeling

- hierarchies are good for 1:M (tree) but not M:N (graph or multiple inheritance)
- manage large amounts of data for complex manufacturing projects
- represented by an upside-down tree that contains segments (the equivalent of a file system's record type)
- goods. promotes data sharing. parent/child relationship promotes conceptual simplicity and data integrity. DB security is provided and enforced by DBMS. efficient with 1:M relationships
- bads. requires knowledge of physical data storage characteristics. the navigational system requires knowledge of the hierarchical path. changes in structure require changes in all apps. implementation limitations No data definition. lack of standards

## Network Modeling

- captures M:N, looks like bipartite graphs
- depicts both 1:M and M:N relationships
- represent complex data relationships
- improve DB performance and impose a DB standard
- goods. conceptual simplicity. handles more relationship types. flexible data access. data owner/member relationship promotes data integrity. conforms to standards. includes data definition language and data manipulation language
- bads. system complexity limits the efficiency. navigational system yields complex implementation, app dev, and management. structural changes require changes in all apps

## Standard DB Concepts

- schema is a conceptual organization of the entire DB as viewed by the DB administrator
- subschema is a portion of the DB seen by the apps that produce the desired information from the data within the DB

## Data Definition Language

enables the DB administrator to define the schema components

## Data Manipulation Language

environment in which data can be managed and used to work with the data in the DB

## Relational Model

- based on a relation or table (matrix composed of intersecting tuples and attributes)
- tuple: = rows
- attribute = columns
- describes a precise set of data manipulation constructs
- goods. structural independence is promoted using independent tables. the tabular view improves conceptual simplicity. ad-hoc query capability is based on SQL. isolates the end user from physical-level details. improves implementation and management simplicity

## RDBMS

- performs basic functions provided by the hierarchical and network DBMS systems
- makes the relational data model easier to understand and implement
- hides the complexities of the relational model from the user

## SQL-Based Relational DB Application

- end-user interface allows the end user to interact with the data
- collection of tables stored in the DB
- each table is independent of another
- rows in different tables are related based on common values in common attributes
- SQL engine executes all queries

## Entity Relationship Model

- graphical representation of entities and their relationships in a DB structure
- entity relationship diagram uses graphic representations to model DB components
- entity instance or entity occurrence are rows in the relational table
- connectivity is a term used to label the relationship types
- goods. conceptual simplicity. effective communication tool. integrated with the dominant relational model
- bads. limited constraint representation. limited relationship representation. no data manipulation language. loss of information content occurs when attributes are removed from entities to avoid crowded displays

## External Model

- end users' view of the data environment
- er diagrams are used to represent the external views
- external schema specifies the representation of an external view

## Conceptual Model

- Represents a global view of the entire DB by the whole organization
- conceptual schema is the basis for the identification and high-level description of the primary data objects
- has a macro-level view of the data environment
- is software and hardware independent
- logical design has the task of creating a conceptual data model

## Internal Model

- representing DB as seen by the DBMS mapping conceptual model to the DBMS
- uses internal schema, a specific representation of an internal model
- is software-dependent, but hardware-independent
- has logical independence (changing the internal model without affecting the conceptual model)

## Physical Model

- operates at the lowest level of abstraction
- describes the way data are saved on storage media such as disks or tapes
- requires the definition of physical storage and data access methods
- relational model aimed at the logical level
- does do not require physical-level details
- has physical independence (changes in the physical model do not affect the internal model)

## Attributes

- characteristics of entities
- required attribute must have a value
- optional attribute does not require a value
- domains mean sets of possible values for a given attribute
- identifiers (keys) are one or more attributes that uniquely identify each entity instance
- composite identifiers are primary keys composed of more than one attribute
- compound attributes are attributes that can be subdivided to yield additional attributes
- simple attributes are attributes that cannot be subdivided
- single-valued attributes are attributes those has only a single value
- multivalued attributes are attributes that have many values and require creating
- several new attributes, one for each component of the original multivalued attribute
- a new entity composed of the original multivalued attribute's components
- derived attributes are those whose value is calculated from other attributes

## Relationships

- are associations between entities that always operate in both directions
- participants mean entities that participate in a relationship
- connectivity describes the relationship classification
- cardinality expresses the minimum and maximum number of entity occurrences associated with one occurrence of related entity

## Connectivity and Cardinality

- connectivity describes the types of relationships between entities in an ER model (1:1) (1:N) (M:N)
- cardinality defines the numerical aspects of the relationship between entities by specifying the minimum and maximum number of entity instances that can participate in a relationship (min, max) for (1:1), (1:M), or (M:N)
- sometimes min is called modality
- Confusingly, the # rows in a table is ALSO called the table's cardinality (and the # of columns is called the table's degree).
- Also confusingly, (1:1), (1:M), (M:N) are called cardinality ratios

## Existence Dependence

- weak (non-identifying) entity exists in the DB only when it is associated with another related entity occurrence
- the primary key of the related entity does not contain a primary key component of the parent entity
- strong (regular, identifying) entity exists apart from all of its associated entities
- the primary key of the related entity contains a primary key component of the parent entity
- How do you tell if one is strong or weak?
- if any of the PK is FK, then it is existence-dependent
- thus weak

## Weak Entity Conditions

- existence-dependent
- has a primary key that is partially or totally derived from the parent entity in the relationship

## Relationship Participation

- Optional participation
- one entity occurrence does not require a corresponding entity occurrence in a particular relationship
- mandatory participation
- one entity occurrence requires a corresponding entity occurrence in a specific relationship

## Relationship Degree

- indicates the number of entities or participants associated with a relationship
- unary relationship means the association is maintained within a single entity
- recursive relationship means a relationship exists between occurrences of the same entity set
- binary relationship means two entities are associated
- ternary relationship means three entities are associated

## Associative Entities

- Also known as a composite or bridge entities
- used to represent an M:N relationship between two or more entities
- is in a 1:M relationship with the parent entities
- composed of the primary key attributes of each parent entity
- may also contain additional attributes that play no role in the connective process

## Developing an ER Diagram

- create a detailed narrative of the organization's description of operations
- identify business rules based on the descriptions
- identify main entities and relationships from the business rules
- develop the initial ERD
- identify the attributes and primary keys that adequately describe entities
- revise and review ERD

## Extended Entity Relationship Model (EERM)

- entity supertypes are generic entity types related to one or more entity subtypes
- contains common characteristics
- entity subtype contains unique characteristics of entity subtypes

## Specialization Hierarchy

- depicts an arrangement of higher-level entity supertypes and lower-level entity subtypes
- relationships are described in terms of "is-a" relationships
- subtype exists within the context of a supertype
- every subtype has one supertype to which it is directly related
- supertype can have many subtypes

## Inheritance

- enables an entity subtype to inherit attributes and relationships of the supertype
- all entity subtypes inherit their primary key attribute from their supertype
- at the implementation level, the supertype and its subtype(s) maintain a 1:1 relationship
- entity subtypes inherit all relationships in which the supertype entity participates
- lower-level subtypes inherit all attributes and relationships from their upper-level supertypes

## Subtype Discriminator

- attribute in the supertype entity that determines to which entity subtype the supertype occurrence is related
- default comparison condition is the equality comparison

## Disjoint and Overlapping Subtypes

- disjoint subtypes contain a unique subset of the supertype entity set (nonoverlapping subtypes)
- implementation is based on the value of the subtype discriminator attribute in the supertype
- overlapping subtypes contain nonunique subsets of the supertype entity set
- implementation requires the use of one discriminator attribute for each subtype

## Completeness Constraint

- specifies whether each supertype occurrence must also be a member of at least one subtype
- partial completeness means not every supertype occurrence is a member of a subtype
- total completeness means every supertype occurrence must be a member of any

## Determination

- state in which knowing the value of one attribute makes it possible to determine the value of another
- is the basis for establishing the role of a key
- based on the relationships among the attributes

## Dependencies

- functional dependence value of one or more attributes determines the value of one or more other attributes
- determinant is an attribute whose value determines another
- dependent is an attribute whose value is determined by the other attribute
- Full functional dependence means an entire collection of attributes in the determinant is necessary for the relationship

## Type of Keys

- composite keys are composed of more than one attribute
- key attributes are a part of a key
- entity integrity are conditions where each row in the table has its own unique identity
- all of the values in the primary key must be unique
- no key attribute in the primary key can contain a null
- a table must have entity integrity
- null means an absence of any data value
- unknown, or missing, or inapplicable
- referential integrity means every reference to an entity instance by another entity instance is valid
- superkey is an attribute or combination of attributes that uniquely identifies each row in the table
- candidate key is a minimal (irreducible) superkey; a superkey that does not contain a subset of attributes that is itself a superkey
- primary key is a candidate key selected to identify all other attribute values in any given row uniquely; it cannot contain null entries
- foreign key is an attribute or combination of attributes in one table whose values must either match the primary key in another table or be null
- secondary key is an attribute or combination of attributes used strictly for data retrieval purposes
- natural keys are keys that are created from real-world entities (e.g., for a US resident, their SSN could be a natural key)
- surrogate keys (make a brand new unique keys)
- secondary, or 'alternate' keys

## NULL

- NOT NULL means placed on a column to ensure that every row in the table has a value for that column
- UNIQUE means restriction placed on a column to ensure that no duplicate values exist for that column

## Relational Algebra

- theoretical way of manipulating table contents using relational operators
- relvar is a variable that holds a relation
- heading contains the names of the attributes, and the body includes the relation
- relational operators have the property of closure
- closure is a use of relational algebra operators on existing relations to produce new relations
- select is a unary operator that yields a horizontal subset of a table
- project is a unary opera that yields a vertical subset of a table
- union combines all rows from two tables, excluding duplicate rows
- union-compatible means tables share the same number of columns, and their corresponding columns share compatible domains
- intersect yields only the rows that appear in both tables
- tables must be union-compatible to yield valid results
- difference yields all rows in one table that are not found in the other table
- tables must be union-compatible to yield valid results
- product yields all possible pairs of rows from two tables
- divide uses one 2-column table as the dividend and one single-column table as the divisor, outputs a single column that contains all values from the second column of the div
- join allows information to be intelligently combined from two or more tables
- natural join links tables by selecting only the rows with shared values in their common attributes
- equijoin: Links tables based on an equality condition that compares specified columns of each table
- theta join is an extension of natural join, denoted by adding a theta subscript after the JOIN symbol
- inner join only returns matched records from the tables that are being joined
- outer join has matched pairs retained, and unmatched values in the other table are left null
- left outer join yields all of the rows in the first table, including those that do not have a matching value in the second table
- right outer join yields all of the rows in the second table, including those that do not have matching values in the first table

## Data Dictionary and the System Catalog

- data dictionary describes all tables in the DB created by the user and designer
- system catalog: system data dictionary that describes all objects within the DB
- avoid homonyms and synonyms
- homonym: the same name is used to label different attributes
- synonym: different names are used to describe the same attribute

## Normalization Process

- ensures that all tables are in at least 3NF
- higher forms are not likely to be encountered in a business environment
- works one relation at a time
- starts by:
- identifying the dependencies of a relation (table)
- progressively breaking the relationship into a new set of relations

## Types of Functional Dependencies

- Partial dependency: Functional dependence in which the determinant is only part of the primary key
- Assumption - One candidate key
- Straight forward
- Easy to identify
- Transitive dependency: An attribute functionally depends on another non-key attribute

## 0NF → 1NF: eliminate repeating groups

- Repeating group: A group of multiple entries of the same type can exist for any single key attribute occurrence
- Existence proves the presence of data redundancies
- Enable reducing data redundancies
- Steps
- Eliminate the repeating groups
- Identify the primary key
- Identify all dependencies
- Create a dependency diagram showing relationships (dependencies) between the attributes - this will help us systematically normalize the table.

## 1NF Result

- All key attributes are defined
- There are no repeating groups in the table
- All attributes are dependent on the primary key
- All relational tables satisfy 1NF requirements
- Some tables contain partial dependencies
- Subject to data redundancies and various anomalies

## 1NF → 2NF: remove partial dependencies

- remove not-so-relevant things = remove things that depend on PK
- make new tables to eliminate partial dependencies = reassign corresponding dependent attributes
- the table is in 2NF when it:
- is in 1NF
- includes no partial dependencies

## 2NF → 3NF: remove transitive dependencies

- remove really, really not-so-relevant things = remove things that depend on regular columns
- We promote the non-prime keys masquerading as PKs into actual PKs (give them their tables).
- Whether we eliminate partial dependencies (to create 2NF) or transitive ones (to create 3NF), we follow the same process: create a new relation for each problem dependency!
- The table is in 3NF when it:
- is in 2NF
- contains no transitive dependencies

## Normalization: summary

- We do this because if we don't,
- data updates are less efficient because tables are larger
- indexing is more cumbersome
- no simple strategies for creating virtual tables known as views
- 1NF: eliminate repeating groups (partial:y, transitive:y)
- 2NF: eliminate redundant data (partial:n, transitive:y)
- 3NF: eliminate fields not dependent on key fields (partial:n, transitive:n)

## Common SQL Data Types

- Numeric (NUMBER(L,D) or NUMERIC(L,D))
- Character (CHAR(L), VARCHAR(L) or VARCHAR2(L))
- Date (DATE)

## Primary Key and Foreign Key

- Primary key attributes contain both a NOT NULL and a UNIQUE specification
- RDBMS will automatically enforce referential integrity for foreign keys
- Command sequences end with semicolons
- ANSI SQL allows the use of the following clauses to cover CASCADE, SET NULL, or SET DEFAULT
- ON DELETE and ON UPDATE

## SQL Constraints

- NOT NULL: column does not accept nulls
- UNIQUE: all values in columns are unique
- DEFAULT: Assigns value to attribute when a new row is added to the table
- CHECK: Validates data when the attribute value is entered

## Data Manipulation Commands

- INSERT: Command to insert data into the table
- Syntax - INSERT INTO tablename VALUES();
- Used to add table rows with NULL and NOT NULL attributes
- COMMIT: Command to save changes
- Syntax - COMMIT [WORK];
- Ensures DB update integrity
- SELECT: Command to list the contents
- Syntax - SELECT columnlist FROM tablename;
- Wildcard character(\*)
- UPDATE: Command to modify data
- Syntax - UPDATE tablename SET columnname = expression [, columnname = expression] [WHERE conditionlist];
- WHERE condition
- Specifies the rows to be selected
- ROLLBACK: Command to restore the DB
- Syntax - ROLLBACK;
- Undoes the changes since the last COMMIT
- DELETE: Command to delete
- Syntax - DELETE FROM tablename
- [WHERE conditionlist];
- BETWEEN
- Checks whether the attribute value is within a range
- IS NULL
- Checks whether the attribute value is null
- LIKE
- Checks whether attribute value matches given string pattern
- IN
- Checks whether the attribute value matches any value within a value list
- EXISTS
- Checks if the subquery returns any rows
- ALTER TABLE (Used to add/remove table constraints)
- ADD - Adds a column
- MODIFY - Changes column characteristics
- DROP - Deletes a column
- DROP TABLE: Deletes table from DB
- ORDER BY clause is useful when listing order is important
- SELECT columnlist FROM tablelist
- [WHERE conditionlist]
- [ORDER BY columnlist [ASC | DESC]];
- DISTINCT clause: Produces a list of unique values
- MAX, MIN, SUM, AVG
- Arithmetic operators perform in the order of:
- Operations within parentheses
- Power operations
- Multiplications and divisions
- Additions and subtractions
- VIEWs are virtual tables

## INNER JOIN and OUTER JOIN

- INNER JOIN is
- OUTER JOIN is
- RIGHT OUTER JOIN brings in the right DB's elements

## Relational Set Operators

- SQL data manipulation commands are set-oriented
- set-oriented: Operate over entire sets of rows and columns at once
- UNION, INTERSECT, and Except (MINUS) work properly when relations are union-compatible
- Union-compatible: The number of attributes is the same, and their corresponding data types are alike
- UNION
- Combines rows from two or more queries without including duplicate rows

## Persistent Stored Module

- block of code containing standard SQL statements and procedural extensions that are stored and executed at the DBMS server

## Triggers

- Procedural SQL code is automatically invoked by RDBMS when a given data manipulation event occurs.

## Stored Procedures

- Named collection of procedural and SQL statements = Advantages
- Reduce network traffic and increase performance
- Reduce code duplication using code isolation and code sharing

## Stored Function

- Named group of procedural and SQL statements that returns a value
- As indicated by a RETURN statement in its program code
- Can be invoked only from within stored procedures or triggers

## Transaction

- A logical unit of work that must be entirely completed or aborted

## ACID(S)

- Atomicity: All operations of a transaction must be completed. If not, the transaction is aborted.
- Consistency: The permanence of the DB's consistent state
- Isolation: Data used during a transaction cannot be used by the second transaction until the first is completed
- Durability: Ensures that once transactions are committed, they cannot be undone or lost
- Serializability: Ensures that the schedule for the concurrent execution of several transactions should yield consistent results

## Concurrency Control

- Coordination of the execution of the simultaneous transaction in a multiuser DB system
- Ensures serializability of transactions in a multiuser DB environment
- Lost updates occur in two concurrent transactions when the same data element is updated, but one of the updates is lost
- Uncommitted data occurs when two transactions are executed concurrently. The first transaction is rolled back after the second transaction has already accessed uncommitted data
- Inconsistent retrievals happen when a transaction accesses data before and after one or more other transactions finish working with such data

## Scheduler

- establishes the order in which the operations are executed within concurrent transactions
- interleaves the execution of DB operations to ensure serializability and isolation of transactions
- bases on concurrent control algorithms to determine the appropriate order
- creates serialization schedule
- serializable schedule: interleaved execution of transactions yields the same results as the serial execution of the transactions
- Lock guarantees exclusive use of a data item to a current transaction
- pessimistic locking use of locks based on the assumption that conflict between transactions is likely
- lock manager is responsible for assigning and policing the locks used by the transactions

## Lock Granularity

- DB-level lock
- Table-level lock
- Page-level lock
- Page or diskpage: Directly addressable section of a disk
- Row-level lock
- Field-level lock

## Lock Types

- Binary Lock has two states: locked (1) and unlocked(0)
- Exclusive Lock exists when access is reserved for the transaction that locked the object
- A Shared Lock exists when concurrent transactions are granted read access based on a common lock

## Three Lock States

- Using the shared/exclusive concept, there are THREE lock states
- unlocked
- shared (read) issued when a transaction wants to READ data, and no exclusive lock is held (on a data item)
- exclusive (write) issued when a transaction seeks to WRITE data, and no lock is held (on a data item)

## Two-Phase Locking (2PL)

- Defines how transactions acquire and relinquish locks
- Guarantees serializability but does not prevent deadlocks
- Phases
- Growing phase - Transaction acquires all required locks without unlocking any data
- Shrinking phase - Transaction releases all locks and cannot obtain any new locks.
- Two transactions cannot have conflicting locks
- No unlock operation can precede a lock operation in the same transaction
- No data are affected until all locks are obtained

## Deadlocks (Deadly Embrace)

- Occurs when two transactions wait indefinitely for each other to unlock data
- Deadlock prevention. A transaction requesting a new lock is aborted when there is the possibility that a deadlock can occur. If the transaction is aborted, all changes made by this transaction are rolled back, and all locks obtained by the transaction are released. The transaction is then rescheduled for execution. Deadlock prevention works because it avoids the conditions that lead to deadlocking.
- Deadlock detection. The DBMS periodically tests the DB for deadlocks. If a deadlock is found, the "victim" transaction is aborted (rolled back and restarted), and the other transaction continues.
- Deadlock avoidance. The transaction must obtain all of the locks it needs before it can be executed. This technique avoids the rolling back of conflicting transactions by requiring that locks be obtained in succession. However, the serial lock assignment required in deadlock avoidance increases action response times.

## Time Stamping

- Assigns global, unique time stamp to each transaction
- Produces explicit order in which transactions are submitted to DBMS
- Uniqueness: Ensures no equal time stamp values exist
- Monotonicity: Ensures time stamp values always increase

## Phases of Optimistic Approach

- Read
- Transaction:
- Reads the DB
- Executes the needed computations
- Makes the updates to a private copy of the DB values
- Validation
- The transaction is validated to ensure that the changes made will not affect the integrity and consistency of the DB.
- Write
- Changes are permanently applied to the DB.

## DDBMS

- Distributed DB management system (DDBMS): Governs storage and processing of logically related data over interconnected computer systems
- goods. Data are located near the greatest demand site. Faster data access and processing. Growth facilitation. Improved communications. Reduced operating costs. User-friendly interface. Less danger of a single-point failure. Processor independence
- bads. Complexity of management and control. Technological difficulty. Security. Lack of standards. Increased storage and infrastructure requirements. Increased training cost. Costs incurred due to the requirement of duplicated infra. Remote access is provided on a read-only basis. Restrictions on the number of remote tables accessed in a single transaction. Restrictions on the number of distinct DBs that may be accessed. Restrictions on the DB model that may be accessed. Concurrency control is important in a distributed DB environment

## DDBMS Components

- Computer workstations or remote devices
- Network hardware and software components
- Communications media
- Transaction processor (TP): Software component of a system that requests data
- Known as transaction manager (ITM) or application processor (AP)
- Data processor (DP) or data manager (DM)
- Software component on a system that stores and retrieves data from its location

## Data & Processing Distribution: 3 variations

- Single-Site Processing, Single-Site Data
- Processing is done on a single host computer
- Data stored on the host computer's local disk
- Processing is restricted on the end user's side
- Dumb terminals access DBMS
- Multiple-Site Processing, Single-Site Data
- Multiple processes run on different computers, sharing a single data repository.
- Require network file server running conventional applications
- Accessed through LAN
- Client/server architecture (Reduces network traffic, Processing is distributed, Supports data at multiple sites.
- Multiple-Site Processing, Multiple-Site Data
- Fully distributed DB management system
- Support multiple data processors and transaction processors at various sites.
- Classification of DDBMS depending on the level of support for various types of DBs
- Homogeneous: Integrate multiple instances of the same DBMS over a network
- Heterogeneous: Integrate different types of DBMSs
- Fully heterogeneous: Support different DBMSs, each supporting a different data model

## Two-Phase Commit Protocol (2PC)

- Phase 1 - Prepare Phase (Voting Phase):
- The coordinator (a designated process or system managing the transaction) sends a prepare message to all participants asking them if they can commit the transaction.
- Each participant executes the transaction up to the point where it will commit and lock the transaction resources to ensure data integrity. Still, it does not make the changes permanent yet.
- Participants respond with a vote: "Yes" if they can commit (indicating they have successfully prepared and locked the resources without any issues) or "No" if they cannot (due to a failure or conflict).
- Phase 2 - Commit Phase (Decision Phase):
- If all participants vote "Yes": The coordinator sends a commit message to all participants. Each participant makes the transaction permanent (commits the changes) and releases any locked resources. Participants send an acknowledgment to the coordinator after committing.
- If any participant votes "No": The coordinator sends an abort message to all participants. Each participant undoes any changes if necessary (rolls back the transaction) and releases any locked resources. Participants send an acknowledgment to the coordinator after aborting.

## Distribution Transparency

- Fragmentation transparency: The end user does not know the data is fragmented.
- Location transparency: The end user does not know where fragments are located.
- Location mapping transparency: The end user does not know how fragments are mapped.

## Transaction Transparency

- Ensures DB transactions will maintain the distributed DB's integrity and consistency
- Ensures transaction is completed only when all DB sites involved complete their part
- Distributed DB systems require complex mechanisms to manage transactions

## Performance and Failure Transparency

- Performance transparency: Allows a DDBMS to perform as if it were a centralized DB
- Failure transparency: Ensures the system will operate in case of network failure
- Replica transparency: DDBMS's ability to hide multiple copies of data from the user

## Distributed DB Design

- Data fragmentation: How to partition the DB into fragments
- Breaks a single object into many segments
- Information is stored in a distributed data catalog (DDC)
- Horizontal fragmentation: Division of a relation into subsets (fragments) of tuples (rows)
- Vertical fragmentation: Division of a relation into attribute (column) subsets
- Mixed fragmentation: Combination of horizontal and vertical strategies
- Data replication: Which fragments to replicate
- Data copies stored at multiple sites served by a computer network
- Mutual consistency rule: Replicated data fragments should be identical
- Helps restore lost data
- Data allocation: Where to locate those fragments and replicas
- Centralized data allocation (Entire DB stored at one site)
- Partitioned data allocation (DB is divided into two or more disjoined fragments and stored at two or more sites)
- Replicated data allocation (Copies of one or more DB fragments are stored at several sites)

## CAP Theorem

- Consistency: always correct data.
- Availability: requests are always filled.
- Partition ("outage") tolerance: continue to operate even if (some/most) nodes fail.
- In today's "BASE" (Basically Available, Soft_state, Eventually Consistent) model of non-relational (e.g., NoSQL) DBs, we prefer to sacrifice consistency in favor of availability. Data changes are not immediate but propagate slowly through the system until all replicas are consistent.
