# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (forces port 3000)
- **Build for production**: `npm run build`
- **Start production server**: `npm run start` 
- **Lint code**: `npm run lint`
- **Docker development**: `docker-compose up` (alternative development setup)

## Project Overview

This is a Next.js 15 tarot reading web application called "Ankh App" that provides mystical tarot card interpretations. The app is built with TypeScript and uses modern React features with the App Router.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom themes and animations
- **UI Components**: Radix UI primitives with extensive shadcn/ui library in `/components/ui/`
- **Authentication**: NextAuth.js v5 (beta) with Authentik provider configured
- **AI Integration**: Vercel AI SDK with OpenAI GPT-4o for tarot interpretations
- **Package Manager**: npm (used in package.json scripts)
- **Deployment**: Docker configured with docker-compose.yml

## Architecture

### Security-First Design
- Comprehensive middleware security system in `/lib/middleware/security.ts`
- Rate limiting, CSRF protection, and malicious input detection
- Security headers applied to all responses
- Advanced request validation and IP tracking
- Audit logging for security events

### Authentication Architecture
- NextAuth.js v5 (beta) with JWT strategy and 30-day session expiration
- Authentik OAuth provider with custom issuer configuration
- Session management through `UserStore` class with database integration
- Protected routes enforced by middleware.ts

### Database Layer
- Advanced in-memory store in `/lib/database/advanced-store.ts` (production ready for real DB)
- Multi-tier caching system (user, reading, session, analytics caches)
- Transaction support and audit logging
- Schema definitions in `/lib/database/schema.ts`
- Performance monitoring and query optimization

### API Structure
- `/api/auth/` - NextAuth.js routes with custom extensions
- `/api/interpretar-tarot/` - AI-powered tarot interpretations with comprehensive error handling
- `/api/analytics/` - User analytics tracking
- `/api/monitoring/` - Application monitoring endpoints
- `/api/security/` - Security statistics and monitoring
- `/api/tarot/` - Tarot-specific endpoints (daily cards, favorites, readings)

### Tarot System
- 20-card tarot deck with Spanish names (constants in `/components/lectura/constants.ts`)
- 4 reading types: amor, trabajo, salud, espiritual
- Interactive card selection with animations
- AI-powered interpretations using GPT-4o with mystical prompting
- Reading history and favorites functionality

### Error Handling & Monitoring
- Centralized error handling in `/lib/middleware/error-handler.ts`
- Custom error types (ValidationError, ExternalServiceError, APIError)
- Comprehensive logging system in `/lib/monitoring/logger.ts`
- Performance monitoring and caching optimization
- Request context tracking with unique request IDs

### Validation & Security
- Zod schemas in `/lib/validations/` for all form inputs
- Input sanitization in `/lib/utils/sanitize.ts`
- Rate limiting per IP address
- CSRF token validation for state-changing requests
- Malicious input detection and blocking

## Environment Configuration

Copy `example.env` to `.env.local` and configure:
- **NEXTAUTH_SECRET**: JWT signing secret (use `openssl rand -base64 32`)
- **NEXTAUTH_URL**: Application URL (localhost:3000 for dev, production URL for prod)
- **OPENAI_API_KEY**: Required for tarot interpretations (not in example.env but needed)
- **Authentik OAuth**: Client ID, secret, and issuer URL for custom authentication provider

## Development Notes

- **Package Manager**: npm (standard package manager for this project)
- **Port**: Application forces port 3000 (configured in package.json)
- **Build Configuration**: TypeScript and ESLint errors ignored during builds (next.config.mjs)
- **Language**: Spanish interface with mystical/spiritual theming
- **Styling**: Extensive use of CSS variables, gradients, and purple/indigo color schemes
- **Component Architecture**: Barrel exports in component directories for clean imports
- **Security**: All API routes use security middleware with rate limiting and validation