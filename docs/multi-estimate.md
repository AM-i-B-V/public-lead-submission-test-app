# 1. Cloudflare Worker Implementation Tasks (with Backend Buffer, in Man Days)

---

| Task # | Task Description                                   | Estimated Time (hours) | Notes                                                                             |
| ------ | -------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------- |
| 0      | Project Setup (Wrangler, Hono, TypeScript, config) | 5                      | Includes learning Wrangler CLI, Hono basics, and project structure                |
| 1      | Parse and Validate Request                         | 2.5                    | Similar to API route handling in Next.js, but new syntax                          |
| 2      | Dealer Verification (D1 SQL)                       | 6                      | Learning D1 SQL, writing queries, schema setup, error handling                    |
| 3      | Turnstile Token Validation                         | 3.5                    | Reading secrets, calling Turnstile API, learning about secrets in Cloudflare      |
| 4      | Use Endpoint to Get Cognito Token                  | 3.5                    | Fetching secrets, making API call, handling responses                             |
| 5      | Salesforce Forwarding                              | 3.5                    | POST to external API, handle auth, propagate errors                               |
| 6      | Logging / Auditing                                 | 1.5                    | Log request and response data for monitoring, debugging, or auditing. Mandatory.  |
| 7      | API Error Response Structure                       | 1.5                    | Define and implement consistent error format                                      |
| 8      | (Optional, End) Hostname Check                     | 1.5                    | Simple check, can be deferred                                                     |
| 9      | PR Reviews                                         | 2.5                    | Time for code review cycles, feedback, and rework                                 |
| 10     | Unit Tests                                         | 16                     | Writing and running unit tests for core logic                                     |
| 11     | Dev Testing                                        | 7                      | Manual testing, debugging, and integration testing with frontend test application |
| 12     | Deployment to Dev, Acceptance, Production          | 6                      | Deploy worker to all environments, configure, verify deployments                  |
| 13     | PR Management & Deployment Coordination            | 4                      | Merge PRs, coordinate deployments, manage release process                         |
| 14     | Dev Testing for Each Environment                   | 6                      | Manual/integration testing in dev, acceptance, and production                     |
| 15     | Communication & Coordination                       | 5                      | Back and forth with backend, devops, QA teams                                     |
|        | **Learning & Troubleshooting Buffer**              | 5                      | For docs, debugging, and experimenting                                            |
|        | **Backend Integration & Waiting Buffer**           | 10                     | For waiting on backend, rework, integration, and extra testing                    |

---

### **Total Estimate (Core Tasks + Learning + Backend Buffer):**

**89 hours**

### **Conversion to Man Days (1 man day = 8 hours):**

**89 hours ÷ 8 = 11.1 man days**

**→ Total: 11.1 man days**

---

# 2. Backend Tasks — Task Table

| Task # | Task Description                               | Notes                                                                                                                                                                | Estimated Time (hours) |
| ------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 2      | API to Submit the Lead (Salesforce Forwarding) | Core Service API endpoint that receives lead data and update through an sqs queue Salesforce.                                                                        | 24                     |
| 3      | CRUD APIs for Lead Submission Proxy Setup      | APIs for the client (Settings page) to create, read, update, and delete lead submission proxy configurations. Stores configuration data in D1 SQL for worker access. | 40                     |

### **Total Estimate (Core Tasks + Learning + Backend Buffer):**

**64 hours**

### **Conversion to Man Days (1 man day = 8 hours):**

**64 hours ÷ 8 = 8 man days**

**→ Total: 8 man days**

---

# 3. Vanilla Js App for QA Testing — Adjusted Estimate (2 Man Days / 16 Hours)

| Task # | Task Description                      | Adjusted Estimate (hours) | Notes                                                                   |
| ------ | ------------------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| 1      | Set Up Vanilla JS Application         | 2                         | Extra time for setup, folder structure, and config                      |
| 2      | Integrate Turnstile Widget            | 2                         | More time for widget config, troubleshooting, and cross-browser testing |
| 3      | Build Lead Submission Form            | 2                         | Add all required fields, validation, and polish                         |
| 4      | Capture Turnstile Token on Submit     | 1.5                       | Ensure robust token handling and error states                           |
| 5      | POST to Worker Endpoint               | 1.5                       | Handle all edge cases, retries, and error handling                      |
| 6      | Display API Response                  | 1.5                       | Improve UI/UX for response display, handle all response types           |
| 7      | Allow Endpoint & Config Customization | 1.5                       | Add UI for dynamic config, test with multiple endpoints                 |
| 8      | Provide Instructions for QA           | 1                         | Write detailed README and inline instructions                           |
| 9      | (Optional) Log Requests/Responses     | 1                         | Add advanced logging, filtering, and troubleshooting info               |

---

### **Total Adjusted Estimate:**

**16 hours**

### **Conversion to Man Days (1 man day = 8 hours):**

**16 hours ÷ 8 = 2 man days**

---

# 4. 2nd Cloudflare Worker for D1 SQL Tenant/Dealer Mapping

| Task # | Task Description                                   | Estimated Time (hours) | Notes                                                                                                                                         |
| ------ | -------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 0      | Project Setup (Wrangler, Hono, TypeScript, config) | 5                      | Follows main worker setup estimate                                                                                                            |
| 1      | D1 SQL Schema Prep                                 | 2                      | Schema/table prep, similar to D1-related setup in main worker                                                                                 |
| 2      | Implement Populate API Route                       | 16                     | Hono route to insert new tenantId, dealerId mapping. Includes API integration for tenantId, dealerId mapping. Add site key tenant ID mappings |
| 3      | Implement Update API Route                         | 8                      | Hono route to update existing tenantId, dealerId mapping                                                                                      |
| 4      | Input Validation & Error Handling                  | 2                      | Validate payloads, handle errors, return consistent responses                                                                                 |
| 5      | Unit & Dev Testing                                 | 4                      | Write tests and manually verify all APIs                                                                                                      |
| 6      | PR Review & Deployment                             | 2                      | Code review, merge, and deploy                                                                                                                |
| 7      | Communication & Coordination                       | 2                      | Back and forth with backend/devops/QA as needed                                                                                               |
| 8      | Learning & Troubleshooting Buffer                  | 2                      | For docs, debugging, and experimenting                                                                                                        |

---

### **Total Estimate (Core Tasks + Learning + Buffer):**

**39 hours**

### **Conversion to Man Days (1 man day = 8 hours):**

**39 hours ÷ 8 = 4.9 man days**

**→ Total: 4.9 man days**

---

# 5. Documentation for Client Usage & Turnstile Widget Integration

| Task # | Task Description                                | Estimated Time (hours) | Notes                                                 |
| ------ | ----------------------------------------------- | ---------------------- | ----------------------------------------------------- |
| 0      | Write Client Usage Documentation                | 8                      | Step-by-step guide for clients to use the worker APIs |
| 1      | Provide Code Examples for Turnstile Integration | 6                      | Example HTML/JS for integrating Turnstile widget      |
| 2      | Set Up Docsify & Organize Docs                  | 5                      | Initialize docsify, structure docs, add navigation    |
| 3      | Review & Polish Documentation                   | 5                      | Proofread, test code snippets, ensure clarity         |

---

### **Total Estimate (Documentation Tasks):**

**24 hours**

### **Conversion to Man Days (1 man day = 8 hours):**

**24 hours ÷ 8 = 3 man days**

**→ Total: 3 man days**

---

# 6. AMI Settings Page FE changes

**Description:** Changes that must be made in the settings page to expose the worker URL to the tenant

---

# 7. DevOps Tasks

| Component                         | Task Description                                                    | Estimated Time (hours) |
| --------------------------------- | ------------------------------------------------------------------- | ---------------------- |
| Cloudflare Worker 1 (Main Worker) | Set up Cloudflare Workers development environment                   | 2                      |
|                                   | Set up secrets management for Turnstile tokens, Cognito credentials | 2                      |
|                                   | Set up CI/CD pipeline for automated deployments                     | 4                      |
|                                   | Configure monitoring and logging (Cloudflare Analytics, Logpush)    | 2                      |
|                                   | Set up error tracking and alerting                                  | 2                      |
|                                   | Set up Cloudflare WAF rules for rate limiting and DDoS prevention   | 2                      |
| Vanilla JS App for QA Testing     | Set up static hosting for vanilla JS application                    | 2                      |
|                                   | Set up CDN for frontend assets                                      | 2                      |
|                                   | Set up monitoring for frontend performance                          | 2                      |
|                                   | Configure Cloudflare WAF for frontend protection                    | 2                      |
| Cloudflare Worker 2 (D1 SQL)      | Set up additional D1 SQL database for tenant/dealer mapping         | 2                      |
|                                   | Configure database access controls and permissions                  | 2                      |
|                                   | Set up monitoring for database performance                          | 2                      |
|                                   | Configure backup and recovery procedures                            | 2                      |
|                                   | Set up CI/CD pipeline for Worker 2                                  | 1                      |
|                                   | Configure Cloudflare WAF for Worker 2 API endpoints                 | 1                      |
| Documentation                     | Set up hosting for Docsify documentation                            | 1                      |
|                                   | **Total DevOps Hours**                                              | **33**                 |

---

# 8. UI/UX Tasks

---

### Conversion to Man Days (1 man day = 8 hours) (non parallel):

**Cloudflare Worker 1:** 89 hours
**Backend Tasks:** 64 hours
**Vanilla JS App for QA Testing:** 16 hours
**2nd Cloudflare Worker:** 43 hours
**Documentation:** 24 hours
**DevOps Tasks:** 33 hours

**Total: 269 hours**

**269 hours ÷ 8 = 33.6 man days**

**→ Final Total: 33.6 man days**

---

### Parallelized Timeline (1 dev on Cloudflare, 1 dev on Backend, 1 dev on DevOps)

- **Phase 1 (Parallel):**

  - Cloudflare Worker 1 (89 hours)
  - Backend Tasks (64 hours)
  - DevOps Tasks (33 hours)
  - These run in parallel, so the duration is determined by the longest task: **max(89, 64, 33) = 89 hours**

- **Phase 2 (Sequential, after Phase 1):**

  - 2nd Cloudflare Worker (43 hours)
  - Vanilla JS App for QA Testing (16 hours)
  - Documentation (24 hours)
  - These are done sequentially: **43 + 16 + 24 = 83 hours**

- **Total Project Duration:**

  - **Phase 1:** 89 hours
  - **Phase 2:** 83 hours
  - **Total:** 172 hours

- **Man Days:**
  - **172 hours ÷ 8 = 21.5 man days**

**→ Parallelized Project Duration: 21.5 man days**

---

# TODO

1. meeting: Share requirement with QA and UI/UX and get estimates
2. meeting: Share requirement with Arnold and get estimates
3. Move estimates to google sheet and cross check them
4. need to estimate changes in crm settings based on ui ux
5. Confirm requirement and estimates with Viswanath and Robert
6. setup jira mcp for creating stories and tasks easily

Will take about a month to go to production ( without qa)
with 1 devops, 1 qa, 1 ui/ux, 1 be, 2 devs on cloudflare workers ( worker 1 and worker 2)
