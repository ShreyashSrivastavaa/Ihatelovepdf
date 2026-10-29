# Security Policy

## Supported Versions

| Version | Supported |
|:--------|:----------|
| 1.x     | ✅        |
| < 1.0   | ❌        |

## Architecture & Privacy Guarantee

**ihatelovepdf** processes all documents **100% client-side** inside the user's web browser using WebAssembly and Web Workers.

- **Zero Server Uploads**: No PDF content, document bytes, or extracted metadata ever leave your computer.
- **Static Export**: The production application is statically compiled (`output: "export"`). There are no backend database servers or server-side document parsing microservices.
- **Sandboxed Execution**: Documents run in sandboxed browser worker threads with isolated memory boundaries.

## Reporting a Security Vulnerability

We take the security and privacy of our users seriously. If you discover a security vulnerability or potential data leak in ihatelovepdf, please report it responsibly:

1. **GitHub Security Advisory (Preferred)**:
   Submit a private report via [GitHub Security Advisories](https://github.com/ShreyashSrivastavaa/Ihatelovepdf/security/advisories/new).
2. **Direct Contact**:
   Alternatively, contact the lead maintainer directly via GitHub profile: [Shreyash Srivastava](https://github.com/ShreyashSrivastavaa) with subject line `[SECURITY] ihatelovepdf Vulnerability Report`.
3. **Do NOT** open a public issue for zero-day vulnerabilities or security exploits.

### What to Include in Your Report

To help us triage and resolve the issue quickly, please provide:
- A clear description of the vulnerability and its potential impact.
- Step-by-step instructions or proof-of-concept (PoC) file to reproduce.
- Browser name, version, and operating system where the issue occurred.
- Suggested remediation or patch if you have one.

## Vulnerability Scope

Since ihatelovepdf is a static, client-side web application, the most relevant security vectors are:
- **Client-Side Cross-Site Scripting (DOM XSS)** via crafted PDF structure, font streams, or file names.
- **Dependency Vulnerabilities** in client-side parsing libraries (`pdf-lib`, `pdfjs-dist`).
- **Data Leakage or Unintended Network Requests** during document manipulation.

Server-side execution vulnerabilities (SSRF, remote command execution on host) are **out of scope** as no server processes document payloads.
