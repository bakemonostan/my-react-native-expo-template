/** English strings — add keys here and mirror in `es.ts`. */
export const en = {
  auth_login_title: "Sign in",
  auth_login_blurb:
    "Development mode: any non-empty password works when auth is in mock mode. Set EXPO_PUBLIC_AUTH_MODE=api and implement routes in services/authBackend.ts for a real API.",
  auth_login_email: "Email",
  auth_login_password: "Password",
  auth_login_submit: "Sign in",
  auth_login_forgot: "Forgot password?",
  auth_login_no_account: "No account?",
  auth_login_register: "Register",

  auth_register_title: "Create account",
  auth_register_blurb:
    "Creates a local session in mock mode. With EXPO_PUBLIC_AUTH_MODE=api, wire /auth/register on your server.",
  auth_register_name: "Name",
  auth_register_email: "Email",
  auth_register_password: "Password",
  auth_register_submit: "Create account",
  auth_register_has_account: "Already have an account? Sign in",

  auth_forgot_title: "Forgot password",
  auth_forgot_blurb:
    "Enter your account email. In mock mode we only simulate OTP; with api mode we call POST /auth/forgot-password.",
  auth_forgot_email: "Email",
  auth_forgot_submit: "Continue",

  auth_verify_title: "Verify code",
  auth_verify_blurb_mock:
    "Code sent to {{email}}. In mock mode, any 6+ digit code works.",
  auth_verify_blurb_api: "Code sent to {{email}}.",
  auth_verify_code_label: "One-time code",
  auth_verify_submit: "Verify and continue",

  home_welcome: "Welcome",
  home_body:
    "This is your starting screen. Replace this content with your app's home view.",
  home_tabs_hint:
    "Use the bottom tab bar (Home · Two · Components · Store · Querying) to explore this template.",
  home_name_placeholder: "Enter your name",
  home_open_components: "Open components gallery",
} as const;

export type I18nKey = keyof typeof en;
