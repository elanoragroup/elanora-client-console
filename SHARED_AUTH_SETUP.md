# Shared Authentication System Setup Guide

This guide explains how to set up and use the shared authentication system between the Portal and Client Console projects.

## Overview

The shared authentication system allows users to:
1. Sign up or sign in through the Portal
2. Seamlessly access the Client Console dashboard
3. Maintain authentication state across both applications

## Architecture

### Components

1. **Portal** (`K:\elanora\portal`): Vanilla JavaScript application with Supabase authentication
2. **Client Console** (`K:\elanora\client console`): Next.js React application with shared authentication
3. **Shared Authentication**: Cross-domain token management system

### Key Files

#### Portal Side:
- `js/authService.js` - Enhanced with token storage and dashboard redirect
- `js/authConfig.js` - Shared configuration
- `js/supabaseClient.js` - Supabase client configuration

#### Client Console Side:
- `lib/shared-auth.ts` - Cross-domain authentication utilities
- `lib/auth-config.ts` - Shared configuration
- `contexts/AuthContext.tsx` - Enhanced to handle URL-based authentication
- `lib/supabase-client.ts` - Updated to use shared Supabase project

## Setup Instructions

### 1. Supabase Configuration

Both applications now use the same Supabase project:
- **URL**: `https://xbnqbzqiehjwevkavwbf.supabase.co`
- **Anon Key**: `sb_publishable_zoSv5N2Egw-u9Q2bCvm_3A_IpSdXFov`

### 2. Environment Variables

#### Client Console (.env.local):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xbnqbzqiehjwevkavwbf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_zoSv5N2Egw-u9Q2bCvm_3A_IpSdXFov
```

### 3. URL Configuration

Update the URLs in the configuration files to match your deployment:

#### Portal (`js/authConfig.js`):
```javascript
const AUTH_CONFIG = {
    PORTAL_URL: 'http://localhost:8080', // Your portal URL
    CLIENT_CONSOLE_URL: 'http://localhost:3000', // Your client console URL
    // ... other config
};
```

#### Client Console (`lib/auth-config.ts`):
```typescript
export const AUTH_CONFIG = {
    PORTAL_URL: 'http://localhost:8080', // Your portal URL
    CLIENT_CONSOLE_URL: 'http://localhost:3000', // Your client console URL
    // ... other config
}
```

## How It Works

### Authentication Flow

1. **User signs in through Portal**:
   - Portal authenticates with Supabase
   - Auth token is stored in localStorage
   - User sees "Dashboard" button in dropdown menu

2. **User clicks Dashboard button**:
   - Portal redirects to Client Console with auth parameters
   - URL format: `http://localhost:3000/dashboard?auth_token=...&user_id=...&email=...`

3. **Client Console handles authentication**:
   - Detects auth parameters in URL
   - Sets Supabase session using the token
   - Cleans up URL parameters
   - User is now authenticated in Client Console

### Token Management

- **Storage**: Tokens are stored in localStorage with key `elanora_auth_token`
- **Expiration**: Tokens expire after 24 hours
- **Cleanup**: Expired tokens are automatically removed
- **Cross-domain**: Tokens work across both applications

## Testing the Integration

### Prerequisites

1. Both applications should be running:
   - Portal: `http://localhost:8080`
   - Client Console: `http://localhost:3000`

2. Supabase project should be properly configured

### Test Steps

1. **Start Portal**:
   ```bash
   cd K:\elanora\portal
   # Start your local server (e.g., Live Server, Python http.server, etc.)
   ```

2. **Start Client Console**:
   ```bash
   cd "K:\elanora\client console"
   npm run dev
   ```

3. **Test Authentication Flow**:
   - Go to Portal (`http://localhost:8080`)
   - Sign up or sign in with an account
   - Click on your user avatar in the top right
   - Click "Dashboard" from the dropdown
   - You should be redirected to Client Console dashboard
   - You should be automatically logged in

### Troubleshooting

#### Common Issues

1. **CORS Errors**:
   - Ensure both applications are running on the configured URLs
   - Check that URLs in config files match actual running URLs

2. **Token Not Found**:
   - Check browser console for errors
   - Verify localStorage contains `elanora_auth_token`
   - Check token expiration

3. **Redirect Not Working**:
   - Verify Client Console is running on correct port
   - Check URL parameters are being passed correctly

#### Debug Steps

1. **Check Browser Console**:
   - Look for authentication-related logs
   - Check for any JavaScript errors

2. **Check localStorage**:
   - Open DevTools → Application → Local Storage
   - Look for `elanora_auth_token` key

3. **Check Network Tab**:
   - Verify Supabase requests are successful
   - Check redirect requests

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage (client-side)
2. **Token Expiration**: Tokens automatically expire after 24 hours
3. **HTTPS**: Use HTTPS in production for secure token transmission
4. **Domain Validation**: Consider adding domain validation for production

## Production Deployment

### Environment Updates

1. **Update URLs** in both config files to production URLs
2. **Use HTTPS** for secure token transmission
3. **Configure CORS** in Supabase if needed
4. **Set up proper domain validation**

### Example Production Config

```javascript
// Portal production config
const AUTH_CONFIG = {
    PORTAL_URL: 'https://portal.elanora.com',
    CLIENT_CONSOLE_URL: 'https://dashboard.elanora.com',
    // ... other config
};
```

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify all configuration URLs are correct
3. Ensure both applications are running
4. Check Supabase project configuration
5. Review the authentication flow logs

The shared authentication system provides a seamless experience for users moving between the Portal and Client Console applications.
