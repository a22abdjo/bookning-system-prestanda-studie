Bokningssystem – Prestandajämförelse mellan MySQL och MongoDB

Detta projekt utvecklades som en del av ett examensarbete inom Webbutveckling och programmering
(Informationsteknologi med inriktning mot webbprogrammering).

Syftet med projektet är att jämföra prestanda mellan två databashanterare:
MySQL (relationsdatabas) och MongoDB (dokumentbaserad databas), med fokus på användarupplevd responstid för vanliga operationer i en webbapplikation.

⸻

Funktioner

* Skapa bokningar
* Söka bokningar
* Hämta bokningshistorik
* Separata paneler för MySQL och MongoDB
* Automatiserad prestandatestning
* Export av testresultat till CSV

⸻

Teknik

* Backend: Node.js, Express
* Frontend: HTML, CSS, JavaScript
* Databaser: MySQL, MongoDB
* Verktyg: MySQL Workbench, MongoDB Compass
* Testning: Automatiserade tester och webbläsarbaserad testning

⸻

Prestandatestning

Systemet mäter responstid för tre centrala operationer:

* Bokning (INSERT / insertOne)
* Sökning (LIKE / regex)
* Historik (SELECT / find + sortering)

Testerna genomfördes med tre olika datamängder:

* 500 bokningar
* 1500 bokningar
* 3000 bokningar

För varje datamängd genomfördes:

* 1000 användarsessioner
* Sekventiella förfrågningar (inga samtidiga användare)

Responstiden mättes från att en begäran skickades från klienten tills svaret mottogs och renderades i användargränssnittet.

Resultaten exporterades till CSV och analyserades statistiskt med hjälp av diagram, konfidensintervall och ANOVA.

⸻

Resultat

Studien visade att:

* MongoDB presterade bättre vid bokningsoperationer (skrivoperationer)
* MySQL presterade bättre vid sökning och visning av bokningshistorik
* Skillnaderna mellan databashanterarna varierade beroende på operationstyp
* Databasval bör baseras på applikationens arbetsbelastning och användningsområde

⸻

Metod

* Kontrollerad lokal testmiljö
* Identisk frontend och API-struktur för båda databashanterarna
* Samma datamodell och funktionalitet i båda implementationerna
* Automatiserade tester för reproducerbara resultat
* Responstid mätt med performance.now()
* Statistisk analys genomförd med ANOVA och 95 % konfidensintervall

⸻

Booking System Performance Study (MySQL vs MongoDB)

This project was developed as part of a Bachelor’s Thesis in Web Development and Programming
(Information Technology with a specialization in Web Programming).

The purpose of this project is to compare the performance of two database management systems:
MySQL (relational database) and MongoDB (document-oriented database), focusing on user-perceived response time for common operations in a web application.

⸻

Features

* Create bookings
* Search bookings
* View booking history
* Separate panels for MySQL and MongoDB
* Automated performance testing
* CSV export of test results

⸻

Technologies Used

* Backend: Node.js, Express
* Frontend: HTML, CSS, JavaScript
* Databases: MySQL, MongoDB
* Tools: MySQL Workbench, MongoDB Compass
* Testing: Automated scripts and browser-based testing

⸻

Performance Testing

The system measures response time for three key operations:

* Booking (INSERT / insertOne)
* Search (LIKE / regex)
* History (SELECT / find + sorting)

Tests were conducted using three dataset sizes:

* 500 bookings
* 1500 bookings
* 3000 bookings

For each dataset size:

* 1000 user sessions were executed
* Requests were performed sequentially (no concurrent users)

Response time was measured from the moment a request was sent from the client until the response was received and rendered in the user interface.

Results were exported to CSV and analyzed using charts, confidence intervals, and ANOVA.

⸻

Key Findings

* MongoDB performed better for booking operations (write operations)
* MySQL performed better for search and booking history operations
* Performance depended on the type of operation being performed
* Database selection should be based on workload characteristics and application requirements

⸻

Methodology

* Controlled local test environment
* Identical frontend and API structure for both database implementations
* Same functionality and data model across both systems
* Automated testing for consistency and reproducibility
* Response time measured using performance.now()
* Statistical analysis performed using ANOVA and 95% confidence intervals

---

## 📂 Project Structure
