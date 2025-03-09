# SpendGaurd
A Secure, Automated Money Management System

1️⃣ Define System Architecture
SpendGuard follows a microservices-based architecture, ensuring scalability, security, and modularity.

Architecture Overview
🔹 **Transaction Service** – Fetches transactions from GPay, BHIM, and Paytm
🔹 **Categorization Service** – Classifies expenses (food, travel, etc.)
🔹 **Analytics Service** – Provides insights and trends
🔹 **Alert & Notification Service** – Sends budget alerts
🔹 **Security & Encryption Service** – Encrypts and secures user data
🔹 **User Service** – Manages authentication & accounts
🔹 **Event Processing (Kafka)** – Handles real-time transaction updates

2️⃣ Technology Stack
| Component                 | Technology                                      |
|---------------------------|------------------------------------------------|
| **Backend (Microservices)** | Node.js (NestJS) / Python (FastAPI, Django)   |
| **Frontend (Web & Mobile)** | React / Flutter                               |
| **Database**               | PostgreSQL + MongoDB (Relational + NoSQL)     |
| **Message Queue**         | Apache Kafka (Real-time event streaming)      |
| **API Gateway**           | GraphQL (Apollo) / REST                       |
| **Security**              | OAuth 2.0, JWT, AES-256 Encryption            |
| **Deployment**            | Docker + Kubernetes (K8s)                     |


3️⃣ System Workflow
🔗 Step 1: **Transaction Data Collection**
There are two possible methods to fetch transactions:

API Integration (Preferred)

If GPay, Paytm, and BHIM offer official APIs, we fetch transactions using OAuth authentication.
Example: Use Google Pay API for fetching user transactions.
SMS Parsing (Alternative)

If APIs are unavailable, use Twilio SMS Parser or Google ML Kit to extract transaction details from SMS.
Transactions typically come as SMS notifications → Parse message text & extract details.

🏷 Step 2: **Expense Categorization**
The Categorization Service processes transactions and assigns categories using:
1.Predefined Rules (Merchant Name → Category)
2.Machine Learning (NLP-based text analysis to classify transactions)
Example Logic:

"Swiggy ₹500" → Food & Dining
"Uber ₹300" → Transport
"Amazon ₹1200" → Shopping

1️⃣ Merchant Name-Based Categorization (Rule-Based Approach)
Most payment apps like GPay, Paytm, and BHIM provide transaction details with a merchant name (e.g., Amazon, Swiggy, Uber).
We can use a predefined mapping of merchant names to categories.
Example Logic:

Merchant Name	Category
Swiggy, Zomato	Food & Dining 🍕
Uber, Ola	Transport 🚖
Amazon, Flipkart	Shopping 🛍️
Airtel, Jio, Vodafone	Utilities (Mobile Recharge) 📶
Netflix, Spotify	Entertainment 🎥
👉 How?

Extract the merchant name from the transaction details.
Use a lookup table or dictionary to assign a category.
📌 Implementation Example (Python)

python
Copy
Edit
merchant_category_map = {
    "Swiggy": "Food & Dining",
    "Uber": "Transport",
    "Amazon": "Shopping",
    "Airtel": "Utilities",
    "Netflix": "Entertainment"
}

def categorize_transaction(merchant_name):
    return merchant_category_map.get(merchant_name, "Unknown")

# Example transaction
print(categorize_transaction("Swiggy"))  # Output: Food & Dining
2️⃣ NLP-Based Categorization (Using Transaction Description)
If the transaction doesn't have a merchant name, we can analyze the transaction description.
Apply Natural Language Processing (NLP) to extract useful information.
Example Transaction Messages:

"Paid ₹500 to Swiggy via GPay" → Food & Dining
"Paid ₹300 for petrol at HP Fuel" → Transport
"Netflix subscription payment ₹799" → Entertainment
👉 How?

Use NLP (SpaCy, BERT, or OpenAI API) to analyze keywords in transaction descriptions.
Train a simple text classification model using previous transaction data.
📌 Implementation Example (Python - Using NLP)

python
Copy
Edit
import spacy

# Load NLP model
nlp = spacy.load("en_core_web_sm")

def categorize_transaction_nlp(transaction_text):
    keywords = {
        "food": ["restaurant", "Swiggy", "Zomato", "dining"],
        "transport": ["Uber", "Ola", "fuel", "bus"],
        "shopping": ["Amazon", "Flipkart", "store"],
        "utilities": ["Airtel", "Jio", "electricity"],
        "entertainment": ["Netflix", "Spotify", "cinema"]
    }
    
    doc = nlp(transaction_text.lower())
    
    for category, words in keywords.items():
        if any(word in doc.text for word in words):
            return category.capitalize()
    
    return "Unknown"

# Example
print(categorize_transaction_nlp("Paid ₹500 to Swiggy via GPay"))  # Output: Food
3️⃣ Machine Learning-Based Categorization (Supervised Learning)
Train an ML model using historical transaction data.
Features:
Transaction amount
Merchant name
Payment mode (UPI, Card, Wallet)
Transaction description
Model predicts the category automatically.
📌 Steps to Implement

Collect past transactions & labeled categories.
Use a Random Forest / LSTM model for classification.
Deploy the model as a Microservice (FastAPI, Flask, TensorFlow Serving).
4️⃣ AI-Based User Prompting (If All Else Fails)
If the system cannot categorize a transaction, we ask the user via:

Push Notification 📩 – "We couldn’t categorize this ₹700 transaction. Can you help us?"
Chatbot Assistance 🤖 – "Hey, what was your ₹500 expense on 7th March about?"
Auto-Learning 📈 – If the user categorizes once, we remember it for future transactions.









📊 Step 3: **Analytics & Insights**
The Analytics Service stores transaction history in a database.

Users can view: 
1.Spending Trends (daily, weekly, monthly)
2.Category-wise Expenses (food, travel, shopping, etc.)
3.Budget Exceed Alerts

GraphQL API is used for fetching only the required insights efficiently.

🚨 Step 4: **Alerts & Notifications**
The Alert Service monitors user spending.
Triggers Notifications when:
A budget limit is exceeded (e.g., Food spending > ₹5000/month)
An unusual transaction occurs (e.g., Sudden large expense)
Example Notification:
📩 "You’ve spent ₹6000 on shopping this month! Consider reviewing your budget."

🔐 Step 5: **Security & Privacy**
Since this system handles sensitive financial data, security is a top priority:

AES-256 Encryption – Encrypt transaction data before storing it.
OAuth 2.0 Authentication – Secure API access using Google/Facebook login.
Role-based Access Control (RBAC) – Prevents unauthorized data access.
Zero-Knowledge Encryption – Even the database admins can't see user data.

4️⃣ Development Guide
🛠 Step 1: **Setting Up Microservices**
✅ Create a NestJS (Node.js) or FastAPI (Python) backend.
✅ Set up Docker & Kubernetes for microservices.
✅ Use GraphQL (Apollo) for API interactions.

📌 Step 2: **Implementing Kafka for Event Processing**
✅ Use Kafka producers & consumers to handle real-time transactions.

📌 Step 3: **Database Setup**
✅ Use PostgreSQL for structured data (Users, Budgets, Categories).
✅ Use MongoDB for unstructured transaction storage.

📌 Step 4: **Implementing GraphQL API**
GraphQL query for fetching expenses:

5️⃣ Deployment & Scaling
1.Containerization with Docker
Each microservice runs in a Docker container.

2.Orchestration with Kubernetes
Use K8s Pods & Services for microservice deployment.


6️⃣ Reference Materials & Learning Resources
🔹 Microservices & Kafka
Kafka Event Streaming
Building Microservices with Node.js & NestJS
🔹 API Development
GraphQL Apollo Server
FastAPI for REST APIs
🔹 Security & Encryption
AES-256 Encryption Guide
OAuth 2.0 Authentication
🔹 Deployment
Docker & Kubernetes Guide
AWS EKS for Scaling


