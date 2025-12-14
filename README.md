# SpendGuard  
### A Secure, Automated Money Management System

## Project Overview  
I designed and developed **SpendGuard**, a secure and scalable money management system that automatically tracks, categorizes, and analyzes user expenses across multiple digital payment platforms. The objective of this project was to provide users with **real-time financial visibility**, **intelligent spending insights**, and **strong data privacy** using modern system design principles.

---

## 1️⃣ System Architecture & Design  
I implemented SpendGuard using a **microservices-based architecture** to ensure scalability, modularity, and fault tolerance. Each service is independently deployable and communicates through an event-driven architecture.

### Core Microservices
- **Transaction Service** – Collects transaction data from platforms such as GPay, Paytm, and BHIM.
- **Categorization Service** – Automatically classifies expenses into categories like food, transport, shopping, etc.
- **Analytics Service** – Generates spending insights, trends, and summaries.
- **Alert & Notification Service** – Sends real-time alerts for budget limits and unusual transactions.
- **User Service** – Manages user authentication, authorization, and account data.
- **Security & Encryption Service** – Ensures confidentiality and integrity of financial data.
- **Event Processing (Apache Kafka)** – Handles real-time transaction updates using event streaming.

---

## 2️⃣ Technology Stack  

| Component | Technology |
|--------|-----------|
| Backend (Microservices) | Node.js (NestJS) / Python (FastAPI, Django) |
| Frontend (Web & Mobile) | React / Flutter |
| Databases | PostgreSQL + MongoDB |
| Messaging | Apache Kafka |
| API Layer | GraphQL (Apollo) / REST |
| Security | OAuth 2.0, JWT, AES-256 Encryption |
| Deployment | Docker & Kubernetes |

---

## 3️⃣ System Workflow  

### 🔗 Step 1: Transaction Data Collection  
I implemented two mechanisms for collecting transaction data:

- **API Integration (Preferred):**  
  Securely fetches transaction data using OAuth-based authentication when official APIs are available.

- **SMS Parsing (Fallback):**  
  Extracts transaction details from SMS notifications using parsing logic and ML-based text extraction techniques when APIs are unavailable.

---

### 🏷 Step 2: Expense Categorization  
I designed a multi-layered expense categorization strategy to maximize accuracy.

#### 1. Rule-Based Merchant Categorization  
Known merchants are mapped to predefined categories.

Examples:  
- Swiggy / Zomato → Food & Dining  
- Uber / Ola → Transport  
- Amazon / Flipkart → Shopping  

#### 2. NLP-Based Categorization  
For transactions without clear merchant identifiers, I applied **NLP-based keyword analysis** on transaction descriptions.

Example:  
`"Paid ₹500 to Swiggy via GPay"` → Food & Dining

#### 3. Machine Learning-Based Classification  
The system supports supervised ML models trained on historical transaction data using features such as:
- Transaction amount  
- Merchant name  
- Payment mode  
- Transaction description  

#### 4. User-Assisted Learning  
When categorization confidence is low, the system prompts the user for input and learns from their response to improve future predictions.

---

## 4️⃣ Analytics & Insights  
The Analytics Service processes transaction data to provide:
- Daily, weekly, and monthly spending trends
- Category-wise expense analysis
- Budget utilization and overspending insights  

GraphQL APIs are used to fetch only the required analytics efficiently.

---

## 5️⃣ Alerts & Notifications  
I implemented a real-time alert mechanism that notifies users when:
- Monthly budget limits are exceeded
- Unusual or high-value transactions are detected  

**Example Alert:**  
📩 *“You’ve spent ₹6000 on shopping this month. Consider reviewing your budget.”*

---

## 6️⃣ Security & Privacy  
Given the sensitivity of financial data, I incorporated robust security measures:
- **AES-256 encryption** for stored transaction data
- **OAuth 2.0 authentication**
- **JWT-based authorization**
- **Role-Based Access Control (RBAC)**
- **Zero-knowledge encryption principles** to ensure data privacy

---

## 7️⃣ Dashboard Features  
The dashboard allows users to:
- View spending summaries (daily, monthly, yearly)
- Add expenses paid via cash
- Track monthly subscriptions
- Manage recurring bills
- Receive visual insights and alerts

---

## 8️⃣ Deployment & Scalability  
- Each microservice is containerized using **Docker**
- Deployed using **Kubernetes** for orchestration and scalability
- Designed for horizontal scaling to handle increased user traffic

---

## Outcome & Learnings  
Through this project, I gained hands-on experience in:
- Designing secure **microservices architectures**
- Building **event-driven real-time systems**
- Applying **NLP and ML** for financial data classification
- Implementing **privacy-first fintech solutions**
- Demonstrating **end-to-end ownership**, from system design to deployment
