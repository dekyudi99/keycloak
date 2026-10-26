import type { JSX } from "keycloakify/tools/JSX";
import { useState, useLayoutEffect } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Loader2 } from "lucide-react";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {
        url,
        messagesPerField,
        recaptchaRequired,
        recaptchaVisible,
        recaptchaSiteKey,
        recaptchaAction,
        termsAcceptanceRequired
    } = kcContext;

    const { msg } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useLayoutEffect(() => {
        (window as any)["onSubmitRecaptcha"] = () => {
            // @ts-expect-error Keycloak recaptcha integration
            document.getElementById("kc-register-form")?.requestSubmit();
        };

        return () => {
            delete (window as any)["onSubmitRecaptcha"];
        };
    }, []);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("registerCardTitle")}
            displayMessage={messagesPerField.exists("global")}
            infoNode={
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                        {msg("alreadyHaveAccount")}{" "}
                        <a
                            href={url.loginUrl}
                            className="font-medium text-slate-900 dark:text-white hover:underline cursor-pointer"
                        >
                            {msg("loginLink")}
                        </a>
                    </span>
                </div>
            }
        >
            <form
                id="kc-register-form"
                action={url.registrationAction}
                method="post"
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
                className="space-y-4"
            >
                {/* Dynamic User Profile Attributes (First Name, Last Name, Email, Password, etc.) */}
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                {/* Terms Acceptance if required */}
                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        kcClsx={kcClsx}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}

                {/* Recaptcha if required */}
                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="py-2">
                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                    </div>
                )}

                {/* Register Submit Button */}
                <div className="pt-2">
                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <button
                            disabled={!isFormSubmittable || isSubmitting || (termsAcceptanceRequired && !areTermsAccepted)}
                            className="w-full py-2.5 px-4 rounded-md text-xs font-semibold bg-[#1d4ed8] hover:bg-[#1e40af] text-white disabled:opacity-50 transition-all font-semibold rounded-lg shadow-sm hover:shadow flex items-center justify-center space-x-1.5 cursor-pointer active:scale-[0.99] g-recaptcha"
                            data-sitekey={recaptchaSiteKey}
                            data-callback="onSubmitRecaptcha"
                            data-action={recaptchaAction}
                            type="submit"
                        >
                            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            <span>{msg("submitRegister")}</span>
                        </button>
                    ) : (
                        <button
                            disabled={!isFormSubmittable || isSubmitting || (termsAcceptanceRequired && !areTermsAccepted)}
                            className="w-full py-2.5 px-4 rounded-md text-xs font-semibold bg-[#1d4ed8] hover:bg-[#1e40af] text-white disabled:opacity-50 transition-all font-semibold rounded-lg shadow-sm hover:shadow flex items-center justify-center space-x-1.5 cursor-pointer active:scale-[0.99]"
                            type="submit"
                        >
                            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            <span>{msg("submitRegister")}</span>
                        </button>
                    )}
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, areTermsAccepted, onAreTermsAcceptedValueChange } = props;
    const { msg } = i18n;

    return (
        <div className="pt-1">
            <label className="flex items-start space-x-2 cursor-pointer select-none">
                <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={areTermsAccepted}
                    onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                    className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-0 focus:ring-offset-0 bg-white dark:bg-slate-900 cursor-pointer"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                    {msg("termsText")}
                </span>
            </label>
        </div>
    );
}
