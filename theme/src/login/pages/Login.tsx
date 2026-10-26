import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useScript } from "keycloakify/login/pages/Login.useScript";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        registrationDisabled,
        messagesPerField
    } = kcContext;

    const { msg } = i18n;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

    const webAuthnButtonId = "authenticateWebAuthnButton";

    useScript({
        webAuthnButtonId,
        kcContext,
        i18n
    });

    const hasUsernameError = messagesPerField.existsError("username");
    const hasPasswordError = messagesPerField.existsError("password");

    const usernameError = messagesPerField.get("username");
    const passwordError = messagesPerField.get("password");

    const googleProvider = social?.providers?.find(
        p => p.alias.toLowerCase().includes("google") || p.displayName.toLowerCase().includes("google")
    );
    const otherProviders = social?.providers?.filter(p => p !== googleProvider) ?? [];

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginCardTitle")}
            socialProvidersNode={
                <>
                    {/* Social Providers / Google Button */}
                    {realm.password && (social?.providers?.length || 0) > 0 && (
                        <div className="mt-4">
                            {/* Thin "atau" / "or" divider */}
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                                </div>
                                <div className="relative flex justify-center text-[11px]">
                                    <span className="px-2 bg-white dark:bg-slate-900 text-slate-400">
                                        {msg("orDivider")}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                {googleProvider && (
                                    <a
                                        key={googleProvider.alias}
                                        id={`social-${googleProvider.alias}`}
                                        href={googleProvider.loginUrl}
                                        className="w-full py-2 px-3 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center space-x-2.5 cursor-pointer shadow-xs"
                                    >
                                        {/* Neutral Google Icon */}
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                            <path
                                                fill="#4285F4"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                            />
                                            <path
                                                fill="#EA4335"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                            />
                                        </svg>
                                        <span>{msg("signInWithGoogle")}</span>
                                    </a>
                                )}

                                {otherProviders.map(p => (
                                    <a
                                        key={p.alias}
                                        id={`social-${p.alias}`}
                                        href={p.loginUrl}
                                        className="w-full py-2 px-3 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                                    >
                                        <span>{p.displayName}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            }
            infoNode={
                <>
                    {realm.registrationAllowed && !registrationDisabled && (
                        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {msg("noAccountYet")}{" "}
                                <a
                                    tabIndex={6}
                                    href={url.registrationUrl}
                                    className="font-medium text-slate-900 dark:text-white hover:underline cursor-pointer"
                                >
                                    {msg("registerLink")}
                                </a>
                            </span>
                        </div>
                    )}
                </>
            }
        >
            <form
                id="kc-form-login"
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
                action={url.loginAction}
                method="post"
                className="space-y-4"
            >
                {/* Username or Email Input */}
                {!usernameHidden && (
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
                        >
                            {!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                  ? msg("usernameOrEmailLabel")
                                  : msg("emailLabel")}
                            <span className="text-rose-500 ml-0.5">*</span>
                        </label>
                        <input
                            tabIndex={1}
                            id="username"
                            name="username"
                            defaultValue={login.username ?? ""}
                            type="text"
                            autoFocus
                            autoComplete="username"
                            required
                            aria-invalid={hasUsernameError}
                            className={`w-full px-3 py-2 text-xs rounded-lg border bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                                hasUsernameError
                                    ? "border-rose-300 dark:border-rose-700 focus:ring-rose-500 focus:border-rose-500"
                                    : "border-slate-300 dark:border-slate-700 focus:ring-slate-400 dark:focus:ring-slate-600 focus:border-slate-400"
                            }`}
                        />
                        {hasUsernameError && usernameError && (
                            <p className="text-[11px] text-rose-500 mt-1" aria-live="polite">
                                {usernameError}
                            </p>
                        )}
                    </div>
                )}

                {/* Password Input */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label
                            htmlFor="password"
                            className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                        >
                            {msg("passwordLabel")}
                            <span className="text-rose-500 ml-0.5">*</span>
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            tabIndex={2}
                            id="password"
                            name="password"
                            type={isPasswordRevealed ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            aria-invalid={hasPasswordError}
                            className={`w-full px-3 py-2 pr-9 text-xs rounded-lg border bg-slate-50/70 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 transition-colors ${
                                hasPasswordError
                                    ? "border-rose-300 dark:border-rose-700 focus:ring-rose-500 focus:border-rose-500"
                                    : "border-slate-300 dark:border-slate-700 focus:ring-slate-400 dark:focus:ring-slate-600 focus:border-slate-400"
                            }`}
                        />
                        <button
                            type="button"
                            tabIndex={3}
                            onClick={() => setIsPasswordRevealed(!isPasswordRevealed)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                            aria-label={isPasswordRevealed ? "Hide password" : "Show password"}
                        >
                            {isPasswordRevealed ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                    {hasPasswordError && passwordError && (
                        <p className="text-[11px] text-rose-500 mt-1" aria-live="polite">
                            {passwordError}
                        </p>
                    )}
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between pt-1">
                    {realm.rememberMe && !usernameHidden && (
                        <label className="flex items-center space-x-2 cursor-pointer select-none">
                            <input
                                tabIndex={4}
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                defaultChecked={!!login.rememberMe}
                                className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-0 focus:ring-offset-0 bg-white dark:bg-slate-900 cursor-pointer"
                            />
                            <span className="text-xs text-slate-600 dark:text-slate-400">
                                {msg("rememberMeLabel")}
                            </span>
                        </label>
                    )}

                    {realm.resetPasswordAllowed && (
                        <a
                            tabIndex={5}
                            href={url.loginResetCredentialsUrl}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors ml-auto cursor-pointer"
                        >
                            {msg("forgotPasswordLabel")}
                        </a>
                    )}
                </div>

                {/* Primary Submit Button */}
                <div className="pt-2">
                    <button
                        tabIndex={5}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 px-4 rounded-md text-xs font-semibold bg-[#1d4ed8] hover:bg-[#1e40af] text-white disabled:opacity-50 transition-all font-semibold rounded-lg shadow-sm hover:shadow flex items-center justify-center space-x-1.5 cursor-pointer active:scale-[0.99]"
                    >
                        {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        <span>{msg("submitLogin")}</span>
                    </button>
                </div>
            </form>
        </Template>
    );
}
