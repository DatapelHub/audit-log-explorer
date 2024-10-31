
# Audit Log Explorer

Audit Log Explorer is a React application that allows users to log in using an API key and secret, retrieve an access token, and use that token to view audit logs. This app integrates with specified APIs to authenticate and fetch security-related audit events.

## Table of Contents
- [Overview](#overview)
- [Functional Requirements](#functional-requirements)
  - [Login Page](#login-page)
  - [Audit Log Page](#audit-log-page)
  - [Logout Functionality](#logout-functionality)
  - [API Integration](#api-integration)
- [Non-Functional Requirements](#non-functional-requirements)
- [Suggested Project Structure](#suggested-project-structure)
- [Implementation Details](#implementation-details)

## Overview
Audit Log Explorer enables secure login using API credentials and allows users to fetch and view security audit events. The application relies on the following endpoints:
- **Token Endpoint**: `https://api2.datapel.net/api.datapel/v2.0/token`
- **Audit Event Endpoint**: `https://api2.datapel.net/api.datapel/v2.0/public/auditevent`

## Functional Requirements

### 1. Login Page
- **Purpose**: Authenticate the user and obtain an access token.
- **Fields**:
  - API Key (username)
  - API Secret (password)
- **Actions**:
  - Submits the API key and secret to the authentication endpoint to retrieve an access token.
  - Stores the token in local storage for subsequent API requests.
  - Redirects the user to the Audit Logs page after a successful login.
- **Error Handling**:
  - Displays error messages for failed logins (e.g., invalid credentials, network issues).

### 2. Audit Log Page
- **Purpose**: Display audit logs using the authenticated token.
- **Actions**:
  - Fetches audit logs from the audit event endpoint with the token and specified payload:
    ```json
    {
      "EventType": "security",
      "EventDetail": "Event - API application generated security event."
    }
    ```
  - Displays the list or table of audit logs.
  - Supports options to reload or refresh audit logs.
- **Error Handling**:
  - If the token is invalid or expired, redirects the user back to the login page with an error message.

### 3. Logout Functionality
- Clears the stored token and redirects the user to the login page.

### 4. API Integration
- **Authentication API**: Uses the token endpoint to authenticate users with an API key and secret, retrieving a token.
- **Audit Log API**: Uses the audit event endpoint to fetch audit log data using the token and specified `EventType` and `EventDetail` values.

## Non-Functional Requirements
- **Security**:
  - Securely stores the access token in `localStorage` and clears it upon logout.
  - Protects sensitive fields (API Key and API Secret) during login.
- **Performance**:
  - Minimizes unnecessary re-renders and API calls for an optimized user experience.

## Suggested Project Structure

```plaintext
audit-log-explorer
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── api
│   │   ├── authApi.js           # Handles authentication requests to get the token
│   │   └── auditLogApi.js       # Handles audit log requests
│   │
│   ├── components
│   │   ├── LoginForm.js         # Form for user login
│   │   ├── AuditLogTable.js     # Component to display audit logs (optional)
│   │
│   ├── context
│   │   └── AuthContext.js       # Context to manage authentication state and token
│   │
│   ├── pages
│   │   ├── LoginPage.js         # Login page component
│   │   └── AuditLogPage.js      # Page for viewing audit logs
│   │
│   ├── services
│   │   └── storage.js           # Local storage utility for token storage
│   │
│   ├── App.js                   # Main app component with routing
│   ├── index.js                 # Entry point
│   └── styles                   # Global styles (optional)
│       └── main.css
└── package.json
```

## Implementation Details

### AuthContext
Use an `AuthContext` to manage and provide authentication state and token access across components.

### Login Flow
- In `LoginForm.js`, call `getToken` from `authApi.js` to authenticate.
- If authentication is successful, store the token and navigate to the audit log page.

### Audit Log Retrieval
- Use `getAuditEvents` in `auditLogApi.js` to fetch audit logs by passing the stored token and necessary payload.

### Routing and Protection
- Ensure the `/audit-log` route is protected, redirecting unauthenticated users to `/login`.

### Error Handling and Feedback
- Add error handling in `authApi.js` and `auditLogApi.js` to manage network errors, invalid tokens, and expired sessions.

This document provides a structured guide for implementing **Audit Log Explorer** in React.
