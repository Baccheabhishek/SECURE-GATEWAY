// data flow 

User Registration ------- by role user/admin
        |      
Incoming Request
        │
        ▼
Regex Engine
        │
        ├──────────────┐
        │              │
 Known Attack?        No Match
        │              │
        ▼              ▼
     Block        AI Analysis
                      │
                Suspicious?
                │          │
              Yes          No
                │          │
             Block      Forward
