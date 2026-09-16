# Field Visit Management

Internal Operations Management Platform for managing field visits, approvals, and operational workflows.

This project is being developed as part of the Software Development Intern technical assignment for an Operations Management Platform related to the India Safe Water Program.

---

## Project Overview

The Field Visit Management system is designed to replace manual spreadsheet, email, and WhatsApp-based handling of field visits.

The core workflow is:

DRAFT → PENDING → APPROVED / REJECTED → COMPLETED

Field officers can create and manage their visits, while HQ approvers review submitted visits and approve or reject them.

---

## Current Backend Implementation

The current backend prototype includes:

- User authentication
- JWT-based authentication
- HTTP-only cookie-based token storage
- Password hashing using bcrypt
- Role-based authorization
- Field visit CRUD operations
- Visit ownership checks
- Visit status lifecycle validation
- Visit submission for approval
- Approval/rejection workflow
- Rejection remarks
- Approval decision history
- Visit filtering
- Pagination
- HQ summary API
- Seed/demo data

---

## User Roles

### FIELD_OFFICER

Can:

- Create visits
- View their visits
- Edit their own DRAFT/REJECTED visits
- Submit their own visits for approval
- Complete their own APPROVED visits

### HQ_APPROVER

Can:

- View submitted visits
- Approve visits
- Reject visits
- View HQ summary

### ADMIN

Can:

- Perform HQ approver actions
- Access all visits
- View HQ summary

---

## Visit Lifecycle

The system follows these allowed transitions:

```text
DRAFT
  ↓
PENDING
  ↓
APPROVED
  ↓
COMPLETED
