# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| Latest (main branch) | ✅ |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do NOT** open a public issue for security vulnerabilities
2. Email the maintainer directly with details of the vulnerability
3. Include steps to reproduce, impact assessment, and any suggested fixes
4. You will receive a response within 48 hours

## Security Features

This platform implements several security measures:

- PBKDF2-SHA256 password hashing for admin authentication
- Rate limiting on all API endpoints
- Session-based authentication with configurable timeouts
- Audit logging for all administrative actions
- Input validation and SQL injection prevention via SQLAlchemy ORM
- CORS configuration with explicit origin whitelisting
- Secure cookie handling with HttpOnly and SameSite attributes
